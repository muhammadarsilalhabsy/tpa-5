const User = require('../models/users');
const bcrypt = require('bcrypt');

// get method
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-__v -password');

    res.status(200).json({
      massage: 'Success get all users',
      data: users,
    });
  } catch (e) {
    console.log(e);
  }
};

const getUserById = async (req, res) => {
  const data = req.params;

  const isUserExist = await User.findOne({ _id: data.id }).select('-__v -password');
  if (isUserExist) {
    res.status(200).json({
      success: true,
      data: isUserExist,
      message: 'Task is fetched successfully',
    });
  } else {
    res.status(401).json({
      success: false,
      data: null,
      message: 'Task is Not Found',
    });
  }
};

// post method
const createUser = (req, res) => {
  const data = req.body;

  const saltRounds = 10;
  const hash = bcrypt.hashSync(data.password, saltRounds);
  data.password = hash;

  const user = new User(data);

  user.save();

  res.status(201).json({
    massage: 'Success add users bru',
  });
};

// delete method
const deleteUserById = async (req, res) => {
  const { id } = req.params;

  await User.findByIdAndRemove({ _id: id });

  res.json({
    massage: `user with id : ${id} hash been delete bru`,
  });
};

// update method
const updateUserById = async (req, res) => {
  const data = req.body;

  const userIsExist = await User.findOne({ _id: req.params.id });
  if (userIsExist) {
    if (data.email) {
      userIsExist.email = data.email;
    }
    if (data.name) {
      userIsExist.name = data.name;
    }
    if (data.password) {
      const saltRounds = 10;
      const hash = bcrypt.hashSync(data.password, saltRounds);
      userIsExist.password = hash;
    }
    const updateUser = await userIsExist.save();
    res.status(200).json({
      message: 'User is updated successfully bru',
      success: true,
    });
  } else {
    res.status(401).json({
      message: 'User is Not Found bru',
      success: false,
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
};
