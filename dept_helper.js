var util = require('./util')

var depts = [
    {
      dept_id: 0,
      name: "收费部门",
      manager_id: 'admin',
      phone: '88688886',
      staffs: [
          'admin'
      ]
    }
  ]



var deptHelper = {
    getDepts(){
        return depts
    },
    getDeptById(dept_id){
        for(let dept of depts)
        {
            if(dept.dept_id === dept_id)
            {
                return dept
            }
        }
        return null
    }
  }

  module.exports = deptHelper