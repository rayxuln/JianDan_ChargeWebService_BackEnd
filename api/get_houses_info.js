var util = require('../util')
var userHelper = require('../user_helper')
var houseHelper = require('../house_helper')
var houseOwnerHelper = require('../house_owner_helper')

var handler = function(req, res){
    let token = req.query.token
    var result = util.genResultMsg()

    let operator = userHelper.getUserByToken(token)
    if(operator != null)
    {
        result.data.houses = []

        for(let house of houseHelper.getHouses())
        {
            let owner = houseOwnerHelper.getHouseOwner(house.owner_id)
            result.data.houses.push({
                house_id: house.house_id,
                house_owner_name: owner != null ? owner.name : "(无业主)"
            })
        }

        result.code = 0
        result.msg = 'ok'
    }else{
        result.code = -1
        result.msg = 'invalid token!'
    }

    res.send(JSON.stringify(result))
}


module.exports = handler