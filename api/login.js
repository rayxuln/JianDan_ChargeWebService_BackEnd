var util = require('../util')
var userHelper = require('../user_helper')


var login_error_count = 0
var login_error_max_count = 10
var login_error_count_reset_time = 10 //s

// 查询token是否过期
setInterval(async function() {
  let users = await userHelper.getUsers()
  for(user of users)
  {
    let user_tokens = userHelper.getUserTokens(user.staff_id)
//	console.log("user["+user.staff_id+"] tokens:"+JSON.stringify(user_tokens))
    for(let token of user_tokens)
    {
      token.expire -= 5000
    }

    // 删除过期的token
    var new_tokens = []
    for(let token of user_tokens)
    {
      if(token.expire > 0)
      {
        new_tokens.push(token)
      }
    }
    user_tokens = new_tokens
  }
}, 5000)

var handler = async function(req, res){
    let user_name = req.query.user
    let user_password = req.query.pwd
    console.log("User[" + user_name + ":" + user_password + "] wants to login!")
    //res.send("{code: 0, msg: 'ok', data: {token: '随机字符串'}")
    var result = util.genResultMsg()
    if(login_error_count >= login_error_max_count)
    {
      result.code = -3
      result.msg = "你登陆失败太多次了，请等个10秒钟再尝试登陆!"
      res.send(JSON.stringify(result))
      return
    }
    var user = await userHelper.getUser(user_name)
    if(user != null)
    {
      if(user_password === user.pwd)
      {
        result.code = 0
        result.msg = "ok"
        result.data.token = userHelper.login(user)
	console.log('login: '+result.data.token)
      }else{
        result.code = -2
        result.msg = "错误的密码!"
      }
    }else{
      result.code = -1
      result.msg = "无效的员工号!"
    }
    if(result.code !== 0) {
      login_error_count += 1
      if(login_error_count === login_error_max_count) {
        setTimeout(function() {
          login_error_count = 0
        }, login_error_count_reset_time * 1000)
      }
    }
    res.send(JSON.stringify(result))
  }

module.exports = handler
