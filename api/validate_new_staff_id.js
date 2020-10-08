var util = require('../util')
var userHelper = require('../user_helper')

var handler = async function(req, res){
    let token = req.query.token
    let staff_id = req.query.staff_id

    var result = util.genResultMsg()

    let operator = await userHelper.getUserByToken(token)
    if(operator != null)
    {
        if(userHelper.isManager(operator))
        {
            let staff = await userHelper.getUser(staff_id)
            if(staff == null)
            {
                result.code = 0
                result.msg = 'ok'
            }else{
                result.code = -3
                result.msg = '此员工号已被使用'
            }
        }else{
            result.code = -2
            result.msg = '你没有权限进行此操作！'
        }

    }else{
        result.code = -1
        result.msg = 'invalid token!'
    }

    res.send(JSON.stringify(result))
}

module.exports = handler
