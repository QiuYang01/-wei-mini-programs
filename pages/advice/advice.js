// pages/advice/advice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    advice:'',
    username:'',
    isdisable:false
  },

  submit: function(e) {
    let that = this;
    if(!this.data.advice || !this.data.username){
      wx.showToast({title: '请填写完整哦',icon: 'none',duration: 2000})
      return
    }

  wx.request({
    url: 'https://xcx.gnnu.work/advice',
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST",
    data: {advice:this.data.advice,username:this.data.username},
    success: function (res) {
      console.log(res)
      if(res.data.data !=1){
        wx.showToast({title: '提交失败了，请重试。',icon: 'none',duration: 2000})
        return 
      }
      wx.showToast({title: '提交成功，感谢您的建议',icon: 'none',duration: 2000})
      that.setData({
        isdisable:true
      });
      setTimeout(function() {
        that.setData({
          isdisable:false
        })
      }.bind(this), 80000)
    }
    
  })
    console.log(this.data.advice)
    
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