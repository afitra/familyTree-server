const bcrypt = require('bcrypt');

const saltRounds = process.env.saltRounds
const salt = bcrypt.genSaltSync(saltRounds);

function hash(password) {
    return bcrypt.hashSync(password, salt);
}

module.exports = hash