var util = require('./util')

//var house_owners = [
//    {
//        owner_id: 0,
//        name: '向天霸',
//        employer: '太阳系有限公司',
//        phone: '13755439987'
//    }
//]

var houseOwnerHelper = {
    getHouseOwners(){
        return util.mysql_query("select * from house_owner")
    },
    getHouseOwner: async function(owner_id)
    {
        let house_owners = await this.getHouseOwners()
        for(let owner of house_owners)
        {
            // console.log('compare ' + owner.owner_id + ' | ' + owner_id)
            if(owner.owner_id == owner_id)
            {
                return owner
            }
        }
        return null
    }
}

module.exports = houseOwnerHelper
