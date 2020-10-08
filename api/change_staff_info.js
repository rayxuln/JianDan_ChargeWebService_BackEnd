var util = require('../util')
var userHelper = require('../user_helper')
var deptHelper = require('../dept_helper')

var handler = async function(req, res){
    let token = req.query.token
    var result = util.genResultMsg()

    let operator = await userHelper.getUserByToken(token)
    if(operator != null)
    {
        if(userHelper.isManager(operator))
        {
            let body = req.body
            
            let staff = await userHelper.getUser(body.staff_id)
            if(staff != null)
            {
                if(staff.dept_id === operator.dept_id)
                {
                    if(body.name != undefined) staff.name = body.name
                    if(body.gender != undefined) staff.gender = body.gender
                    if(body.phone != undefined) staff.phone = body.phone
                    if(body.birthday != undefined) staff.birthday = body.birthday
                    if(body.address != undefined) staff.address = body.address
                    
                    await userHelper.updateUser(staff)

                    result.code = 0
                    result.msg = 'ok'
                }else{
                    result.code = -4
                    result.msg = '非本部门员工！'
                }
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
