// pages/playaudio/playaudio.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentText: '',     
    addText: '', 
    audioSrc:'', 
    //供选择的词语列表
    provideChoiceTextList:[
      "江西省抚州市南丰县",
      "江西省抚州市",
      "江西省",
      "胡坑村",
      "姓名",
      "手机号",
      "性别",
      "身份证号码"
    ],
  },
  //选择
  choiceText:function(e){
    // console.log(e);
    this.setData({
      currentText:e.currentTarget.dataset.text
    })
    this.playaudio();
  },
  //合成语音并朗读
  playaudio: function ( ) {   
    const plugin = requirePlugin ( "WechatSI" ) 
    const manager = plugin.getRecordRecognitionManager()   
    plugin.textToSpeech ( {       
      lang: "zh_CN",
      content: this.data.currentText,       
      tts: true, // 需要合成语音       
      success: ( res ) =>{   
        // console.log(res.filename);
        this.setData ( {
          audioSrc:res.filename
        } )     
        // console.log("src",this.data.audioSrc)
        this.audioCtx.play()  
        },    
        fail: function(res) {
          // console.log("fail tts", res)
        } 
      } )   
    },
  //调用云函添加
  add:function(){
    // console.log("开始add")
    if(!this.data.addText){ 
      wx.showToast({ title: '请输入！！！', icon: 'none', duration: 500 });
      return ;
    }
    //调用云函数添加
    var that = this;
    wx.cloud.callFunction({
      name: 'playAudioText',
      data: {
        text: that.data.addText,
        url:'addPlayAudioText'
      },
    }) 
    .then(res => {
      console.log(res.result);
      this.getAll();
    }) 
  },
  //调用云函数查询
  getAll:function(){
    // console.log("开始getAll")
    //调用云函数添加
    var that = this;
    wx.cloud.callFunction({
      name: 'playAudioText',
      data: {
        url:'getAll'
      },
    }) 
    .then(res => {
      // console.log(res.result);
      that.setData({
        provideChoiceTextList:res.result.data
      })
    }) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAll();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createAudioContext('myAudio')
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