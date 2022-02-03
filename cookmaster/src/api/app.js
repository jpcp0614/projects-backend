const express = require('express');

const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const routers = require('../routers');
const middlewares = require('../middlewares');

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use(routers);
app.use(middlewares.error);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
