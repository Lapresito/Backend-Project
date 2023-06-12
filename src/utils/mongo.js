import { connect } from 'mongoose';
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
