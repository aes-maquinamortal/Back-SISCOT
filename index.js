const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = require('./schema');
const resolvers = require('./resolvers');
const auth = require('./middleware/auth');

// starts db connection
require('./db/setup');

const app = express();

app.use(bodyParser.json());
app.use(auth);

app.use('/graphql', graphqlHttp({
    schema: buildSchema(schema),
    rootValue: resolvers,
    graphiql: true
}));

app.listen(8888, () => {
    console.log('Server is running on port 8888')
});