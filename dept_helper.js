var util = require('./util')


var deptHelper = {
    getDeptById(dept_id){
      return new Promise(resolve => {
        util.mysql_query('select * from dept where dept_id=?', [dept_id]).then(res => {
          if(res.length <= 0)
          {
            resolve(null)
            return
          }
          res = res[0]
          resolve({dept_id:res.dept_id, name:res.name, phone:res.phone})
        })
      })
    }
  }

  module.exports = deptHelper