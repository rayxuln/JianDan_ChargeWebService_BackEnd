var util = require('../util')
var userHelper = require('../user_helper')
var deptHelper = require('../dept_helper')

var handler = async function(req, res){
    let token = req.query.token
    let staff_id = req.query.staff_id
    var result = util.genResultMsg()

    let operator = userHelper.getUserByToken(token)
    if(operator != null)
    {
        if(userHelper.isManager(operator))
        {
            let staff = userHelper.getUser(staff_id)
            if(staff != null)
            {
                let dept = await deptHelper.getDeptById(operator.staff_info.dept_id)
                if(dept != null)
                {
                    staff.staff_info.dept_id = dept.dept_id

                    result.code = 0
                    result.msg = 'ok'
                }else{
                    result.code = -4
                    result.msg = '非法部门'
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