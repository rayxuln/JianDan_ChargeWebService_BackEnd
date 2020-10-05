var util = require('../util')
var userHelper = require('../user_helper')


var handler = function(req, res){
    let token = req.query.token
    var result = util.genResultMsg()

    var user = userHelper.getUserByToken(token)
    if(user != null)
    {
        for(let t of user.tokens)
        {
            if(t.token === token)
            {
                t.expire = -1
                break
            }
        }

        console.log("User["+user.user+":"+token+"] has logout!")

        result.code = 0
        result.msg = 'ok'
    }else{
        result.code = -1
        result.msg = 'invalid token'
    }
    
    res.send(JSON.stringify(result))
  }

module.exports = handler