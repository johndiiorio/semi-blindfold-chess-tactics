const express = require('express');
const graphQLHTTP = require('express-graphql');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const schema = require('./graphql');
const buildContext = require('./buildContext');

const app = express();

app.enable('trust proxy');

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', '..', 'build')));

app.use(
  '/graphql',
  graphQLHTTP(req => ({
    schema,
    pretty: true,
    graphiql: process.env.NODE_ENV === 'development',
    context: buildContext(req),
  })),
);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
});

const port = 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
