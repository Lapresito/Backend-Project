const multer = require("multer");
const path = require("path");
const { fileURLToPath } = require("url");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join( __dirname + "/public"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

module.exports.uploader = multer({ storage });
module.exports.__filename = fileURLToPath(require.main.filename);
module.exports.__dirname = path.dirname(module.exports.__filename);