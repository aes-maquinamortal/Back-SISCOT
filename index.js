const { createServer } = require('http');
const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const auth = require('./middleware/auth');

// starts db connection
require('./db/setup');

const app = express();
app.use(cors())
app.use(auth);

const server = new ApolloServer({
    typeDefs, resolvers
});
server.applyMiddleware({ app });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(8888, () => {
    console.log('Server is running on port 8888');
});