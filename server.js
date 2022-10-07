const { connectDb } = require('./config/connectDB.js');
const { app } = require('./app.js');
const { routerAuth } = require('./routes/routerAuth.js');
const { routerTodos } = require('./routes/routerTodos.js');
const { routerUsers } = require('./routes/routerUser.js');
const { isAuthenticated } = require('./middlewares/validateTokens.js');
const { defaultErrorHandler } = require('./middlewares/defaultErrorHandler.js');


const PORT = process.env.PORT || 3_000;
connectDb();

// routers
app.use('/api/v1/auth', routerAuth);
app.use('/api/v1/users', routerUsers);
app.use('/api/v1/todos', isAuthenticated, routerTodos);
app.use(defaultErrorHandler);

// starts listening
app.listen(PORT, () => {
  console.log('[NODE_ENV ⚡]', process.env.NODE_ENV);
  console.log(`[Server ⚡] running on port ${PORT}.`);
});
