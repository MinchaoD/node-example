const express = require('express');
const campsiteRouter = express.Router();  // this is to use the express routing method

campsiteRouter.route('/') //the campsites is set up in the server.js
.all((req, res, next) => { // this is to chain .all.get.post.put.delete
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); // next is to go the next relative function, for example if it is delete, then go to next delete, and skip the get, etc
})

.get((req, res) => {
    res.end('Will send all the campsites to you') //I think res.end used by plain node where as res.send is used by express framwork 
    //res.send includes a response.end call, so if when there is res.send then we don't need res.end
})

.post((req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`)
    // in the postman test we will post a json array with name and description, and their content will be passed in here
    // the post is a json array, should look like {"name": "xxx", "description": "yyy"}, then will log out: Will add the campsite: xxx with description: yyy
})

.put((req, res) => {
    res.end('Deleting all campsites');
})

.delete((req, res) => {
    res.end('Deleting all campsites');
});


campsiteRouter.route('/:campsiteId') 
.all((req, res, next) => { 
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); 
})
.get( (req,res) => {
        res.end(`Will send details of the campsites: ${req.params.campsiteId} to you`)
        // here use req.params... to get the campsiteId typed in, for example 23, then will save this number to req.params..
    })
    
.post( (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
})

.put((req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);  
    res.end(`Will update the campsite: ${req.body.name}
        with description: ${req.body.description}`);
})

.delete( (req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
});
    



module.exports = campsiteRouter; //this is to export the campsiteRouter module
// ways to export module: 1. moduel.exports.findX = () =>{}  2. module.exports = () => {}
// 3. exports.name = 'NuCamp'