const multer = require("multer");
const path = require("path");
const { fileURLToPath } = require("url");
const { connect } = require("mongoose");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join( __dirname + "/public"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});



async function connectMongo() {
  try {
    await connect(
      "mongodb+srv://joacolaprovitera:nDKDmuv3K3y9DCwX@backend-coder.uwjcypw.mongodb.net/ecommerce?retryWrites=true&w=majority"
    );
    console.log("plug to mongo!");
  } catch (error) {
    console.log(error.message);
    throw "can not connect to the db";
  }
};

module.exports = { connectMongo: connectMongo };
module.exports.uploader = multer({ storage });

// Porque al agregar estas exportaciones se rompe el codigo?

// module.exports.__filename = fileURLToPath(require.main.filename);
// module.exports.__dirname = path.dirname(module.exports.__filename);