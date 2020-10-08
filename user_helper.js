var util = require('./util')

var users_tokens = {
  //'user': [{token:, expire:}]
}

var userHelper = {
    getUsers(){
      return new Promise(resolve => {
        util.mysql_query("select * from user").then(res => {
          let users = Array.from(res)
          resolve(users)
        })
      })
    },
    getUser(staff_id){
      return new Promise(resolve => {
        util.mysql_query("select * from user where staff_id=?", [staff_id]).then(res => {
          if(res.length < 1)
          {
            resolve(null)
            return
          }
          resolve(res[0])
        })
      })
    },
    login(user){
      let t = util.genRandomToken()
      let user_tokens = this.getUserTokens(user.staff_id)
      user_tokens.push({token:t, expire:60*60*1000})
      return t
    },
    getUserByToken(t)
    {
      for(let staff_id in users_tokens)
      {
        for(let token of users_tokens[staff_id])
        {
	//console.log("check "+JSON.stringify(token)+" with "+t)
          if(token.token === t)
          {
            return this.getUser(staff_id)
          }
        }
      }
      return null
    },
    checkToken: async function(t)
    {
      let res = await this.getUserByToken(t)
      return res != undefined && res != null
    },
    isManager(user)
    {
      return user.position === '部门经理'
    },
    genInfoFromUser(user)
    {
      return {
        ...user
      }
    },
    addUser(user)
    {
      return new Promise(resolve => {
        util.mysql_query("insert into user values(?,?,?,?,?,?,?,?,?)", [
          user.staff_id,
          user.pwd,
          user.name,
          user.birthday,
          user.gender,
          user.phone,
          user.address,
          user.position,
          user.dept_id,
        ]).then(res => {
          resolve()
        })
      })
    },
    getUsersByDeptID(dept_id)
    {
      return new Promise(resolve => {
        util.mysql_query("select * from user where dept_id=?", [dept_id]).then(res => {
          resolve(res)
        })
      })
    },
    getUserTokens(staff_id){
      if(users_tokens[staff_id] == undefined) users_tokens[staff_id] = []
      return users_tokens[staff_id]
    },
    updateUser(user){
      return util.mysql_query("update user set name=?,birthday=?,gender=?,phone=?,address=?,position=?,dept_id=? where staff_id=?", [user.name,user.birthday,user.gender,user.phone,user.address,user.position,user.dept_id,user.staff_id])
    },
  }

  module.exports = userHelper
