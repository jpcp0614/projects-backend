const { readContentFile } = require('../helpers/readWriteFile');

const PATH_FILE = './talker.json';

const getAllTalkers = async (_req, res) => {
  const data = await readContentFile(PATH_FILE) || [];

  return res.status(200).json(data);
};

module.exports = getAllTalkers;