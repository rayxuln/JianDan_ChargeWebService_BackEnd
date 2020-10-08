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
                if(staff.staff_id !== operator.staff_id)
                {
                    let dept = await deptHelper.getDeptById(operator.dept_id)

                    if(dept != null)
                    {
                        // let new_staffs = []
                        // for(let s_id of dept.staffs)
                        // {
                        //     if(s_id === staff.user) continue
                        //     new_staffs.push(s_id)
                        // }
                        // dept.staffs = new_staffs
                        // console.log("remove " + staff.user + ", and remains " + dept.staffs)

                        staff.dept_id = null

                        userHelper.updateUser(staff)

                        result.code = 0
                        result.msg = 'ok'
                    }else{
                        result.code = -5
                        result.msg = '非法部门'
                    }
                }else{
                    result.code = -4
                    result.msg = '你不能移除自己！'
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
