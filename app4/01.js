var express=require('express');
var app=express();
var MongoClient = require('mongodb').MongoClient;



app.get('/',function (req,res) {
    var url = "mongodb://localhost:27017/";
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("liar");
        var date=new Date().toLocaleTimeString();
        var myobj = { name: "ct", url: "1994-04-09",date:date };
        dbo.collection("shemessage").insertOne(myobj, function(err, res) {
            if (err) throw err;

            console.log("文档插入成功"+myobj.name);
            db.close();
        });
    });
    res.end();
})
app.listen(80)