var http=require('http');
var url=require('url');


server =http.createServer(function (req,res) {
    var userurl=req.url;
    res.writeHead(200,{"Content-type":"text/html;charset=UTF8"})
    if(userurl.substr(0,9)=='/student/'){
        var studentid=userurl.substr(9)
        if(/^\d{10}$/.test(studentid)){
            res.end("您要查询学生信息 id为"+studentid)
        }else{
            res.end('该学生不存在')
        }
    }else if(userurl.substr(0,9)=='/teacher/'){
        var teacherid=userurl.substr(9)
        if(/^\d{6}$/.test(teacherid)){
            res.end("您要查询老师信息 id为"+teacherid)
        }else{
            res.end('该老师号码不存在')
        }
    }else{
        res.end('输入不合法')
    }

}).listen(3500)