const express = require ('express');
const morgan = require ('morgan');
const campsiteRouter = require('./routes/campsiteRouter')
const promotionRouter = require('./routes/promotionRouter')
const partnerRouter = require('./routes/partnerRouter')

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev')); //it is to log some development information which will print out some additional information on the screen
// if no above code, it is fine too
// app.use.... are middlewares
//middleware can end the request early or middleware can modify the request
//A layer in the middleware stack is a function, which takes n parameters (2 for express, req & res) and a next function.

app.use(express.json());

app.use('/campsites', campsiteRouter);  //this is to set up the root as /campsites and use the campsiteRouter

app.use('/promotions', promotionRouter);

app.use('/partners', partnerRouter);

app.use(express.static(__dirname + '/public'));  // __dirname is the absolute path of the current directory of the current file is in. 
//this above code is to get the access to the files in public folder

app.use((req, res) => {
    // console.log(req.headers);  // remove this code is because morgan will handle this console.log for us now
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
    //this is an express server won't show for this example server, because the above use.express __dirname + '/public' is to 
    //access the files in the public folder so it won't log out this line of code here (this is an express server)

})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})