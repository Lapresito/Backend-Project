import { connect } from 'mongoose';
import config from '../config/config.js';
import logger from './logger.js';
export async function connectMongo() {
  try {
    await connect(config.mongoDbUrl);
    logger.info("plug to mongo!");
  } catch (error) {
    logger.fatal('Something wrong happend with the db');
    throw "can not connect to the db";
  }
};
