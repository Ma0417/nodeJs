var http=require('http');
var url=require('url');
var fs=require('fs');
var path=require('path');

http.createServer(function (req,res) {
    var pathname=url.parse(req.url).pathname;//得到用户路径
    if(pathname=='/'){pathname='index.html'}
    var extname=path.extname(pathname);
    console.log(extname);
    fs.readFile('./static/'+pathname,function (err,data) {
        if(err){
            fs.readFile('./static/404.html',function (err,data) {
                var mime=getMime(extname);
                res.writeHead(404,{"Content-type":mime});
                res.end(data)
            });
            return;
        };
        res.end(data)
    });
}).listen(4000);
function getMime(extname) {
    switch (extname){
        case '.html':
            return 'text/html';
            break;
        case '/jpg':
            return 'image/jpg';
            break;
    }
}