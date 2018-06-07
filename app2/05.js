var express=require('express');
var app=express();

app.use('/admin',function (req,res) {
    res.send('你好')
});

app.listen(80)