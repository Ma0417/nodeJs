var http = require("http");
var url = require("url");
const { URL } = require('url');
var server = http.createServer(function(req,res){

    const myURL = new URL('https://abc:xyz@example.com');
    console.log(myURL.password);
    // 输出 xyz

    myURL.password = '123';
    console.log(myURL.href);
    // 输出 https://abc:123@

    res.end();
});

server.listen(3300);