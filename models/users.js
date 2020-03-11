const { mongoose } = require('./mongoose');
const joi = require('joi')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: 3,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 255,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        trim: true,
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 1024,
        required: true
    }
});

let User = mongoose.model('User', UserSchema);

var validateUser = (user) => {
    const schema = {
        firstName: joi.string().min(3),
        lastName: joi.string().min(3),
        username: joi.string().min(4).max(50).required(),
        password: joi.string().min(8).max(255).required(),
        email: joi.string().min(5).max(255).required().email()
    }
    return joi.validate(user, schema);
}


module.exports = {
    User,
    validateUser
};