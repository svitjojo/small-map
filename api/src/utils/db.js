import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const database = process.env.DATABASE;
const user = process.env.USER_NAME;
const password = process.env.PASSWORD;

export const sequelize = new Sequelize(database, user, password, {
  host: 'localhost',
  dialect: 'postgres',
});
