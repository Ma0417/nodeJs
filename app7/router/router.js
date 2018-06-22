var formidable = require('formidable');
var db = require('../models/db');
var md5 = require('../models/md5');
var path=require('path');
var fs=require('fs');
var gm=require('gm');
//显示首页
exports.showIndex = function (req, res, next) {
    //检索数据库，查找此人的头像
    if (req.session.login == "1") {
        //如果登陆了
        var username = req.session.username;
        var login = true;
    } else {
        //没有登陆
        var username = "";  //制定一个空用户名
        var login = false;
    }
    //已经登陆了，那么就要检索数据库，查登陆这个人的头像
    db.find("users", {username: username}, function (err, result) {
        if (result.length == 0) {
            var avatar = "morentx.jpg";
        } else {
            var avatar = result[0].avatar;
        }
        res.render("index", {
            "login": login,
            "username": username,
            "active": "首页",
            "avatar": avatar    //登录人的头像
        });
    });
};

//注册页面
exports.showRegist = function (req, res, next) {
    res.render('regist', {
        "login": req.session.login == "1" ? true : false,
        "username": req.session.login == '1' ? req.session.username : "",
        "active":"注册"
    });
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
                "password": password,
                "avatar":"morentx.jpg"
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
    res.render('login', {
        "login": req.session.login == "1" ? true : false,
        "username": req.session.login == '1' ? req.session.username : "",
        "active":"登录"
    });
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

//上传头像   必须保证是登录状态
exports.showAvatar = function (req, res, next) {
    if (req.session.login != '1'){
        res.send('请登录');
        return;
    }
    res.render('setavatar', {
        "login":true,
        "username":req.session.username,
        "active":"上传头像"
    });
}
//设置头像
exports.doSetavatar = function (req, res, next) {
    var form =new formidable.IncomingForm();
    form.uploadDir=path.normalize(__dirname+"/../avatar");
    form.parse(req,function (err,fields,files) {
        var oldpath=files.touxiang.path;
        var newpath=path.normalize(__dirname+"/../avatar")+"/"+req.session.username+".jpg";
        fs.rename(oldpath,newpath,function (err) {
            // console.log('上传错误')
           if(err){
               res.send('失败');
               return;
           }
            req.session.avatar=req.session.username+".jpg";
           //跳转到切得页面
           res.redirect('/cut');
        })
        // fs.rename()
    })
}

// 切图片
exports.showCut = function (req, res, next) {
    if (req.session.login != '1'){
        res.send('请登录');
        return;
    }
    res.render('cut', {
        avatar:req.session.avatar
    });
}

exports.doCut=function (req,res,next) {
    //接受几个get请求参数
    //文件名、w,h,x,y
    var filename=req.session.avatar;
    var w=req.query.w;
    var h=req.query.h;
    var x=req.query.x;
    var y=req.query.y;
    gm("./avatar/" + filename)
        .crop(w, h, x, y)
        .resize(100, 100, "!")
        .write("./avatar/" + filename, function (err) {
            if (err) {
                res.send("-1");
                return;
            }
            //更改数据库当前用户的avatar这个值
            res.send('1');
        });
}