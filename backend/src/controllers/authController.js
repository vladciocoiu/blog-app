const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel.js');

exports.register = async(req, res) => {

    // get info from req body
    const { name, email, password } = req.body;
    console.log(password);

    // hash password
    const hash = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new userModel({ name, email, password: hash });

    // save new user and send as json
    try {
        await newUser.save();

        res.json({ userId: newUser._id });

    } catch (err) {
        res.status(400).json(err);
    }
};

exports.login = async(req, res) => {
    // get info from req body
    const { email, password } = req.body;

    // check if user exists in db
    const user = await userModel.findOne({ email });
    if(!user) return res.status(400).json({ error: 'Email doesn\'t exist.' });

    // compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid password.' });


    // generate signed json web token
    const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET);

    // add token to response header
    res.header('authentication', 'Bearer ' + token);

    res.json({ token });
};