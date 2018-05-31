const http=require('http');
const fs=require('fs');

server=http.createServer(function (req,res) {
    if(req.url=='/favicon.ico'){
        return;
    }
    var userid=parseInt(Math.random()*89999)+10000;
    console.log(userid+'开始执行-----------')
    fs.readFile('./1.txt',(err,data)=>{
        if (err) throw err;
        console.log(userid+'执行完毕')
        res.end(data);
    })
}).listen(4000)