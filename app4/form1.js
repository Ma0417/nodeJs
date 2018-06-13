var express=require('express');
var app=express();
var db=require('./model/db');
var md5=require('./model/md5');
var formidable=require('formidable');

app.set('view engine','ejs');

app.get('/',function (req,res,next) {
    res.send('不知道登录没登录');
})
//注册页面
app.get('/regist',function (req,res,next) {
    res.render('regist')
})
//执行注册
app.get('/doregist',function (req,res,next) {
    var dengluming=req.query.dengluming.toString();
    var mima=req.query.mima.toString();
    mima = md5(md5(mima).substr(4,7) + md5(mima));
    db.insertOne('users',{
        "name":dengluming,
        "password":mima
    },function (err,result) {
        if(err){
            res.send('-1');
            return;
        }
        res.send('1')
    })
})

app.get('/login',function (req,res,next) {
    res.render('login')
})
app.post('/dologin',function (req,res,next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var dengluming = fields.dengluming;
        var mima = fields.mima;
        mima = md5(md5(mima).substr(4,7) + md5(mima));

        //检索数据库，按登录名检索数据库，查看密码是否匹配
        db.find("users",{"name":dengluming},function(err,result){
            if(result.length == 0){
                res.send("-2");  //-2没有这个人
                return;
            }
            var shujukuzhongdemima = result[0].password;
            //要对用户这次输入的密码，进行相同的加密操作。然后与
            //数据库中的密码进行比对
            if(mima == shujukuzhongdemima){
                res.send("1");  //成功
            }else{
                res.send("-1"); //密码不匹配
            }
        });
    });
    return;
});

app.listen(80);