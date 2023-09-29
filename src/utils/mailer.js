import nodemailer from 'nodemailer';
import { __dirname } from './dirname.js';

const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.GOOGLE_PASSWORD,
    },
  });


export default transport;