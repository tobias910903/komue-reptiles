var app = require('express')();
var http = require('http').Server(app);
const axios = require("axios");

let port = 8888
http.listen(port, '0.0.0.0', function () {
    console.log('服务已启动，访问地址 localhost:' + port);
});

/* 页面 */
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

/* 需要获取数据的接口 */
app.get('/data', function (req, res) {
    axios.get('https://somp.suning.com/somp/returnOrder/queryReturnOrder.action?page=5&datebegin=2020-12-21&dateend=2020-12-31&tabtype=tab_1&timeMode=0').then(response => {
        console.log(response);
        res.send('请求接口 获取数据 _____');
    }).catch(error => {
        console.log(error);
    });
});
