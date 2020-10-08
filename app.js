
const hostname = '127.0.0.1';
const port = 3000;

let express = require("express");
var history = require('connect-history-api-fallback')
const util = require('./util')

var login = require('./api/login')
var check_token = require('./api/check_token')
var get_user_info = require('./api/get_user_info')
var logout = require('./api/logout')
var get_dept_name = require('./api/get_dept_name')
var get_dept_staffs = require('./api/get_dept_staffs')
var change_staff_info = require('./api/change_staff_info')
var remove_staff = require('./api/remove_staff')
var get_all_none_dept_staffs = require('./api/get_all_none_dept_staffs')
var get_staff_info = require('./api/get_staff_info')
var validate_new_staff_id = require('./api/validate_new_staff_id')
var add_new_staff = require('./api/add_new_staff')
var change_staff_dept = require('./api/change_staff_dept')
var get_houses_info = require('./api/get_houses_info')
var charge = require('./api/charge')
var get_charge_info = require('./api/get_charge_info')
var get_house_owner_name = require('./api/get_house_owner_name')
var get_staff_name = require('./api/get_staff_name');
const userHelper = require("./user_helper");

let app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(history({
  disableDotRule: false,
  rewrites: [
    {
      from: /^\/api\/.*$/,
      to: function(context) {
        return context.parsedUrl.pathname;
      }
    }
  ],
  verbose: false
}));
app.use(express.static('../web_project2/web_demo1/dist'));

// api/login
// 返回: {code: 0, msg: 'ok', data: {token: '随机字符串'} }
// code = 0 为调用成功
// msg 为额外消息
// data 为调用返回数据
// 用户名和密码放在body中
// 验证用户名与密码是否正确
// 返回错误信息
// 统计错误次数
// 错误次数过多延迟验证10秒钟
// 记录登陆成功的token，设置过期时间为1个小时
app.post('/api/login', login)

// api/check_token?token=
// 返回: {code:0, msg:'ok', data: {valid:false/true}}
app.get("/api/check_token", check_token)

// api/get_user_info?token=
// 返回: {code:0, msg:'ok', data: {user_info:{} }}
app.get("/api/get_user_info", get_user_info)

// api/logout?token=
app.get("/api/logout", logout)

// api/get_dept_name?token=
// 获取token所对应的员工所在的部门的名称
app.get("/api/get_dept_name", get_dept_name)

// api/get_dept_staffs?token=
// 获取token所对应员工所在的部门的所有员工信息
// 将会检验token的权限
app.get("/api/get_dept_staffs", get_dept_staffs)

// api/change_staff_info?token=
// 修改员工信息
// 修改后的数据包含在请求的body中
app.post("/api/change_staff_info", change_staff_info)

// api/remove_staff?token=
// 将员工从原部门移除
// 此操作不会删除员工的数据
app.post("/api/remove_staff", remove_staff)

// api/get_all_none_dept_staffs?token=
// 获取无部门的员工
// 返回员工的id和名字列表
app.get("/api/get_all_none_dept_staffs", get_all_none_dept_staffs)

// api/get_staff_info?token=&staff_id=
// 获取员工的详细信息
app.get("/api/get_staff_info", get_staff_info)

// api/validate_new_staff_id?token=&staff_id=
// 检测新的员工号是否合法
app.get("/api/validate_new_staff_id", validate_new_staff_id)

// api/add_new_staff?token=
// 添加新员工，其部门属于操作员所在部门，职务为收费员工
// 详细信息包含在body中
app.post("/api/add_new_staff", add_new_staff)

// api/change_staff_dept?token=&staff_id=
// 修改员工所在的部门到操作员所在部门
app.get("/api/change_staff_dept", change_staff_dept)

// api/get_houses_info?token=
// 获取所有房子的信息: id，业主
app.get("/api/get_houses_info", get_houses_info)

// api/charge?token=
// 收费，记录收费信息，返回收费单
// 数据储存在body中
app.post("/api/charge", charge)

// api/get_charge_info?token=
// 获取收费记录
// 过滤器放在body中
app.post("/api/get_charge_info", get_charge_info)

// api/get_house_owner_name?token=&house_owner_id=
// 根据业主号获取业主的姓名
app.get("/api/get_house_owner_name", get_house_owner_name)

// api/get_staff_name?token=&staff_id=
// 根据员工号获取员工的姓名
app.get("/api/get_staff_name", get_staff_name)


app.listen(port, ()=>{
  console.log(`Server running at http://${hostname}:${port}/`)
})