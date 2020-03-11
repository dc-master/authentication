const { User } = require('./models/users');
const jwt = require('jsonwebtoken');

let authenticate = async(req, res, next) => {
    try {
        let token = req.header('x-auth');
        let decoded = await jwt.verify(token, 'jwtsecretkey');
        let user = await User.findById(decoded._id)
        req.user = user;
        req.token = token;
        next();
    } catch (err) {
        res.status(401).send('Access Denied!');
    }
};

module.exports = {
    authenticate
};