// pages/foreign/foreign.js
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
    result:{}
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

searchfun: function (e) {
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
    //console.log(res);
   if(res.data.code==200){
    that.setData({ result : res.data.data }) 
    wx.showToast({ title: '查找成功-_-', icon: 'none', duration: 1500 });
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
    // wx.cloud.callFunction({
    //   // 云函数名称
    //   name: 'test1',
    //   // 传给云函数的参数
    //   data: {
    //     a: 1,
    //     b: 2,
    //   },
    // })
    // .then(res => {
    //   console.log(res.result) // 3
    // })
    // .catch(console.error)
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