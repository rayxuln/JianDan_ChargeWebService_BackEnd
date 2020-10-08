var util = require('../util')
var userHelper = require('../user_helper')
var houseHelper = require('../house_helper')
var houseOwnerHelper = require('../house_owner_helper')
var chargeHelper = require('../charge_helper')


var handler = async function(req, res){
    let token = req.query.token
    let house_owner_id = req.query.house_owner_id
    var result = util.genResultMsg()

    let operator = await userHelper.getUserByToken(token)
    if(operator != null)
    {
        if(userHelper.isManager(operator))
        {
            let house_owner = await houseOwnerHelper.getHouseOwner(house_owner_id)
            // console.log("owner_id: " + house_owner_id)
            if(house_owner != null)
            {
                result.data = house_owner.name
                result.code = 0
                result.msg = 'ok'
            }else{
                result.code = -3
                result.msg = '未知业主'
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
