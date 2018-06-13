var express=require('express');
var cookieParser=require('cookie-parser');
var app=express();
app.use(cookieParser());

app.get('/',(req,res)=>{

    res.send("猜你喜欢"+req.cookies.mudidi);
})

app.get('/gonglue',function (req,res) {
    var mudidi=req.query.mudidi;
    var mudidiarr=req.cookies.mudidi|| [];
    mudidiarr.push(mudidi)
    res.cookie("mudidi",mudidiarr,{maxAge:90000,httpOnly:true});
    res.send(mudidi+"旅游攻略");
})

app.listen(80); 