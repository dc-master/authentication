const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/authentication', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => {
    console.log('connect to db');
}, (err) => {
    console.log('Error to connect');
});
module.exports = {
    mongoose
};