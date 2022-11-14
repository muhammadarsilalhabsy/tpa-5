const User = require('../models/users');
const bcrypt = require('bcrypt');
jwt = require('jsonwebtoken');

const KEY = 'tugas numpuk';

// login
const login = async (req, res) => {
  const data = req.body;

  const user = await User.findOne({ email: data.email });
  const userIsExist = bcrypt.compareSync(data.password, user.password);

  const token = jwt.sign(
    {
      id: data._id,
    },
    KEY
  );
  if (userIsExist) {
    res.status(200).json({
      massage: 'Success login',
      token,
    });
  } else {
    res.status(401).json({
      massage: "we don't know who you are",
    });
  }
};

module.exports = {
  login,
};
