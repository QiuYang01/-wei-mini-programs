// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database();
  const  startwordCollection = db.collection('startword');

  // return {

  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
  
  //检查是否已经收藏
  if(event.url == "checkhasstart"){
    return await startwordCollection.where({
      'result.original':event.word,
       openid: wxContext.OPENID, 
    }).count();
  }

  //调用数据库取消收藏
  else if(event.url == "cancelstartword"){
    return await startwordCollection.doc(event.id).remove();
  }

  //调用数据库添加收藏
  else if(event.url == "savestartword"){
    return await startwordCollection.add({
      data:{
       result:event.result,
       openid:wxContext.OPENID, 
       time:new Date()
      }
     })
  }

   //调用数据库获取用户的收藏记录
  else if(event.url == "getstartword"){
    return await startwordCollection.where({
      openid:wxContext.OPENID, 
    }).orderBy('time', 'desc').get();
  }

  else {
    return {
      msg:"error!"
    }
  }


}

