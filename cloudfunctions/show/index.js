// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database();
  const  showCollection = db.collection('show');
  console.log("云函数被调用")
  return await showCollection.doc('b00064a76094e38d15716d25019177c2').get()
  // .then(res => {
  //   // res.data 包含该记录的数据
  //   console.log(res.data)
  // })

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}