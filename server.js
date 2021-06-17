const express = require ('express');
const morgan = require ('morgan');
const campsiteRouter = require('./routes/campsiteRouter')
const promotionRouter = require('./routes/promotionRouter')

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev')); //it is to log some development information which will print out some additional information on the screen
// if no above code, it is fine too

app.use(express.json());

// app.get('/campsites/:campsiteId', (req,res) => {
//     res.end(`Will send details of the campsites: ${req.params.campsiteId} to you`)
//     // here use req.params... to get the campsiteId typed in, for example 23, then will save this number to req.params..
// })

// app.post('/campsites/:campsiteId', (req, res) => {
//     res.statusCode = 403;
//     res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
// });

// app.put('/campsites/:campsiteId', (req, res) => {
//     res.write(`Updating the campsite: ${req.params.campsiteId}\n`);  // this is to write first line of logging, and \n is space and next line is the res.end part
//     res.end(`Will update the campsite: ${req.body.name}
//         with description: ${req.body.description}`);
// });

// app.delete('/campsites/:campsiteId', (req, res) => {
//     res.end(`Deleting campsite: ${req.params.campsiteId}`);
// });

app.use('/campsites', campsiteRouter);  //this is to set up the root as /campsites and use the campsiteRouter

app.use('/promotions', promotionRouter);

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