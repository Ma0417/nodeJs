var express=require('express');
var app=express();

app.set('view engine','ejs');

app.get('/',function (req,res) {
    res.render('./views/haha.ejs',{
        'news':['woshiasd','asdsadas','2131231']
    })
}).listen(80)