const bcrypt = require('bcryptjs');
require('dotenv').config();
const saltRounds = parseInt(process.env.SALT_ROUNDS);

const hashPassword = (password) => {
  return bcrypt.hashSync(password, saltRounds);
};

const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = {
  hashPassword,
  comparePassword,
};
