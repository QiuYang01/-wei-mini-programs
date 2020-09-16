
Page({


  data: {
    //收藏的单词
    starword:[],
    activeNames: ['1']
  },
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
    _this.setData({
      starword:res.result.data,
    })
  })
},

//调用云函数取消收藏
cancelstar:function(event){
  console.log(event.currentTarget.dataset._id);
  var id = event.currentTarget.dataset._id;
  wx.cloud.callFunction({
    name: 'startword',
    data: {
      url:'cancelstartword',
      id:id 
    },
  }) 
  .then(res => {
    console.log(res.result);
    //提示取消收藏完成
    wx.showToast({ title: '删除成功', icon: 'none', duration: 1500 });
    //从新获取数据
    this.getallstartword(); 
  })
},

//播放的函数
paly :function(e){
  console.log(e.currentTarget.dataset.url)
  const innerAudioContext = wx.createInnerAudioContext()
  innerAudioContext.autoplay = true
  innerAudioContext.src = e.currentTarget.dataset.url
  innerAudioContext.onPlay(() => {})
  innerAudioContext.onError((res) => {
    console.log(res.errMsg)
    console.log(res.errCode)
  })
},

onChange(event) {
  console.log(event.detail)
  this.setData({
    activeNames: event.detail,
  });
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getallstartword();

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