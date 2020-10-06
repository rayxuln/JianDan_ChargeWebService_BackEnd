var util = require('../util')
var userHelper = require('../user_helper')
var deptHelper = require('../dept_helper')

var handler = function(req, res){
    let token = req.query.token
    var result = util.genResultMsg()

    let operator = userHelper.getUserByToken(token)
    if(operator != null)
    {
        if(userHelper.isManager(operator))
        {
            let body = req.body
            
            let staff = userHelper.getUser(body.staff_id)
            if(staff != null)
            {
                if(body.name != undefined) staff.staff_info.name = body.name
                if(body.gender != undefined) staff.staff_info.gender = body.gender
                if(body.phone != undefined) staff.staff_info.phone = body.phone
                if(body.birthday != undefined) staff.staff_info.birthday = body.birthday
                if(body.address != undefined) staff.staff_info.address = body.address

                result.code = 0
                result.msg = 'ok'
            }else{
                result.code = -3
                result.msg = '查无此人'
            }
        }else{
            result.code = -2
            result.msg = "你没有权限进行此操作！"
        }
    }else{
        result.code = -1
        result.msg = 'Invalid token!'
    }

    res.send(JSON.stringify(result))
  }

module.exports = handler