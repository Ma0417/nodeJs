var express=require('express');
var app=express();
var router=require('./router/router.js')
var session=require('express-session');

//使用session
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true,
}));

//使用模板引擎
app.set("view engine","ejs");

app.use(express.static('./public'));


app.get('/',router.showIndex);


app.get('/regist',router.showRegist);
app.post('/doregist',router.doRegist);


app.get('/login',router.showLogin);
app.post('/dologin',router.doLogin);


app.listen(80)