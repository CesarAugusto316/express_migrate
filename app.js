const express = require('express');
const { connectDb } = require('./config/connectDB.js');


const app = express();
connectDb();

const PORT = process.env.PORT || 3_000;
app.use(express.json());

/**
 * 
 * @description default errorHandler
 */
app.use((err, req, res, next) => {
  if (err) {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';

    return res.status(status).json({
      status,
      message
    });
  } else {
    next();
  }
});

// will skip when testing
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[Server ⚡] running on port ${PORT}.`);
  });
}

module.exports = { app };
