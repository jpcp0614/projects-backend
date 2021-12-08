const { readContentFile, writeContentFile } = require('../helpers/readWriteFile');

const PATH_FILE = './talker.json';

const validName = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    }); 
  }
  
  next();
};

const validAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (Number(age) < 18) {
    return res.status(400).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    }); 
  }

  next();
};

const validTalk1 = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || !talk.watchedAt || talk.rate === undefined) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    }); 
  }

  next();
};

const validTalk2 = (req, res, next) => {
  const { talk: { watchedAt, rate } } = req.body;
  const validData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

  if (!validData.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  } if (Number(rate) < 1 || Number(rate) > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

const addTalker = async (req, res, _next) => {
  const { name, age, talk } = req.body;

  const data = await readContentFile(PATH_FILE);

  const newTalker = {
    name,
    age: Number(age),
    id: data.length + 1,
    talk,
  };

  await writeContentFile(PATH_FILE, newTalker);

  return res.status(201).json(newTalker);
};

module.exports = {
  validName,
  validAge,
  validTalk1,
  validTalk2,
  addTalker,
};
