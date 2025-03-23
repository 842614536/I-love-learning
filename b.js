const http = require('http');


// 发送一个请求到代理服务器
const options = {
  port: 8040,
  hostname: '127.0.0.1',
  method: 'POST',
  path: 'http://lpf.com:8040/operate/reading-list/query',
  headers: {
    referer: 'http://www.baidu.com',
    'user-agent': 'GGG'
  }
};

const req = http.request(options);
req.end();

req.on('connect', (res, socket, head) => {
  console.log('已连接！');

  // 通过代理服务器发送一个请求
  socket.write('GET / HTTP/1.1\r\n' +
                'Host: www.google.com:80\r\n' +
                'Connection: close\r\n' +
                '\r\n');
  socket.on('data', (chunk) => {
    console.log(chunk.toString());
  });
  socket.on('end', () => {
    proxy.close();
  });
});