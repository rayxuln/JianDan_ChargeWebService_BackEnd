var util = require('../util')
var userHelper = require('../user_helper')

var handler = async function(req, res){
    let token = req.query.token
    var result = util.genResultMsg()
    result.code = 0
    result.msg = 'ok'
//    console.log(token)
    result.data.valid = await userHelper.checkToken(token)
    
    res.send(JSON.stringify(result))
  }

module.exports = handler
