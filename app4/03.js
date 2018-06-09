const exprss = require('express');
const app = exprss();
const db = require('./model/db');
const formidable = require('formidable');
const ObjectId = require('mongodb').ObjectID;


app.set("view engine", "ejs");

app.use(exprss.static('./public'))
//显示留言列表
app.get('/', (req, res, next) => {
    db.getAllCount("liuyanban",(count)=>{
        res.render("index",{
            "pageamount" : Math.ceil(count / 20)
        });
    })
});
app.get('/du',(req,res,next)=>{
    var page = parseInt(req.query.page);
    db.find("liuyanben",{},{"sort":{"date":-1},"pageamount":20,"page":page},function(err,result){
        res.json({"result":result});
    });
})
app.post('/tijiao', (req, res, next) => {
    var date=new Date().toLocaleTimeString();
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        db.insertOne('liuyanben', {
            "name": fields.name,
            "liuyan": fields.liuyan,
            'date':date
        }, function (err, result) {
            if(err){
                res.send({"result":-1}); //-1是给Ajax看的
                return;
            }
            res.json({"result":1});
        })
    });

})
//删除
app.get("/shanchu",function(req,res,next){
    //得到参数
    var id = req.query.id;
    db.deleteMany("liuyanben",{"_id":ObjectId(id)},function(err,result){

        res.redirect("/");
    });
})

app.listen(80)

