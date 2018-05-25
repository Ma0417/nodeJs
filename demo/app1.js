var http=require('http');
http.createServer(function (request,response) {
    //发送HTTP头部
    //HTTP状态值：200:ok
    //内容类型：text/plain
    response.writeHead(200,{'Content-Type':'text/plain'});
    var fs=require('fs');
    var data=fs.readFileSync('input.txt');

    //发送响应数据'hello world'
    response.end(data.toString());
    console.log(data.toString());
    console.log('程序执行结束');
}).listen(8888);

console.log('server running at http://127.0.0.1:8888/');