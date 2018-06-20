var fs=require('fs');
var gm=require('gm');

gm('./picture/image/1.jpg').crop(10,10,10,10).write('./picture/image/11111.jpg',function (err) {
    if(err){
        console.log(err)
    }
    console.log('success')
})