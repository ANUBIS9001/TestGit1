module.exports = [
  {
    pattern: 'http://admin.xkw.cn/api/(.*)',
    responder:  "http://121.41.99.209:8081/api/$1"
  },
  {
    pattern: 'http://admin.xkw.cn/(.*)',
    responder:  "http://127.0.0.1:8000/$1"
  },
]
