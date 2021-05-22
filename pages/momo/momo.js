var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookList:[],
    loading:false,
  },
  //获取所有的书籍
  getAllBook(){
    console.log("getAllBook",app) //globalData
    // return
    this.setData({
      loading:true
    })
    wx.request({
      url: "https://xcx.gnnu.work"+'/book/getAllBook',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "GET",
    success: (res)=>{
     console.log(res)
      this.setData({
        bookList:res.data.data,
        loading:false
      })
  },
    fail:(err)=>{
      console.log(err)
    }
  })
  },



  //跳转到章节
  tochapter(event){
    console.log(event.currentTarget.dataset.originalid)
    wx.navigateTo({
      url: './chapter/chapter?originalid='+event.currentTarget.dataset.originalid
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllBook();
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