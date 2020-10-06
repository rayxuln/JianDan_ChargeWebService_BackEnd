
const hostname = '127.0.0.1';
const port = 3000;

let express = require("express");
var history = require('connect-history-api-fallback')

var login = require('./api/login')
var check_token = require('./api/check_token')
var get_user_info = require('./api/get_user_info')
var logout = require('./api/logout')
var get_dept_name = require('./api/get_dept_name')
var get_dept_staffs = require('./api/get_dept_staffs')
var change_staff_info = require('./api/change_staff_info')

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

// api/login?user=&pwd=
// 返回: {code: 0, msg: 'ok', data: {token: '随机字符串'} }
// code = 0 为调用成功
// msg 为额外消息
// data 为调用返回数据
// 验证用户名与密码是否正确
// 返回错误信息
// 统计错误次数
// 错误次数过多延迟验证10秒钟
// 记录登陆成功的token，设置过期时间为1个小时
app.get('/api/login', login)

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

app.listen(port, ()=>{
  console.log(`Server running at http://${hostname}:${port}/`)
})