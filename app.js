const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { routerTodos } = require('./routes/routerTodos.js');
const { routerAuth } = require('./routes/routerAuth.js');


const app = express();

app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use('/api/v1/todos', routerTodos);
app.use('/api/v1/auth', routerAuth);

/**
 * 
 * @description default errorHandler
 */
app.use((err, req, res, next) => {
  if (err) {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';

    res.status(status).json({
      status,
      message
    });
  } else {
    next();
  }
});

module.exports = { app };
