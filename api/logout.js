var util = require('../util')
var userHelper = require('../user_helper')


var handler = async function(req, res){
    let token = req.query.token
    var result = util.genResultMsg()

    var user = await userHelper.getUserByToken(token)
    if(user != null)
    {
        let user_tokens = userHelper.getUserTokens(user.staff_id)
        for(let t of user_tokens)
        {
            if(t.token === token)
            {
                t.expire = -1
                break
            }
        }

        console.log("User["+user.staff_id+":"+token+"] has logout!")

        result.code = 0
        result.msg = 'ok'
    }else{
        result.code = -1
        result.msg = 'invalid token'
    }
    
    res.send(JSON.stringify(result))
  }

module.exports = handler