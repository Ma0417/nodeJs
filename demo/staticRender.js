var http=require('http');
var fs=require('fs');

var server=http.createServer(function (req,res) {
    if(req.url=='/test'){
        fs.readFile('./test.html',function (err,data) {
            // res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'})
            res.end(data);
        })
    }else if(req.url=='/test1'){
        fs.readFile('./test1.html',function (err,data) {
            // res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'})
            res.end(data);
        })
    }else if(req.url=='/bbb'){
        fs.readFile('./aaa',function (err,data) {
            // res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'})
            res.end(data);
        })
    }else if(req.url=='/1.jpg'){
        fs.readFile('./image/all/1.jpg',function (err,data) {
        // res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'})
        res.end(data);
    })
    }else{
        // res.writeHead(404,{'Content-type':'text/html;charset=UTF-8'})
        res.end('无法访问');
    }
}).listen(4400)