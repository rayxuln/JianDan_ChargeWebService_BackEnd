var util = require('../util')
var userHelper = require('../user_helper')

var handler = function(req, res){
    let token = req.query.token
    var result = util.genResultMsg()

    let user = userHelper.getUserByToken(token)
    if(user != null)
    {
        result.code = 0
        result.msg = 'ok'
        result.data.info = {
            ...user.staff_info,
            staff_id: user.user
        }

    }else{
        result.code = -1
        result.msg = 'invalid token!'
    }

    res.send(JSON.stringify(result))
}

module.exports = handler