var formidable = require('formidable');
var db = require('../models/db');
var md5 = require('../models/md5');


//显示首页
exports.showIndex = function (req, res, next) {
    res.render('index', {
        "login": req.session.login == "1" ? true : false,
        "username": req.session.login == '1' ? req.session.username : ""
    });
}

//注册页面
exports.showRegist = function (req, res, next) {
    res.render('regist');
}

exports.doRegist = function (req, res, next) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        //得到表单之后做的事情  查询数据库是不是有这个人 保存这个人
        var username = fields.username;
        var password = fields.password;
        db.find("users", {"username": username}, function (err, result) {
            if (err) {
                res.send('-3');//服务器错误
                return;
            }
            if (result.length != 0) {
                res.send('-1');//被占用
                return;
            }
            //设置MD5加密
            password = md5(password) + md5(password) + "2";
            db.insertOne("users", {
                "username": username,
                "password": password
            }, function (err, result) {
                if (err) {
                    res.send('-3');//服务器错误
                    return;
                }
                req.session.login = '1';
                req.session.username = username;
                res.send('1')
            })
        })

    });
}


//登录页面
exports.showLogin = function (req, res, next) {
    res.render('login');
}
exports.doLogin = function (req, res, next) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        var username=fields.username;
        var password=fields.password;
        db.find("users",{"username":username},function (err,result) {
            if(err){
                res.send('-3');
                return;
            }
            if(result.length==0){
                res.send('-2');
                return;
            }else{
                password = md5(password) + md5(password) + "2";
                var sjkpassword=result[0].password;
                if(password!=sjkpassword){
                    res.send('-1');
                    return;
                }else{
                    req.session.login = '1';
                    req.session.username = username;
                    res.send('1')
                }
            }
        })
    })
}