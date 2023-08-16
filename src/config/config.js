import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command();

program.option('--mode <mode>', 'Work mode', 'DEVELOPMENT');
program.parse();

dotenv.config({
    path: program.opts().mode === 'DEVELOPMENT' ? './.env.development' : './.env.production'
})

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
    persistence: process.env.PERSISTENCE,
    mode: process.env.MODE
}