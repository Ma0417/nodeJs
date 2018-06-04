var http=require('http');


http.createServer(function (req,res) {
    res.writeHead(200,{"content-type":"text/html;charset=urf8"});
    res.write('<ul>');
    res.write('<li>haha</li>');
    res.write('<li>haha</li>');
    res.write('<li>haha</li>');
    res.write('<li>haha</li>');
    res.write('<li>haha</li>');
    res.write('</ul>');
    res.end('makang1');
}).listen(4000);