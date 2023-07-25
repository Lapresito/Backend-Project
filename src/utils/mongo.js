import { connect } from 'mongoose';
import config from '../config/config.js';
export async function connectMongo() {
  try {
    await connect(config.mongoUrl);
    console.log("plug to mongo!");
  } catch (error) {
    console.log(error.message);
    throw "can not connect to the db";
  }
};
