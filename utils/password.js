const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
    const salt = bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

module.exports = {
    hashPassword,
};
