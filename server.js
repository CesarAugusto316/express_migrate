const { connectDb } = require('./config/connectDB.js');
const { app } = require('./app.js');


const PORT = process.env.PORT || 3_000;
connectDb();

// starts listening
app.listen(PORT, () => {
  console.log(`[Server ⚡] running on port ${PORT}.`);
});
