// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database();
  const searchlogCollection = db.collection('searchlog');
  //调用数据库添加搜索记录
  if(event.url == "savesearchlog"){
    return searchlogCollection.add({
      data:{
       word:event.word,
       openid:wxContext.APPID, 
       time:new Date()
      }
     })
  }
  else {
    return {
      msg:"error!"
    }
  }
  //调用数据库添加搜索记录 结束

  // return {
  //   searchlogCollection,
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}

