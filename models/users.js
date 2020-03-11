const { mongoose } = require('./mongoose');
const joi = require('joi')
const bcrypt = require('bcrypt');
const _ = require('lodash');


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

UserSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();

    return _.pick(userObject, ['_id', 'firstName', 'firstName', 'username', 'email']);
}

UserSchema.statics.userLogin = function(username, password) {
    let User = this;

    return User.findOne({
        username
    }).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    });
}

UserSchema.pre('save', function(next) {
    let user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
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