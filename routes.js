const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');

//HOME
route.get('/', homeController.getIndex);

module.exports = route;