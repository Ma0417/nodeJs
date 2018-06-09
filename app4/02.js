var express=require('express');
var app=express();
var db=require('./model/db')

app.get('/charu',function (req,res) {
    var date=new Date().toLocaleTimeString();
    db.insertOne("mytext",{"name":"kentMa","date":date},function (err,result) {
        if(err){
            console.log('插入失败');
            return ;
        }
        res.send('插入成功')
    })
})
app.get('/duqu',function (req,res) {
    var page = parseInt(req.query.page);  //express中读取get参数很简单
    //查找4个参数，在哪个集合查，查什么，分页设置，查完之后做什么
    db.find("mytext",{},{"pageamount":3,"page":page},function(err,result){
        if(err){
            console.log(err);
        }
        res.send(result);
    });
})
app.get('/delete',function (req,res) {
    var name=req.query.name;
    db.deleteMany("hemessage",{"name":name},function (err,result) {
        res.send(result)
    })
})
app.get('/updata',function (req,res) {
    db.updateMany("hemessage",{"name":"王五"},{
        $set:{age:22,score:{yuwen:100,shuxue:100}}
    },function (err,result) {
        if(err){
            console.log(err);
        }
        res.send(result)
    })
})
app.listen(80)