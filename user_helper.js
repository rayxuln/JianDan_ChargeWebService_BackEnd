var util = require('./util')
const { resolve } = require('path')

var users = [
    {
      user: "admin",
      pwd: "123456",
      tokens: [
        //{token:"", expire:60*60*1000}
      ],
      staff_info: {
            name: "杰克",
            birthday: "2009-06",
            gender: "男",
            phone: "13812345678",
            address: "北纬一路32号",
            dept_id: 0,
            position: "部门经理"
      }
    },
    {
      user: "10086",
      pwd: "10086",
      tokens: [
        //{token:"", expire:60*60*1000}
      ],
      staff_info: {
            name: "马男",
            birthday: "2007-02",
            gender: "男",
            phone: "1381234xxx8",
            address: "北纬一路31号",
            dept_id: 0,
            position: "收费员工"
      }
    },
    {
      user: "10087",
      pwd: "10087",
      tokens: [
        //{token:"", expire:60*60*1000}
      ],
      staff_info: {
            name: "波本",
            birthday: "2019-06",
            gender: "女",
            phone: "13812345x78",
            address: "虎坊桥一路32号",
            dept_id: -1,
            position: "收费员工"
      }
    }
  ],

var users_tokens = {
  //'user': []
}

var userHelper = {
    rawUserDataToFormal(raw_user){
      return {
        user: raw_user.staff_id,
        pwd: raw_user.pwd,
        tokens: [],
        staff_info: {
          name: raw_user.name,
          birthday: raw_user.birthday,
          gender: raw_user.gender,
          phone: raw_user.phone,
          address: raw_user.address,
          dept_id: raw_user.dept_id,
          position: raw_user.position,
        }
      }
    },
    getUsers(){
      return new Promise(resolve => {
        util.mysql_query("select * from user").then(res => {
          let raw_users = Array.from(res)
          let new_users = []
          for(let ru of raw_users)
          {
            let user = this.rawUserDataToFormal(ru)
            let old_user = this.getUser(user.user)
            if(old_user != null)
            {
              user.tokens = old_user.tokens
            }
            new_users.push(user)
          }
          users = new_users
          resolve(users)
        })
      })
    },
    getUser(user_name){
      for(let user of users){
        if(user.user === user_name){
          return user
        }
      }
      return null;
    },
    login(user){
      let t = util.genRandomToken()
      user.tokens.push({token:t, expire:60*60*1000})
      return t
    },
    getUserByToken(t)
    {
      for(let user of users)
      {
        for(let token of user.tokens)
        {
          if(token.token === t)
          {
            return user
          }
        }
      }
      return null
    },
    checkToken(t)
    {
      let res = this.getUserByToken(t)
      return res != undefined && res != null
    },
    isManager(user)
    {
      return user.staff_info.position === '部门经理'
    },
    genInfoFromUser(user)
    {
      return {
        ...user.staff_info,
        staff_id: user.user
      }
    },
    addUser(user)
    {
      users.push(user)
    },
    getUsersByDeptID(dept_id)
    {
      let res = []
      for(let user of users)
      {
        if(user.staff_info.dept_id === dept_id)
        {
          res.push(user.user)
        }
      }
      return res
    }
  }

  module.exports = userHelper