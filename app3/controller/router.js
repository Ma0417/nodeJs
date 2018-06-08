
var file=require('../models/file')
var formidable=require('formidable');
var path=require('path');
var fs=require('fs');
var sd=require('silly-datetime')
//首页
exports.showIndex=function (req,res,next) {

    file.getAllAlbums(function (err,allAlabums) {
        if(err){
            next();
            return;
        }
        res.render('index',{
            "albums":allAlabums
        })
    })
}
//相册页
exports.showAlbum = function(req,res,next){
    //遍历相册中的所有图片
    var albumName = req.params.albumName;
    //具体业务交给model
    file.getAllImagesByAlbumName(albumName,function(err,imagesArray){
        if(err){
            next(); //交给下面的中间件
            return;
        }
        res.render("album",{
            "albumname" : albumName,
            "images" : imagesArray
        });
    });
};
//显示上传
exports.showUp=function (req,res) {
    file.getAllAlbums(function (err, albums) {
        res.render('up', {
            albums: albums
        });
    })
};
//上传表单
exports.doPost=function (req,res,next) {
    var form = new formidable.IncomingForm();
    form.uploadDir=path.normalize(__dirname+'/../tempup/');
    form.parse(req, function(err, fields, files) {
        console.log(fields);
        console.log(files);
        if(err){
            next();
            return;
        }
        var size=parseInt(files.tupian.size);
        if(size>2000){
            res.send('图片尺寸大于2M');
            fs.unlink(files.path);
            return;
        }
        var ttt=sd.format(new Date(),'YYYYMMDDHHmmss');
        var ran=parseInt(Math.random()*89999+10000);
        var extname=path.extname(files.tupian.name);
        var wenjianjia=fields.wenjianjia;
        var oldpath=files.tupian.path;
        var newpath=path.normalize(__dirname+"/../uploads/"+wenjianjia+'/'+ttt+ran+extname)
        fs.rename(oldpath,newpath,function (err) {
            if(err){
                res.send('改名失败');
                return;
            }
        })

    });
    return;
}
