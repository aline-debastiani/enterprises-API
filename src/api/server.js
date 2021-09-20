require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const router = require('../routes');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

app.use('/', router);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(port);
console.log(`Api rodando na porta ${port}`);
