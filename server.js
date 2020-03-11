const express = require('express');
const { mongoose } = require('./models/mongoose');
const { User, validateUser } = require('./models/users');
const { createUser } = require('./functions/models');

const app = express();
app.use(express.json());

app.post('/user/new', async(req, res) => {
    try {
        let { error } = validateUser(req.body);
        console.log(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User already registered.');

        user = await createUser(req.body);
        res.send({ user });
    } catch (error) {
        res.status(400).send({ error });
    }
});

app.listen(3000, () => console.log('Listening on port 3000...'))