var util = require('../util')
var userHelper = require('../user_helper')
var deptHelper = require('../dept_helper')

var handler = function(req, res){
    let token = req.query.token
    var result = util.genResultMsg()

    let user = userHelper.getUserByToken(token)
    if(user != null)
    {
        let is_manager = userHelper.isManager(user)
        if(is_manager)
        {
            result.code = 0
            result.msg = 'ok'

            result.data.staffs = []

            let dept = deptHelper.getDeptById(user.staff_info.dept_id)
            if(dept != null)
            {
                let staff_ids = dept.staffs
                for(let s_id of staff_ids)
                {
                    let s = userHelper.getUser(s_id)
                    if(s != null)
                    {
                        result.data.staffs.push(userHelper.genInfoFromUser(s))
                    }
                }
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