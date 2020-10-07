var util = require('./util')
var houseHelper = require('./house_helper')

var charge_cnt = 0

var charges = [
    // {
    //     charge_id: 0,
    //     house_id: 0,
            // charge: 10.00,
            // owner_id: 0,
            // date: '2020-9-15',
            // staff_id: '10086',
            // type: '电费',
            // number: '102',
            // charge_ym_start: '2020-2',
            // charge_ym_end: '2020-3'     //缴纳月份的起止日期
    // },
]

var chargeStandas = {
    '物业费': 1.00, //平方米
    '电梯费': 5.00, //层
    '水费': 0.70,   //吨
    '电费': 0.80,   //度
}

var chargesHelper = {
    getCharges(){
        return charges
    },
    genCharge(house_id, staff_id, type, number, charge_ym_start, charge_ym_end)
    {
        return {
            charge_id: charge_cnt++,
            house_id,
            charge: Math.round((chargeStandas[type] * number) * 100.0) / 100.0,
            owner_id: houseHelper.getHouseOwnerID(house_id),
            date: util.getCurrentDateString(),
            staff_id,
            type,
            number,
            charge_ym_start,
            charge_ym_end
        }
    },
    addCharge(charge){
        charges.push(charge)
    },
    getChargesWithFilters(filter){
        let result = []
        for(let i=0; i<charges.length; ++i)
        {
            let charge = charges[i]
            // console.log("charge " + JSON.stringify(charge) + " filter " + JSON.stringify(filter) + " i: " + i)
            if(filter == undefined)
            {
                result.push(charge)
                continue
            }

            let is_this_charge_valid = true
            for(let k in charge)
            {
                let c_v = charge[k]
                let f_v = filter[k]
                if(f_v == undefined || f_v == '')
                {
                    continue
                }

                // 判断c_v是否符合正则表达式f_v
                c_v = '' + c_v
                f_v = '' + f_v
                f_v = new RegExp(f_v)
                // console.log("test " + c_v + " with " + f_v + " key: " + k)
                if(!f_v.test(c_v))
                {
                    is_this_charge_valid = false
                    break
                }
            }

            if(is_this_charge_valid)
            {
                result.push(charge)
            }
        }
        return result
    }
}

module.exports = chargesHelper