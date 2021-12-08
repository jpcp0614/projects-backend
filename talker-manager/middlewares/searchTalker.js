const { readContentFile } = require('../helpers/readWriteFile');

const PATH_FILE = './talker.json';

const searchTalker = async (req, res, _next) => {
  const { q } = req.query;
  const data = await readContentFile(PATH_FILE, 'utf8');

  const result = data.filter((talk) => talk.name.includes(q));

  res.status(200).send(result);
};

module.exports = searchTalker;