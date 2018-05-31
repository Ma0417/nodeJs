var http=require('http');
var url=require('url');
var queryString=require('querystring');

server =http.createServer(function (req,res) {
    var queryObj=url.parse(req.url,true).query;
    var name=queryObj.name;
    var age=queryObj.age;
    var sex=queryObj.sex;
    res.end('success'+name+age+sex);

}).listen(3400)