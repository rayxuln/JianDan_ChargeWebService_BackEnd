var util = require('../util')
var userHelper = require('../user_helper')
var deptHelper = require('../dept_helper')

var handler = async function(req, res){
    let token = req.query.token
    var result = util.genResultMsg()

    let user = await userHelper.getUserByToken(token)
    if(user != null)
    {
        let is_manager = userHelper.isManager(user)
        if(is_manager)
        {
            result.code = 0
            result.msg = 'ok'

            result.data.staffs = []

            let dept = await deptHelper.getDeptById(user.dept_id)
            if(dept != null)
            {
                let staffs = await userHelper.getUsersByDeptID(dept.dept_id)
                result.data.staffs = staffs
            }else{
                result.code = -3
                result.msg = '非法部门'
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
