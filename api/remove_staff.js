var util = require('../util')
var userHelper = require('../user_helper')
var deptHelper = require('../dept_helper')

var handler = async function(req, res){
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
                if(staff.user !== operator.user)
                {
                    let dept = await deptHelper.getDeptById(operator.staff_info.dept_id)

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

                        staff.staff_info.dept_id = -1

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