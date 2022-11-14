const express = require('express');

const router = express.Router();
const { createUser, getUsers, getUserById, deleteUserById, updateUserById, login } = require('../controllers/users.controller.js');

// read
router.get('/', getUsers);

// /:id => req.params = {id : ...}
router.get('/:id', getUserById);

// create
router.post('/', createUser);

// delete
router.delete('/:id', deleteUserById);

// update
router.patch('/:id', updateUserById);

module.exports = router;
