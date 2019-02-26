const express = require('express')
const app = express()
const axios = require('axios')
const mongoose = require('mongoose')

//allow custom header and CORS
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');     // 跨域请求的域名端口号
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200);
    // /让options请求快速返回/
  }
  else {
    next();
  }
})


app.get('/', (req, res) => res.send('Hello World!'))




app.post('/login', function (req, res) {
  console.log("==req.body==", req.body)
  let data = {
    code: 1,
    msg: "登录成功",
    data: {}
  }
  res.send(data)
})

app.get('/userInfo', function (req, res) {
  console.log("==req.query==", req.query)
  let data = {
    code: 0,
    msg: "",
    data: {
      name: "JiaLei",
      age: 18
    }
  }
  res.send(data)
})




// app.listen(3000, () => {
//   console.log('Example app listening on port 3000!')
// })

module.exports = app
