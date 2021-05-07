// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: {}, //动画
    show:false, //是否展示
  },  
  to2048:function(){
    wx.navigateTo({
      url: '../2048/2048'
    })
  },
  toplayaudio:function(){
    wx.navigateTo({
      url: '../playaudio/playaudio'
    })
  },
  tostartword:function(){
    wx.navigateTo({
      url: '../usermain/usermain'
    })
  },
  tosearchword:function(){
    wx.navigateTo({
      url: '../searchword/searchword'
    })
  },
  todailysentence:function(){
    wx.navigateTo({
      url: '../dailysentence/dailysentence'
    })
  },
  totranslate:function(){
    wx.navigateTo({
      url: '../translate/translate'
    })
  },
  tomap:function(){
    wx.navigateTo({
      url: '../map/map'
    })
  },
  toadvice:function(){
    wx.navigateTo({
      url: '../advice/advice'
    })
  },
  torainbowpi:function(){
    wx.navigateTo({
      url: '../rainbowpi/rainbowpi'
    })
  },
  togame:function(){
    wx.navigateTo({
      url: '../game/game'
    })
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //请求云函数查询数据库 是否展示
    wx.cloud.callFunction({
      name: 'show',  
    }) 
    .then(res => {
      // console.log(res.result.data.show);
      this.setData({
        show:res.result.data.show
      })
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
    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'linear',
    })
    this.animation = animation
    //scale 缩放
    // animation.rotateZ(0).step();
  //  animation.opacity(0).translate(-50).step()
  //  animation.scale(1,1).rotate(360).opacity().step()
    this.setData({
      animationData:animation.export()
    })
    setTimeout(function() {
      // animation.opacity(1).translate(0).step();
      // animation.rotateZ(360).step();
      this.setData({
        animationData:animation.export()
      })
    }.bind(this), 800)
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