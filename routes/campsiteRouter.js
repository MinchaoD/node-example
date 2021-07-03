const express = require('express');
const Campsite = require('../models/campsite')
const campsiteRouter = express.Router();  // this is to use the express routing method
const authenticate = require('../authenticate');

campsiteRouter.route('/') //the campsites is set up in the server.js
.get((req, res, next) => {
    Campsite.find()
    .populate('comments.author')  // for all the get method, we add this code, is because when we do get, it will return the first and last name from user for the comment author 
    .then(campsites => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(campsites);
    })
    .catch(err => next(err)); // this is to go the next error where express will handle
})

.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
   Campsite.create(req.body)
   .then(campsite => {
       console.log('Campsite Created', campsite);
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(campsite);
   })
   .catch(err => next(err));
})

.put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
})

.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Campsite.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});


campsiteRouter.route('/:campsiteId') 

.get((req, res, next) => {
    Campsite.findById(req.params.campsiteId)
    .populate('comments.author')
    .then(campsite => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(campsite);
    })
    .catch(err => next(err)); 
})
    
.post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
})

.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
   Campsite.findByIdAndUpdate(req.params.campsiteId, {
       $set: req.body
   }, {new: true})
   .then(campsite => {
       res.statusCode = 200;
       res.setHeader('Content-Type','application/json');
       res.json(campsite);
   })
   .catch(err => next(err));
   })

.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
     Campsite.findByIdAndDelete(req.params.campsiteId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});


//below code are for comments router connect with MongoDB

campsiteRouter.route('/:campsiteId/comments')
.get((req, res, next) => {
    Campsite.findById(req.params.campsiteId)
    .populate('comments.author')
    .then(campsite => {
        if (campsite) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(campsite.comments);
        } else {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    Campsite.findById(req.params.campsiteId)
    .then(campsite => {
        if (campsite) {
            req.body.author = req.user._id;  //store the user.id to the comment.author
            campsite.comments.push(req.body);
            campsite.save()  // this is to save the new data to MongoDB
            .then(campsite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(campsite);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /campsites/${req.params.campsiteId}/comments`);
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Campsite.findById(req.params.campsiteId)
    .then(campsite => {
        if (campsite) {
            for (let i = (campsite.comments.length-1); i >= 0; i--) {
                campsite.comments.id(campsite.comments[i]._id).remove();  // this is loop through all the comments and delete every single one comment
            }
            campsite.save()
            .then(campsite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(campsite);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
});

campsiteRouter.route('/:campsiteId/comments/:commentId')
.get((req, res, next) => {
    Campsite.findById(req.params.campsiteId)
    .populate('comments.author')
    .then(campsite => {
        if (campsite && campsite.comments.id(req.params.commentId)) {  // to check if campsite exist and comments.id exists
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(campsite.comments.id(req.params.commentId));
        } else if (!campsite) {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`Comment ${req.params.commentId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})

.post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}/comments/${req.params.commentId}`);
})

.put(authenticate.verifyUser, (req, res, next) => {
   
    Campsite.findById(req.params.campsiteId)
   
    .then(campsite => {
        if (campsite && campsite.comments.id(req.params.commentId)) {
            if(req.user._id.equals(campsite.comments.id(req.params.commentId).author._id)){  // to check if the comment author id is same as the login user id, if same, then can update the comment
                if (req.body.rating) {
                    campsite.comments.id(req.params.commentId).rating = req.body.rating;  
                }
                if (req.body.text) {
                    campsite.comments.id(req.params.commentId).text = req.body.text;  // these code allow to update rating and text, not other parameter
                }
                campsite.save()
                .then(campsite => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(campsite);
                })
                .catch(err => next(err));}
            else {
                err = new Error("You are not authorized to perform this operation.")
                err.status = 403;
                return next(err)
            };
        } else if (!campsite) {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`Comment ${req.params.commentId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
} )


.delete(authenticate.verifyUser, (req, res, next) => {
    Campsite.findById(req.params.campsiteId)
    .then(campsite => {
        if (campsite && campsite.comments.id(req.params.commentId)) {
            if(req.user._id.equals(campsite.comments.id(req.params.commentId).author._id)){ // to check if the comment author id is same as the login user id, if same, then can delete the comment
                campsite.comments.id(req.params.commentId).remove();
                campsite.save()
                .then(campsite => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(campsite);
                })
                .catch(err => next(err));}
            else {
                err = new Error("You are not authorized to perform this operation.")
                err.status = 403;
                return next(err)
            };
        } else if (!campsite) {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`Comment ${req.params.commentId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
});
    
module.exports = campsiteRouter; //this is to export the campsiteRouter module
// ways to export module: 1. moduel.exports.findX = () =>{}  2. module.exports = () => {}
// 3. exports.name = 'NuCamp'