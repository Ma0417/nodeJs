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
app.use("/avatar",express.static('./avatar'));


app.get('/',router.showIndex);


app.get('/regist',router.showRegist);
app.post('/doregist',router.doRegist);


app.get('/login',router.showLogin);
app.post('/dologin',router.doLogin);


app.get('/setavatar',router.showAvatar);
app.post('/dosetavatar',router.doSetavatar);

app.get('/cut',router.showCut);
app.get('/docut',router.doCut)

app.listen(80)