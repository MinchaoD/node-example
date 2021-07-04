const cors = require('cors');

const whitelist = ['http://localhost:3000', 'https://localhost:3443'];  //this whitelist is for the origin can be accepted
const corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    console.log(req.header('Origin'));
    if(whitelist.indexOf(req.header('Origin'))!==-1) {
        corsOptions = {origin: true};
    } else {
        corsOptions = {origin: false};
    }
    callback(null, corsOptions);
};

exports.cors = cors(); // this is for all the origin can be accepted
exports.corsWithOptions = cors(corsOptionsDelegate); // this is only for 2 origin listed under whitelist