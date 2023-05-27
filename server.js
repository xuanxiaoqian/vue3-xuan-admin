import http from 'http'

const TOKEN = '123xsqaxqwd'

// 定义路由和处理函数
const routes = {
  '/user/userLogin': (req, res) => {
    if (req.method === 'POST') {
      // 判断当前请求是 POST 请求
      let postData = ''
      req.on('data', (chunk) => {
        postData += chunk.toString()
      })
      req.on('end', () => {
        postData = JSON.parse(postData)
        let data = {}

        if (postData.userName == 'root' && postData.userPwd == '123456') {
          data = {
            code: 200,
            msg: '登录成功',
            data: {
              token: TOKEN,
              userId: 1,
              userAvatar: 'http://qiniu.xuanxiaoqian.com/xuanxiaoqian.jpg',
              userNickname: 'root用户',
            },
          }
        } else {
          data = {
            code: 203,
            msg: '用户名或密码错误',
          }
        }

        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify(data))
        res.end()
      })
    } else {
      res.statusCode = 404
      res.end()
    }
  },

  '/user/getUserData': (req, res) => {
    if (req.method === 'GET') {
      let data = {}

      if (req.headers.token == TOKEN) {
        data = {
          code: 200,
          data: {
            userAvatar: 'http://qiniu.xuanxiaoqian.com/xuanxiaoqian.jpg',
            userNickname: 'root用户',
          },
        }
      } else {
        data = {
          code: 403,
          msg: 'Token指令无效!',
        }
      }

      res.setHeader('Content-Type', 'application/json')
      res.write(JSON.stringify(data))
      res.end()
    } else {
      res.statusCode = 404
      res.end()
    }
  },
}

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  // 路由匹配，根据路由调用对应的处理函数
  if (routes[req.url]) {
    routes[req.url](req, res)
  } else {
    res.statusCode = 404
    res.end('Not Found')
  }
})

// 启动服务
server.listen(7777, () => {
  console.log('Server is running at http://localhost:7777/')
})
