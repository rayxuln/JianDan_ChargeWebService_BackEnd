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
            
            let staff = userHelper.getUser(body.new_staff_id)
            if(staff == null)
            {
                staff = {
                    user: body.new_staff_id,
                    pwd: body.pwd,
                    tokens: [
                        //{token:"", expire:60*60*1000}
                    ],
                    staff_info: {
                            name: body.name,
                            birthday: body.birthday,
                            gender: body.gender,
                            phone: body.phone,
                            address: body.address,
                            dept_id: operator.staff_info.dept_id,
                            position: "收费员工"
                    }
                }

                userHelper.addUser(staff)

                result.code = 0
                result.msg = 'ok'
            }else{
                result.code = -3
                result.msg = '此员工号已被使用！'
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