//历史记录功能 先调用后端查询数据，在调用云函数将查询记录保存到云数据库
//收藏功能  点击收藏，把查询的所有信息利用云函数保存到数据库

wx.showShareMenu({
  withShareTicket: true,
  menus: ['shareAppMessage', 'shareTimeline'],
  success:function(){
    
  },
  fail:function(){

  }
}),
Page({

  /**
   * 页面的初始数据
   */
  data: {
    originalData:"",
    result:{},
    //历史记录抽屉的显示
    drawer:false,
    //搜索记录
    searchlog:[],
    //是否收藏 0否 其他是
    checkhasstart:0,
  },
//清除的函数
clearfun: function(e){
  var that = this;
  console.log(e);
  that.setData({
    result : {}
  }) 
},
//播放的函数
paly :function(e){
console.log(e.currentTarget.dataset.url)
const innerAudioContext = wx.createInnerAudioContext()
innerAudioContext.autoplay = true
innerAudioContext.src = e.currentTarget.dataset.url
innerAudioContext.onPlay(() => {
 // console.log('开始播放')
})
innerAudioContext.onError((res) => {
  console.log(res.errMsg)
  console.log(res.errCode)
})
},

copy: function (e) {
  var that = this;
  console.log("长按触发");
    wx.setClipboardData({
    data: that.data.result.wordPartListMap,
      success: function (res) {
        wx.showToast({
        title: '复制成功',
        });
     }
    });
  },

//调用云函数获取搜索记录
getsearchlog:function(){
  console.log("调用云函数获取搜索记录")
  wx.cloud.callFunction({
    name: 'searchlog',
    data: {
      url:'getsearchlog'
    },
  }) 
  .then(res => {
    console.log(res.result);
    this.setData({
      searchlog:res.result.data
    })
  })
},

//控制右边弹出的抽屉是否显示
grawershow:function(){
  //  console.log("调用grawershow")
   this.setData({
     drawer: !this.data.drawer
  });
  if(this.data.drawer){  //当打开抽屉是获取搜索记录
    this.getsearchlog();
  }
},

//点击历史进行搜索
getlogwordseach:function(event){
  console.log(event.currentTarget.dataset.word);
  this.setData({
    originalData:event.currentTarget.dataset.word
  })
  this.searchfun();
  this.grawershow();
},

//调用云函数检查是否已经收藏
checkhasstart:function(word){
  var _this = this;
  console.log("检查是否已经收藏")
  wx.cloud.callFunction({
    name: 'startword',
    data: {
      word:word,
      url:'checkhasstart'
    },
  }) 
  .then(res => {
    console.log(res.result);
    _this.setData({ //得到是否收藏
      checkhasstart:res.result.total
    })
  })
},

//调用云函数收藏单词
startword:function(){
  console.log(this.data.result); 
  var _this = this;
  //调用云函数进行收藏
  wx.cloud.callFunction({
    name: 'startword',
    data: {
      result: _this.data.result,
      url:'savestartword'
    },
  }) 
  .then(res => {
    console.log(res.result);
    //收藏完成后把收藏的星变色
    _this.setData({
      checkhasstart:1
    })
    //提示收藏完成
    wx.showToast({ title: '收藏成功', icon: 'none', duration: 1500 });
  }) 
},

// //调用云函数取消收藏
// cancelword:function(){
//   console.log(this.data.result.original); 
//   //提示取消收藏完成
//   wx.showToast({ title: '取消收藏成功', icon: 'none', duration: 1500 });
// },

//调用云函数获取收藏的单词
getallstartword:function(){
  var _this = this;
  //调用云函数进行收藏
  wx.cloud.callFunction({
    name: 'startword',
    data: {
      url:'getstartword'
    },
  }) 
  .then(res => {
    console.log(res.result);
  })
},

//搜索
searchfun: function (e) {
  this.setData({  //图标变为未收藏
    checkhasstart:0,
  })
  if(!this.data.originalData){
    wx.showToast({
      title: '请输入完整',
      icon: 'none',
      duration: 1500
      })
    return
  }
    var that = this;
    console.log("开始查询");
    console.log(that.data);
    this.data.result= {};
  wx.request({
    url: 'https://xcx.gnnu.work/jsseaword',
    header: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST",
    data: {word:this.data.originalData},
  success: function (res) {
   if(res.data.code==200){
    that.setData({ result : res.data.data }) 
    wx.showToast({ title: '查找成功', icon: 'none', duration: 1500 });
    //调用云函数进行保存搜索记录
    wx.cloud.callFunction({
      name: 'searchlog',
      data: {
        word: res.data.data.original,
        url:'savesearchlog'
      },
    }) 
    .then(res => {
      console.log(res.result);
    })
     //调用云函数进行保存搜索记录结束
     //检查是否已经收藏 给收藏赋值
     that.checkhasstart(res.data.data.original);
   }
   else {
    wx.showToast({ title: '服务器错误！', icon: 'none', duration: 1500 })
   }
},
  fail:function(){
    wx.showToast({ title: '服务器错误！', icon: 'none', duration: 1500 })
  }
})
},




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})