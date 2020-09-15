// pages/chinese/chinese.js
wx.showShareMenu({
  withShareTicket: true,
  menus: ['shareAppMessage', 'shareTimeline'],
  success:function(){

  },
  fail:function(){

  }
}),
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: {}, //动画
    info:{},
    date:""  //日期
    ,currentday:"",
  },

// 获取每日一句
 getinfo:function(){
  var that = this;
  wx.request({
    url: 'https://xcx.gnnu.work/jsdaily?date='+this.data.date,
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
    // header: {}, // 设置请求的 header  
    header: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      if(res.data.data=="参数不合法"){
        wx.showToast({
          title: '没有找到哦',
          icon: 'none',
          duration: 1500
          })
        return
      }
       console.log(JSON.parse(res.data.data))
      // res.data.data.content.replace("&nbsp;","");
      
      that.setData({
        info:JSON.parse(res.data.data)
      })

    },
    fail:function(){
      console.log("失败")
    }
    
 })
 },
 //播放音乐
 paly :function(e){
  console.log(e.currentTarget.dataset.url)
  const innerAudioContext = wx.createInnerAudioContext()
  innerAudioContext.autoplay = true
  innerAudioContext.src = e.currentTarget.dataset.url
  innerAudioContext.onPlay(() => {
    console.log('开始播放')
  })
  innerAudioContext.onError((res) => {
    console.log(res.errMsg)
    console.log(res.errCode)
  })
  },

//前一天
goback:function(){
  let DateArr = this.data.date.split("-");
  DateArr[2]= parseInt(DateArr[2])-1;
  console.log(DateArr.toString());
  this.data.date = DateArr[0]+"-"+DateArr[1]+"-"+DateArr[2];
  this.getinfo();
      //动画
      // let animation = wx.createAnimation({
      //   duration: 1000,
      //   timingFunction: 'linear',
      // })
      this.animation.rotateY(180).step();
      this.setData({
        animationData:this.animation.export()
      })
        // 回到初始状态 不然下次相同状态的就不会执行
      setTimeout(function() {
        // 逆时针旋转至0度
        this.animation.rotateY(0).step()
      this.setData({
        animationData: this.animation.export()
      })
      }.bind(this), 500);
},
//后一天
gohead:function(){

let DateArr = this.data.date.split("-");
DateArr[2]= parseInt(DateArr[2])+1;
console.log(DateArr.toString());
this.data.date = DateArr[0]+"-"+DateArr[1]+"-"+DateArr[2];
this.getinfo();
  //动画
  this.animation.rotateY(360).step();
  this.setData({
    animationData:this.animation.export()
  })
  // 回到初始状态 不然下次相同状态的就不会执行
  setTimeout(function() {
    // 逆时针旋转至0度
    this.animation.rotateY(0).step()
  this.setData({
    animationData: this.animation.export()
  })
  }.bind(this), 500);
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取当前日期
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y =date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
    this.currentday = D;
    // console.log(this.currentday);
    var date = Y+"-"+M+"-"+D;
    this.data.date = date;
    this.getinfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.animation = wx.createAnimation()
  },

  /**
   * 生命周期函数--监听页面显示 动画
   */
  onShow: function () {
    // var animation = wx.createAnimation({
    //   duration: 1000,
    //   timingFunction: 'linear',
    // })
  //   this.animation = animation
  //   //scale 缩放
  //   animation.rotateZ(0).step();
  //  // animation.opacity(0).translate(-50).step()
  //  // animation.scale(1,1).rotate(360).opacity().step()
  //   this.setData({
  //     animationData:animation.export()
  //   })
  //   setTimeout(function() {
  //     //animation.opacity(1).translate(0).step();
  //     animation.rotateZ(720).step();
  //     this.setData({
  //       animationData:animation.export()
  //     })
  //   }.bind(this), 1000)
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