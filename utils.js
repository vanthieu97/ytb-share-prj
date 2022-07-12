const bcrypt = require('bcrypt')
const { SALT_ROUNDS } = require('./constant')

exports.getHash = async (password) => await bcrypt.genSalt(SALT_ROUNDS).then((salt) => bcrypt.hash(password, salt))
