const mongoose = require('mongoose');

const URL = 'mongodb://localhost:27017/todo-app';

const db = mongoose.connect(URL);

module.exports = db;
