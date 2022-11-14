const express = require('express');
const router = express.Router();

const usersRouter = require('./users.js');
const authRouter = require('./auth.js');
const todoRouter = require('./todo.js');

router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/todo', todoRouter);

module.exports = router;
