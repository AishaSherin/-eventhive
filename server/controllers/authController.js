const User = require('../models/User');

exports.register = async (req, res) => {
  res.json({ msg: 'Register endpoint' });
};

exports.login = async (req, res) => {
  res.json({ msg: 'Login endpoint' });
};
