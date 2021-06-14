const express = require('express');
const campsiteRouter = express.Router();  // this is to use the express routing method

campsiteRouter.route('/') //the campsites is set up in the server.js
.all((req, res, next) => { // this is to chain .all.get.post.put.delete
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); // next is to go the next relative function, for example if it is delete, then go to next delete, and skip the get, etc
})

.get((req, res) => {
    res.end('Will send all the campsites to you')
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

module.exports = campsiteRouter; //this is to export the campsiteRouter module