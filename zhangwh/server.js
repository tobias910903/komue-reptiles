var app = require('express')();
var http = require('http').Server(app);

let port = 8888
http.listen(port, '0.0.0.0', function(){
  console.log('服务已启动，访问地址 localhost:' + port);
});

/* 页面 */
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});



/* 需要获取数据的接口 */
app.post('/data', function (req, res) {
  res.send('请求接口 获取数据 _____');
});