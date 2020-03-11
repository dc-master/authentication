const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(config.get('MONGOURI'), { useNewUrlParser: true });

module.exports = {
    mongoose
};