const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chapterList:[], //章节
  },

  //跳转到voc
  tovoc(event){
    // console.log(event)
    wx.navigateTo({
      url: '../voc/voc?chapterId='+event.currentTarget.dataset.chapterid+"&bookId="+event.currentTarget.dataset.bookid
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('参数章节id',options.originalid);
    //获取一本书的章节
    wx.request({
      url: "https://xcx.gnnu.work"+'/chapter/selectByBookId?bookId='+options.originalid,
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "GET",
    success: (res)=>{
     console.log(res)
      this.setData({
        chapterList:res.data.data
      })
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