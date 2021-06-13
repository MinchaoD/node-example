const express = require ('express');
const morgan = require ('morgan')

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev')); //it is to log some development information which will print out some additional information on the screen
app.use(express.static(__dirname + '/public'));  // __dirname is the absolute path of the current directory of the current file is in. 
//this above code is to get the access to the files in public folder

app.use((req, res) => {
    // console.log(req.headers);  // remove this code is because morgan will handle this console.log for us now
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');

})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})