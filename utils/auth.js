const jwt = require('jsonwebtoken');
// const RefreshToken = require('../models/RefreshToken');

const signToken = (payload, secret, options) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
};

const generateAccessToken = (payload) => {
    let secret = process.env.ACCESS_TOKEN_SECRET;
    let options = { expiresIn: '15m' };
    return signToken(payload, secret, options);
};

const generateRefreshToken = (payload) => {
    let secret = process.env.REFRESH_TOKEN_SECRET;
    let options = { expiresIn: '1y' };
    return signToken(payload, secret, options);
}



const invalidateRefreshToken = async (token) => {
    // If you're storing refresh tokens in a database, you would need to remove
    // the token from the database. If you're using a cache like Redis, you
    // would need to remove the token from the cache.

    // Here's an example of how you might implement invalidateRefreshToken
    // if you're storing refresh tokens in a MongoDB database:

    // try {
    //     // Remove the refresh token from the database
    //     await RefreshToken.findOneAndDelete({ token });

    // } catch (err) {
    //     console.error(err.message);
    //     throw new Error('Server error');
    // }
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    invalidateRefreshToken
};
