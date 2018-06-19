var fs=require('fs');
var gm=require('gm');

gm("./public/images/404.jpg").crop(100,100,100,100).write("./public/images/403.jpg",function (err) {

})