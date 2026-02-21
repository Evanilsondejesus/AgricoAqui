const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const extensao = path.extname(file.originalname);
    const nomeArquivo = Date.now() + extensao;
    cb(null, nomeArquivo);
  }
});

const upload = multer({ storage });

module.exports = upload;
