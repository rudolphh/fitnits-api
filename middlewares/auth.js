const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// authenticate middleware function

const accessTokenSecret = process.env.SECRET;

exports.authenticateJWT = (req, res, next) => {
    const token = req.headers['x-access-token'] || localStorage.getItem('authToken');

    if (token) {
        jwt.verify(token, accessTokenSecret, (err, decodedToken) => {
            if (err) return res.sendStatus(403).send({ redirect: '/login' });

            if(!decodedToken) {
                req.user = null;
                next('route');
            }
            req.decodedToken = decodedToken; 
            next();
        });
    } else {
        req.user = null;
        next('route');
    }
};

exports.getAuthenticatedUser = (req, res, next) => {

    User.findOne({ _id: req.decodedToken.id }, (err, user) => {
        if(err) return res.status(500).send('There was a problem searching for the user');
        if(!user) req.user = null;
        req.user = user;
        
        next();
    });
};