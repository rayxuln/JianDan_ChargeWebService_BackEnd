var util = require('../util')
var userHelper = require('../user_helper')
var deptHelper = require('../dept_helper')

var handler = async function(req, res){
    let token = req.query.token
    var result = util.genResultMsg()

    let user = userHelper.getUserByToken(token)
    if(user != null)
    {
        result.code = 0
        result.msg = 'ok'

        let dept = await deptHelper.getDeptById(user.staff_info.dept_id)
        if(dept != null)
        {
            result.data.dept_name = dept.name
        }else{
            result.data.dept_name = "Unkown"
        }

    }else{
        result.code = -1
        result.msg = 'invalid token!'
    }

    res.send(JSON.stringify(result))
}

module.exports = handler