var http=require('http');
var url=require('url');


http.createServer(function (req,res) {
    if(req.url=='/'){
        res.writeHead(200,{"content-type":"text/html;charset=utf8"});
        res.end('成功！');
    }else{
        res.writeHead(400,{'content-type':'text/html;charset=utf8'})
        res.end('失败！')
    }
}).listen(80);