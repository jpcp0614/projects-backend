const { readContentFile } = require('../helpers/readWriteFile');

const PATH_FILE = './talker.json';

const getTalkerById = async (req, res) => {
  const { id } = req.params;
  const data = await readContentFile(PATH_FILE);

  const result = data.find((talker) => talker.id === Number(id));

  if (!result) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  return res.status(200).json(result);
};

module.exports = getTalkerById;
