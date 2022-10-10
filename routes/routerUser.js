const { Router } = require('express');
const { isAuthenticated } = require('../middlewares/validateTokens.js');
const { getAll, getById, remove, update } = require('../controllers/controllerUser.js');


const routerUsers = Router();

routerUsers.route('/')
  .get(getAll);

// we can also read req.authenticatedUser
routerUsers.use(isAuthenticated).route('/:userId')
  .get(getById)
  .patch(update)
  .delete(remove);

module.exports = { routerUsers };
