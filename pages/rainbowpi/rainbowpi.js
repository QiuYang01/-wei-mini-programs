// pages/rainbowpi/rainbowpi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rainbowceotext:''
  },

  getrainbowpi:function(){
    let that = this;
    wx.request({
      url: 'https://xcx.gnnu.work/getrainbowpipi',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        if(!res.data.isok){
          wx.showToast({
            title: '获取失败，请重试',
            icon: 'none',
            duration: 1500
            })
          return
        }
        that.setData({
          rainbowceotext:res.data.data
        })
       },
       fail:function(){
        wx.showToast({ title: '服务器错误！', icon: 'none', duration: 1500 })
      }
    
  })
},

//点击按钮复制
copy(){
  // console.log(this.data.rainbowceotext)
  wx.setClipboardData({
      data: this.data.rainbowceotext,
      success: function (res) {
          wx.getClipboardData({
              success: function (res) {
                  wx.showToast({
                      title: '复制成功'
                  })
              }
          })
      }
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getrainbowpi();
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