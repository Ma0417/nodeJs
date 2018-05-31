var http=require('http');
var fs=require('fs');

http.createServer((req,res)=>{
    if(res.url=='/favicon.ico'){
        return;
    }
    fs.readdir('./image/',(err,files)=>{//files是一个存放文件或文件夹的数组
        var wenjianjia=[];
        (function iterator(i) {
            //遍历结束
            if(i==files.length){
                console.log(wenjianjia)
                return;
            }
            fs.stat('./image'+files[i],(err,stats)=>{
                //检测成功后做的事情
                if(stats.isDirectory()){
                    //如果是文件夹，就放入数组
                    wenjianjia.push(files[i])
                }
                iterator(i+1)
            })
        })(0)
    })
    res.end()
}).listen(5000)