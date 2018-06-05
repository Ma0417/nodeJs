var express=require('express');
var app=express();
app.get('/',function (req,res) {
    res.send('你好')
});
app.get('/haha',function (req,res) {
    res.send('hahahahha')
});
app.listen(80);