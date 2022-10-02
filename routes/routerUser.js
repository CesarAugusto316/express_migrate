const { Router } = require('express');
const { getAll, getById, remove, update } = require('../controllers/controllerUser.js');


const routerUsers = Router();

routerUsers.route('/')
  .get(getAll);

routerUsers.route('/:id')
  .get(getById)
  .patch(update)
  .delete(remove);

module.exports = { routerUsers };
