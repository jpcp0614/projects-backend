const multer = require('multer');
// const fs = require('fs');

// const fileExists = (fileName) => {
//   const files = fs.readdirSync(`${__dirname}/../uploads`);

//   return files.some((file) => file === fileName);
// };

// const fileFilter = async (req, file, cb) => {
//   if (file.mimetype !== 'image/jpeg') {
//     req.fileValidationError = true;

//     return cb(null, false);
//   }
//   if (fileExists(file.filename)) {
//     req.fileDuplicated = true;

//     return cb(null, false);
//   }

//   cb(null, true);
// };

const storage = multer.diskStorage({
  destination: (req, file, callback) =>
    callback(null, `${__dirname}/../uploads`),
  filename: (req, file, callback) => callback(null, `${req.params.id}.jpeg`),
});

const upload = multer({ storage });

module.exports = upload.single('image');
