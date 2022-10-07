const { Router } = require('express');
const { signup, login, refreshToken } = require('../controllers/controllerAuth.js');


const routerAuth = Router();
routerAuth.route('/signup').post(signup);
routerAuth.route('/login').post(login);
routerAuth.route('/refreshtoken').all(refreshToken);

module.exports = { routerAuth };
