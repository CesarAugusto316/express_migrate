const { Router } = require('express');
const { signup, login } = require('../controllers/controllerAuth.js');


const routerAuth = Router();
routerAuth.route('/signup').post(signup);
routerAuth.route('/login').post(login);
// TODO: routerAuth.route('/refreshtolken')

module.exports = { routerAuth };
