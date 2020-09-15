wx.showShareMenu({
  withShareTicket: true,
  menus: ['shareAppMessage', 'shareTimeline']
}),
// pages/map/map.js
Page({

  /** 
   * 页面的初始数据
   */
  data: {

  },
  onShareAppMessage: function() {
		wx.showShareMenu({
	      withShareTicket: true,
	      menus: ['shareAppMessage', 'shareTimeline']
	    })
	},
	//用户点击右上角分享朋友圈
	onShareTimeline: function () {
		return {
	      title: '分享',
	      query: {
	        key: value
	      },
	      imageUrl: ''
	    }
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let plugin = requirePlugin('routePlan');
    let key = 'Y6NBZ-EJWKP-4RMDY-L7OGJ-OSD4O-QABEQ';  //使用在腾讯位置服务申请的key
    let referer = '小程序导航';   //调用插件的app的名称
    let endPoint = JSON.stringify({  //终点
      'name': '南丰县',
      'latitude': 27.213311,
      'longitude': 116.516065
    });
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint +'&navigation=true'
    });
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
    console.log("SDF")
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