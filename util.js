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
    genRandomToken
}

module.exports = Util