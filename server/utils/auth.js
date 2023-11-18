const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/RefreshToken');

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

const calculateExpiryDate = (days) => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + days);
    return expiryDate;
};

const invalidateRefreshToken = async (refreshToken) => {
    try {
        // Remove the refresh token from the database
        await RefreshToken.findOneAndDelete({ token: refreshToken });

    } catch (err) {
        console.error(err.message);
        throw new Error('Server error');
    }
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    calculateExpiryDate,
    invalidateRefreshToken
};
