var http=require('http');
var url=require('url');
var fs=require('fs');
var path=require('path');

http.createServer(function (req,res) {

    var pathname=url.parse(req.url).pathname;
    if(pathname.indexOf('.')==-1){
        pathname+='/index.html'
    }

    var fileUTL=path.normalize('./'+'static/'+pathname);
    var extname=path.extname(pathname);
    fs.readFile(fileUTL,function (err,data) {
       if(err){
           res.writeHead(404,{"content-type":"text/html;charset=utf8"});
           res.end('<h1>对不起输入错误</h1>')
       }
       getMime(extname,function (mime) {
            res.writeHead(200,{"content-type":mime});
            res.end(data);
        });
    })
}).listen(80);
function getMime(extname,callback) {
    fs.readFile('./mime.json',function (err,data) {
        if(err){
            throw Error('找不到mime.json');
            return;
        }
        var mimejson=JSON.parse(data);
        var mime=mimejson[extname] || 'text/plain';
        callback(mime);
    })
}