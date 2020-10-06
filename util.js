var stringRandom = require('string-random');

const genResultMsg = function(code = 0, msg = "none", data = {}) {
    return {
      code,
      msg,
      data
    }
  }

const genRandomToken = function() {
    return stringRandom(16)
  }

let Util = {
    genResultMsg,
    genRandomToken,
    // 2020-9-13
    getCurrentDateString(){
      let d = new Date()
      return d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate()
    }
}

module.exports = Util