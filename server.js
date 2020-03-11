const express = require('express');
const { mongoose } = require('./models/mongoose');
const { User, validateUser } = require('./models/users');
const { createUser } = require('./functions/models');
const { authenticate } = require('./functions/authenticate');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

app.post('/user/new', authenticate, async(req, res) => {
    try {
        const body = _.pick(req.body, ['firstName', 'lastName', 'username', 'password', 'email']);
        let { error } = validateUser(body);
        console.log(body);
        if (error) return res.status(400).send(error.details[0].message);
        let user = await User.findOne({ email: body.email });
        if (user) return res.status(400).send('User already registered.');

        user = new User(body);
        await user.save();
        res.send({ user });
    } catch (error) {
        res.status(400).send({ error });
    }
});

app.post('/login', async(req, res) => {
    try {
        const body = _.pick(req.body, ['username', 'password']);
        let user = await User.userLogin(body.username, body.password);
        const token = jwt.sign({ _id: user._id }, 'jwtsecretkey');
        res.send({ status: 'success', token });
    } catch (error) {
        res.status(400).send({ error });
    }
});

app.listen(3000, () => console.log('Listening on port 3000...'))