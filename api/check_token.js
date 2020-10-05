var util = require('../util')
var userHelper = require('../user_helper')

var handler = function(req, res){
    let token = req.query.token
    var result = util.genResultMsg()
    result.code = 0
    result.msg = 'ok'
    result.data.valid = userHelper.checkToken(token)
    res.send(JSON.stringify(result))
  }

module.exports = handler