var util = require('./util')

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
    }
  ]

var userHelper = {
    getUsers(){
        return users
    },
    getUser(user_name){
      for(user of users){
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
      for(user of users)
      {
        for(token of user.tokens)
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
    }
  }

  module.exports = userHelper