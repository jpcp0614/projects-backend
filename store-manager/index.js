const express = require('express');
const bodyParser = require('body-parser');

const router = require('./routes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(bodyParser.json());
app.use(router);
app.use(errorMiddleware);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
