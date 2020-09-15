// // pages/translate/translate.js
// const date = new Date()
// // const timestamp = Date.parse(new Date());
// // const date = new Date(timestamp);
// const years = []
// const months = []
// const days = []
wx.showShareMenu({
  withShareTicket: true,
  menus: ['shareAppMessage', 'shareTimeline'],
  success:function(){

  },
  fail:function(){

  }
}),
// for (let i = 1990; i <= date.getFullYear(); i++) {
//   years.push(i)
// }
// for (let i = 1; i <= 12; i++) {
//   months.push(i)
// }
// for (let i = 1; i <= 31; i++) {
//   days.push(i)
// }
Page({

  /**
   * 页面的初始数据
   */
  data: {
// 自动检测	auto				
// 				日语	jp
// 韩语	kor	法语	fra	西班牙语	spa
// 泰语	th	阿拉伯语	ara	俄语	ru
// 葡萄牙语	pt	德语	de	意大利语	it
// 希腊语	el	荷兰语	nl	波兰语	pl
// 保加利亚语	bul	爱沙尼亚语	est	丹麦语	dan
// 芬兰语	fin	捷克语	cs	罗马尼亚语	rom
// 斯洛文尼亚语	slo	瑞典语	swe	匈牙利语	hu
// 繁体中文	cht	越南语	vie	 
   objectArray: [
    {id: 'zh',name: '中文'},
    { id: 'en', name: '英语'},
    {id: 'yue',name: '粤语' },
    {id: 'wyw',name: '文言文'},
     {id: 'jp',name: '日语'},
     {id: 'kor',name: '韩语'},
     {id: 'fra',name: '法语'},
     {id: 'spa',name: '西班牙语	'},
     {id: 'ara',name: '阿拉伯语'},
     {id: 'ru',name: '俄语'},

     {id: 'pt',name: '葡萄牙语'},
     {id: 'de',name: '德语'},
     {id: 'it',name: '意大利语'},

     {id: 'el',name: '希腊语'},
     {id: 'nl',name: '荷兰语'},
     {id: 'pl',name: '波兰语'},

     {id: 'bul',name: '保加利亚语'},
     {id: 'est',name: '爱沙尼亚语'},
     {id: 'dan',name: '丹麦语'},

     {id: 'fin',name: '芬兰语'},
     {id: 'cs',name: '捷克语'},
     {id: 'rom',name: '罗马尼亚语'},

     {id: 'slo',name: '斯洛文尼亚语'},
     {id: 'swe',name: '瑞典语'},
     {id: 'hu',name: '匈牙利语'},

     {id: 'cht',name: '繁体中文'},
     {id: 'vie',name: '越南语'},





  ],
    goallang:'英语', //语言
    goallangid:'en', //语言代号 发请求时要用
    originlang:'中文',
    originlangid:'zh',
    originword:'',  //源单词
    result:'', //翻译结果
    // years,
    // year: date.getFullYear(),
    // months,
    // month: date.getMonth() +1, //date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) :
    // days,
    // day: date.getDate(), //date.getDate() < 10 ? '0' + date.getDate() :
    // value: [date.getFullYear(), date.getMonth() , date.getDate()-1],
  },
  // bindChange(e) {
  //   const val = e.detail.value
  //   //console.log(val)
  //   this.setData({
  //     year: this.data.years[val[0]],
  //     month: this.data.months[val[1]],
  //     day: this.data.days[val[2]],
  //   })
  //   console.log(this.data) //这里获取year  month day
  //   //console.log("年",)
  // },
  //源语言
  bindPickerChange1: function(e) {
    this.setData({
      originlang: this.data.objectArray[e.detail.value].name,
      originlangid: this.data.objectArray[e.detail.value].id
    })
    console.log(this.data)
  },
//目标语言
bindPickerChange2: function(e) {
  this.setData({
    goallang: this.data.objectArray[e.detail.value].name,
    goallangid: this.data.objectArray[e.detail.value].id
  })
  console.log(this.data)
},
translate:function(e){

  // return
  var that = this;
 
  if(this.data.originword == ""){
    wx.showToast({
      title: '请输入完整',
      icon: 'none',
      duration: 1500
      })
    return
  }

  // console.log("开始查询");
  // console.log(that.data);
wx.request({
  url: 'https://xcx.gnnu.work/bdtranslate',
  header: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  method: "POST",
  data: {word:this.data.originword,
    origin:this.data.originlangid,
    to:this.data.goallangid
  },
success: function (res) {
  wx.showToast({
    title: '翻译成功',
    icon: 'none',
    duration: 1500
    })
  that.setData({
    result : res.data.trans_result[0].dst,
    originword: res.data.trans_result[0].src
  }) 
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