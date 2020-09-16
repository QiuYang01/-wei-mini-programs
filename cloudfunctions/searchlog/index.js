// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database();
  const  searchlogCollection = db.collection('searchlog');
  
  //调用数据库添加搜索记录
  if(event.url == "savesearchlog"){
    return await searchlogCollection.add({
      data:{
       word:event.word,
       openid:wxContext.OPENID, 
       time:new Date()
      }
     })
  }

   //调用数据库获取用户的搜索记录
  else if(event.url == "getsearchlog"){
    return await searchlogCollection.where({
      openid:wxContext.OPENID,
    }).orderBy('time', 'desc').limit(14).get();
  }

  else {
    return {
      msg:"error!"
    }
  }


  //

  // return {
  //   searchlogCollection,
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}

