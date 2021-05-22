const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vocList:[], //单词列表
    result:{}, //当前单词的详细内容
  },
onChange(event) {
  console.log(event);
  let index = event.detail+1;
  if(index)
    this.searchfun(this.data.vocList[index-1].vcVocabulary)
  // this.searchfun(this.vocList);
  this.setData({
    activeNames: event.detail,
  });

},
//播放的函数
paly :function(e){
  // console.log(e.currentTarget.dataset.url)
  const innerAudioContext = wx.createInnerAudioContext()
  // const innerAudioContext = wx.createInnerAudioContext()
  innerAudioContext.autoplay = true
  innerAudioContext.src = e.currentTarget.dataset.url
  innerAudioContext.onPlay(() => {
    // console.log('开始播放')
  })
  innerAudioContext.onError((res) => {
    // console.log(res.errMsg)
    // console.log(res.errCode)
  })
  },
//搜索
searchfun(originalData) {
  console.log("开始搜索",originalData);
  // var originalData = event.currentTarget.dataset.original;
  this.setData({  //图标变为未收藏
    checkhasstart:0,
    result:{},
  })
    this.data.result= {};
  wx.request({
    url: 'https://xcx.gnnu.work/jsseaword',
    header: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST",
    data: {word:originalData},
  success: (res)=> {
   if(res.data.code==200){
    this.setData({ result : res.data.data}) 
    //调用云函数进行保存搜索记录
    wx.cloud.callFunction({
      name: 'searchlog',
      data: {
        word: res.data.data.original,
        url:'savesearchlog'
      },
    }) 
     //检查是否已经收藏 给收藏赋值
    //  this.checkhasstart(res.data.data.original);
   }
   },
  fail:()=>{
    // this.setData({ result : res.data.data }) 
    wx.showToast({ title: '服务器错误！', icon: 'none', duration: 1500 })
  }
})
},

//调用云函数检查是否已经收藏
checkhasstart(word){
  var _this = this;
  wx.cloud.callFunction({
    name: 'startword',
    data: {
      word:word,
      url:'checkhasstart'
    },
  }) 
  .then(res => {
    // console.log(res.result);
    _this.setData({ //得到是否收藏
      checkhasstart:res.result.total
    })
  })
},

//调用云函数收藏单词
startword:function(){
  // console.log(this.data.result); 
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
    // console.log(res.result);
    //收藏完成后把收藏的星变色
    _this.setData({
      checkhasstart:1
    })
    //提示收藏完成
    wx.showToast({ title: '收藏成功', icon: 'none', duration: 1500 });
  }) 
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('参数章节和书id',options);
    this.setData({
      loading:true,
    })
    //获取一章的单词
    wx.request({
      url: "https://xcx.gnnu.work"+'/voc/selectAChapter?bookId='+options.bookId+"&chapterId="+options.chapterId,
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "GET",
    success: (res)=>{
    //  console.log(res)
      this.setData({
        vocList:res.data.data,
        loading:false,
      })
      console.log("所有单词",this.data.vocList)
  },
    fail:(err)=>{
      console.log(err)
    }
  })
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