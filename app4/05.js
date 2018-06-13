var express=require('express');
var app=express();
var db=require('./model/db')
var session=require('express-session');

app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true
}))

app.set('view engine','ejs');

app.get('/',function (req,res) {
    if(req.session.login=='1'){
        res.send('欢迎'+req.session.username);
    }else{
        res.send('没有成功登录!')
    }
})

app.get('/login',function (req,res) {
    res.render('denglu');
})

app.get('/checklogin',function (req,res) {
    var tianxiedeusername=req.query.username;
    var tianxiedepassword=req.query.password;
    db.find('users',{"username":tianxiedeusername},function (err,result) {
        if(result.length==0){
            res.send('该用户不存在');
            return;
        }
        var shujukuzhongdepassword=result[0].password;
        if(shujukuzhongdepassword==tianxiedepassword){
            req.session.login='1';
            req.session.username=result[0].username;
            res.send('成功登录！你是'+result[0].username);
        }else{
            res.send('密码错误！')
        }
    })
})
app.listen(80);