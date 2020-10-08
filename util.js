var stringRandom = require('string-random');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'ipwis123',
  database : 'wuye'
});

console.log("Connecting to mysql server...")
async function connectToMysql(){
  await new Promise(function(resolve, reject){
    connection.connect(function(err){
      if(err){
        reject(err)
        return
      }
      resolve()
    });
  })
}
try{
  connectToMysql()
  console.log("Connect to mysql successfully!")
}catch(err)
{
  if(err)
    console.log(err.message)
  else
    console.log("Connect to mysql because why not.")
}



const genResultMsg = function(code = 0, msg = "none", data = {}) {
    return {
      code,
      msg,
      data
    }
  }

const genRandomToken = function() {
    return stringRandom(16)
  }

let Util = {
    mysql: connection,
    mysql_query(sql, params=[]){
      let res = new Promise((resolve, reject) => {
        this.mysql.query(sql, params, function(err, result){
          if(err){
            reject(err)
            return
          }
          resolve(result)
        })
      })
      return res
    },
    genResultMsg,
    genRandomToken,
    // 2020-9-13
    getCurrentDateString(){
      let d = new Date()
      return d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate()
    }
}

// async function f1(){
//   console.log(await Util.mysql_query('select * from test1 where id=?', [0]))
// }
// f1()

module.exports = Util