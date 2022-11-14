const express = require('express');

const router = express.Router();
const { login, register } = require('../controllers/auth.controller.js');

// check
router.post('/login', login);

module.exports = router;
