//首页
exports.showIndex=function (req,res) {
    res.render('index',{
        "albums":["aaa",'bbb','ccc','ddd']
    })
}
//相册页
exports.showAlbum=function (req,res) {
    res.send('相册'+req.params.albumName)
}