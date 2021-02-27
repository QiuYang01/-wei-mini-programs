// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  const  playAudioTextCollection = db.collection('playAudioText');
  console.log("云函数",event)
  //调用数据库添加记录
  if(event.url == "addPlayAudioText"){
    return await playAudioTextCollection.add({
      data:{
       text:event.text,
       openid:wxContext.OPENID, 
       time:new Date()
      }
     })
  }
  //查询
    else if(event.url == "getAll"){
      return await playAudioTextCollection.orderBy('time', 'desc').get();
    }
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}