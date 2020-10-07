var util = require('../util')
var userHelper = require('../user_helper')
var houseHelper = require('../house_helper')
var houseOwnerHelper = require('../house_owner_helper')
var chargeHelper = require('../charge_helper')

var handler = function(req, res){
    let token = req.query.token
    var result = util.genResultMsg()

    let operator = userHelper.getUserByToken(token)
    if(operator != null)
    {
        let body = req.body

        let house_owner = houseOwnerHelper.getHouseOwner(houseHelper.getHouseOwnerID(body.house_id))
        
        let house_owner_name = house_owner != null ? house_owner.name : '无业主'
        let charge_date = util.getCurrentDateString()

        let charge_sum = 0

        let multy_charges = body.multy_charges
        let charges = []
        let index = 0
        for(let c of multy_charges)
        {
            let charge_item = chargeHelper.genCharge(body.house_id, operator.user, c.type, c.number, body.charge_ym_start, body.charge_ym_end)
            chargeHelper.addCharge(charge_item)
            // console.log("Add charge: " + JSON.stringify(charge_item))
            charge_sum += charge_item.charge
            charges.push({
                key: '' + index++,
                type: c.type,
                number: c.number,
                charge: charge_item.charge.toFixed(2),
            })
        }

        result.data.charge_info = {
            house_id: body.house_id,
            charge_date_interval: "" + body.charge_ym_start + '~' + body.charge_ym_end,
            house_owner_name,
            charges,
            charge_sum: charge_sum.toFixed(2),
            charge_date,
            staff_id: operator.user,
        }

        // console.log(JSON.stringify(result.data.charge_info))
        
        result.code = 0
        result.msg = 'ok'
    }else{
        result.code = -1
        result.msg = 'invalid token!'
    }

    res.send(JSON.stringify(result))
}


module.exports = handler