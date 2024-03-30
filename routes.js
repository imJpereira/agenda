const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contactController = require('./src/controllers/contactController');
const { loginRequired } = require('./src/middlewares/middleware');

//HOME
route.get('/', homeController.index);

//LOGIN
route.get('/login', loginController.index);
route.post('/login/signup', loginController.signUp);
route.post('/login/signin', loginController.signIn);
route.get('/login/logout', loginController.logout);

//CONTATO
route.get('/contato', loginRequired, contactController.index);
route.post('/contato/register', loginRequired, contactController.create);
route.get('/contato/:id', loginRequired, contactController.editContact);

module.exports = route;