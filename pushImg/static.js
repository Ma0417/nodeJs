var http=require('http');
var url=require('url');
var fs=require('fs');

http.createServer(function (req,res) {
    var pathname=url.parse(req.url).pathname;//得到用户路径
    if(pathname=='/'){pathname='index.html'}
    fs.readFile('./static/'+pathname,function (err,data) {
        if(err){
            console.log(1)
            fs.readFile('./static/404.html',function (err,data) {
                res.writeHead(404,{"Content-type":"text/html;charset=utf8"});
                res.end(data)
            });
            return;
        };
        res.end(data)
    });
}).listen(4000)