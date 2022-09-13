const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userModel = require('../models/userModel.js');
const refreshTokenModel = require('../models/refreshTokenModel');

const generateAccessToken = async (userId) => await jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
const generateRefreshToken = async (userId) => await jwt.sign({ userId }, process.env.REFRESH_SECRET, { expiresIn: '30d' });
const hashToken = token => crypto.createHash('sha256').update(token).digest('hex');

exports.register = async(req, res) => {

    // get info from req body
    const { name, email, password } = req.body;

    // hash password
    const hash = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new userModel({ name, email, password: hash });

    // save new user and send as json
    try {
        await newUser.save();

        res.json({ userId: newUser._id });

    } catch (err) {
        res.status(400).json({ error: err });
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


    // generate signed access and refresh tokens 
    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    // hash refresh token and save to db
    const hash = hashToken(refreshToken);
    await new refreshTokenModel({ hash }).save();

    // add token to response header
    res.header('authentication', 'Bearer ' + accessToken);

    res.json({ accessToken, refreshToken });
};


// get new access token using a refresh token
// also rotate refresh token by removing it from db and creating a new one
exports.getAccessToken = async (req, res) => {

    // get refresh token from req body
    const { token } = req.body;

    // no refresh token
    if (!token) return res.status(401).json({ error: 'No refresh token provided.' });

    // hash the token and try to find it in db
    const hash = hashToken(token);
    const refreshToken = await refreshTokenModel.findOne({ hash });
    
    // no token found in db => not valid
    if (!refreshToken) return res.status(403).json({ error: 'Invalid refresh token.' });

    // verify refresh token
    try {
        const verified = jwt.verify(token, process.env.REFRESH_SECRET);

        // generate new access and refresh tokens
        const accessToken = await generateAccessToken(verified.userId);
        const newRefreshToken = await generateRefreshToken(verified.userId);
        const newHash = hashToken(newRefreshToken);

        // remove used refresh token from db and add the new one
        await refreshTokenModel.deleteOne({ hash });
        await new refreshTokenModel({ hash: newHash }).save();

        // add token to response header
        res.header('authentication', 'Bearer ' + accessToken);

        res.json({ accessToken, refreshToken: newRefreshToken });

    } catch (err) {
        return res.status(403).json({ error: 'Invalid refresh token.' });
    }
};

// logout by deleting the refresh token in req body
exports.logout = async (req, res) => {
    const { token } = req.body;

    try {
        const hash = hashToken(token);
        const deleted = await refreshTokenModel.deleteOne({ hash });
        console.log(deleted);

        return res.status(204).json({});

    } catch (err) {
        res.status(400).json({ error: err });
    }
}

