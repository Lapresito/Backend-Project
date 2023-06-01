//----------------MULTER------------------------------
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage });

//----------------DIRNAME------------------------------
import path from 'path';
import { fileURLToPath } from 'url';
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);


//---------------MONGO---------------------------------
import { connect, Schema, model } from 'mongoose';
export async function connectMongo() {
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


