const { connectDb } = require('./config/connectDB.js');
const { app } = require('./app.js');
const { routerTodos } = require('./routes/routerTodos.js');
const { routerAuth } = require('./routes/routerAuth.js');
const { routerUsers } = require('./routes/routerUser.js');
const { defaultErrorHandler } = require('./middlewares/defaultErrorHandler.js');


const PORT = process.env.PORT || 3_000;
connectDb();

// routers
app.use('/api/v1/todos', routerTodos);
app.use('/api/v1/users', routerUsers);
app.use('/api/v1/auth', routerAuth);
app.use(defaultErrorHandler);

// starts listening
app.listen(PORT, () => {
  console.log(`[Server ⚡] running on port ${PORT}.`);
});
