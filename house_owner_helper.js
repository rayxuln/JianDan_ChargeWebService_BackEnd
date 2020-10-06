var util = require('./util')

var house_owners = [
    {
        owner_id: 0,
        name: '向天霸',
        employer: '太阳系有限公司',
        phone: '13755439987'
    }
]

var houseOwnerHelper = {
    getHouseOwners(){
        return house_owners
    },
    getHouseOwner(owner_id)
    {
        for(let owner of house_owners)
        {
            if(owner.owner_id === owner_id)
            {
                return owner
            }
        }
        return null
    }
}

module.exports = houseOwnerHelper