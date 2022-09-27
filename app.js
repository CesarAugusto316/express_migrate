const express = require('express');
const cors = require('cors');
const { connectDb } = require('./config/connectDB.js');


const app = express();
connectDb();

const PORT = process.env.PORT || 3_000;
app.use(express.json());
app.use(cors());

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

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello World'
  });
});

// will skip when testing
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[Server ⚡] running on port ${PORT}.`);
  });
}

module.exports = { app };
