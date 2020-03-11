const { mongoose } = require('./mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
    },
    lastName: {
        type: String,
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
        minlength: 6,
        required: true
    }
});


let User = mongoose.model('User', UserSchema);

module.exports = {
    User
};