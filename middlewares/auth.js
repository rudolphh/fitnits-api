const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

const { User } = require('../models/user');

const accessTokenSecret = process.env.SECRET;

exports.verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader ? authHeader.split(' ')[1] : null;// || localStorage.getItem('authToken');
    if(!token){
        return res.status(403).json({ success: false, message: 'no authorization header'});
    }
    
    try {
        const decodedToken = await jwt.verify(token, accessTokenSecret);
        if(!decodedToken) {
            req.user = null;
            next('route');
        }
        req.userId = decodedToken.id; 
        next();
    } 
    catch (error) {
        res.status(403).json({ success: false, message: 'invalid token' });
    }
};

exports.getAuthenticatedUser = async (req, res, next) => {

    try {
        const user = await User.findOne({ _id: req.userId }, { password: 0 });
        req.user = user ? user : null;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send('There was a problem searching for the user');
    }
};