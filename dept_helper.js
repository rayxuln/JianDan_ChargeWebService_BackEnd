var util = require('./util')

var depts = [
    {
      dept_id: 0,
      name: "收费部门",
      manager_id: 'admin',
      phone: '88688886',
    }
  ]



var deptHelper = {
    // getDepts(){
    //     return depts
    // },
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