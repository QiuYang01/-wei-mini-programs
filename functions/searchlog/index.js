// 用于保存查词历史记录的云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()



// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext();
  //添加搜索记录
  if(event.url=="savesearchlog"){
    //搜索的词
    const word = event.word;
    //用户的openid
    const openid = cloud.getWXContext().OPENID;
      //获取数据库的引用
      const db = wx.cloud.database();
      //获取一个集合
      const searchlog = db.collection('searchlog');
      searchlog.add({
        data: {
          word: "database",
          time: new Date()
        }
      })
      .then(res =>{
        console.log(res);
      })

    return {
      word,
      openid
    }
  }
  //查找搜索记录
  if(event.url=="savesearchlog"){
    //搜索的词
    const word = event.word;
    //用户的openid
    const openid = cloud.getWXContext().OPENID;
    return {
      word,
      openid
    }
  }
  else {
    return {
      msg:"url错误"
    }
  }

}