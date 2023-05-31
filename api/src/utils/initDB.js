import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const { URI } = process.env;

export const sequelize = new Sequelize(URI, {
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
    },
  },
});
