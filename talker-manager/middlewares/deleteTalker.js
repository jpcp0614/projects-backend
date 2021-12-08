const { readContentFile, editContentFile } = require('../helpers/readWriteFile');

const PATH_FILE = './talker.json';

const deleteTalker = async (req, res, _next) => {
  const { id } = req.params;

  const data = await readContentFile(PATH_FILE, 'utf8');
  
  const index = data.findIndex((obj) => obj.id === Number(id));
  
  data.splice(index, 1);

  await editContentFile(PATH_FILE, data);

  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;