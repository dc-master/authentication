const { mongoose } = require('../models/mongoose');
const { User } = require('../models/users');

var createUser = (userData) => {
    let user = new User(userData);
    let result = user.save();
    return user;
}

module.exports = {
    createUser
}