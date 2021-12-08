const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// importand0 rotas
const {
  talkerRouter,
  loginRouter,
} = require('./routers');

// Requisitos 1, 2, 4, 5, 6 e 7
app.use('/talker', talkerRouter);

// Requisito 3
app.use('/login', loginRouter);

// definindo rota da aplicação
app.listen(PORT, () => {
  console.log('Online');
});
