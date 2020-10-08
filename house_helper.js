var util = require('./util')

//var houses = [
//    {
//        house_id: 0,
//        area: 120.00,
//        owner_id: 0,
//    },
//    {
//        house_id: 1,
//        area: 3620.00,
//        owner_id: 0,
//    }
//]

var houseHelper = {
    getHouses(){
        return util.mysql_query("select * from house")
    },
    getHouse: async function(house_id){
        let houses = await this.getHouses()
        for(let house of houses)
        {
            if(house.house_id == house_id)
            {
                return house
            }
        }
        return null
    },
    getHouseOwnerID: async function(house_id){
        let house = await this.getHouse(house_id)
        if(house != null)
        {
            return house.owner_id
        }
        return -1
    }
}

module.exports = houseHelper
