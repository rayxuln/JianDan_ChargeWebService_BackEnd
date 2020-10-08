var util = require('../util')
var userHelper = require('../user_helper')
var houseHelper = require('../house_helper')
var houseOwnerHelper = require('../house_owner_helper')
var chargeHelper = require('../charge_helper')

var handler = async function(req, res){
    let token = req.query.token
    var result = util.genResultMsg()

    let operator = await userHelper.getUserByToken(token)
    if(operator != null)
    {
        if(userHelper.isManager(operator))
        {
            let filter = req.body
            // console.log("filters: " + JSON.stringify(filters))
            result.data.charges = await chargeHelper.getChargesWithFilters(filter)
            
            result.code = 0
            result.msg = 'ok'
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
