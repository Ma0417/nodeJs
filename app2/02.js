var express=require('express');
var app=express();

app.use(express.static('./public'));
app.get('/haha',function (req,res) {
    res.send('sadasdsadasd')
})
app.listen(80);