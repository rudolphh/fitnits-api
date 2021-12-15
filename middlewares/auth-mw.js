const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

const { User } = require('../models/user');

const accessTokenSecret = process.env.SECRET;

// verify jwt and attach userId to req
exports.verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];// || localStorage.getItem('authToken');
    if(!token){
        return res.status(401).json({ success: false, message: 'no authorization header'});
    }
    
    try {
        // if the signature is invalid it throws an error so no need to check decodedToken
        const decodedToken = await jwt.verify(token, accessTokenSecret);
        req.userId = decodedToken.id; 
        next();
    } 
    catch (error) {
        res.status(403).json({ success: false, message: 'invalid token' });
    }
};

// if reached, using req.userId, attach user object to req
exports.getAuthenticatedUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.userId }, { password: 0 });
        if(!user) { return res.status(403).json({ success: false, message: 'Forbidden'})}
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send('There was a problem searching for the user');
    }
};

exports.isAuthorized = (req, res, next) => {
    const userId = req.userIdParam;
    if( userId !== req.userId && req.user.role !== "admin") {
        return res.status(403).json({ success: false, message: 'not authorized for requested resource' });
    }
    next();
};


exports.verifyAdmin = async (req, res, next) => {

    // ignore this middleware if we're registering a normal user
    if(!req.body.role || req.body.role === 'normal')
        return next();

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        req.isAdmin = false;
        return next();
    }

    try {
        const decodedToken = await jwt.verify(token, accessTokenSecret);
        const exists = await User.exists({ _id: decodedToken.id, role: 'admin' });
        req.isAdmin = exists ? true : false;
        next();
    } 
    catch (error) {
        // console.log(error);
        next(error);
    }
};