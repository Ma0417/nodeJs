var express=require('express');
var app=express();
var fs=require('fs');
var gm=require('gm')

app.set('view engine','ejs');
app.use(express.static('./public'))
app.use(express.static('./picture'))
app.get('/',function (req,res,next) {
    res.render('index')
})
app.get('/docut',function (req,res,next) {
    //接受几个get请求参数
    //文件名、w,h,x,y
    var filename=req.query.filename;
    var w=req.query.w;
    var h=req.query.h;
    var x=req.query.x;
    var y=req.query.y;
    gm('./picture/404.jpg').crop(w,h,x,y).write('./picture/405.jpg',function (err) {
        if(err){
            res.send('-1');
            return;
        }
        console.log('success');
        res.send('1');
    })
})
app.listen(80);