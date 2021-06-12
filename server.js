const http = require('http');
const hostname = 'localhost';
const port = 3000;

const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {  //create a server on localhost 3000
    console.log(`Request for ${req.url} by method ${req.method}`);
    if (req.method === 'GET'){
        let fileUrl = req.url;  //req.url is like /aboutus.html or /index.html
        if(fileUrl === '/') {
            fileUrl = '/index.html';  // if fileUrl is localhost:3000/, then it will be same as localhost:3000/index.html
        }
        const filePath = path.resolve('./public'+fileUrl);  //path.resolve is to convert relative path to absolute path
        const fileExt = path.extname(filePath);  //path.extname is to get the extension of filePath, like .html
        if (fileExt === '.html') {
            fs.access(filePath, err => {
                if (err) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html'); // set the content-type as text/html
                    res.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`)
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(filePath).pipe(res);   //this is code to get the data from this file by chunks, like lazy loading
                // .pipe is like to use pipe to connect 2 ends
            });
        } else{
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`)
        }
        } else{
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`)
        }
}) ;

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})