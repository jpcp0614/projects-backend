const { readContentFile, editContentFile } = require('../helpers/readWriteFile');

const PATH_FILE = './talker.json';

const editTalker = async (req, res, _next) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const content = { name, age: Number(age), id: Number(id), talk };
  const data = await readContentFile(PATH_FILE, 'utf8');
  
  const index = data.findIndex((obj) => obj.id === Number(id));
  
  data.splice(index, 1, content);

  await editContentFile(PATH_FILE, data);
  
  return res.status(200).send(content);
};

module.exports = editTalker;
