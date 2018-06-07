var express=require('express');

var app=express();

app.get('/',function (req,res) {
    res.render('form');
});
app.post('/',function (req,res) {
    
})

app.listen(80)