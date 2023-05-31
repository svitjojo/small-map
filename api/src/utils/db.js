import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('postgres', 'postgres', 'Z?aTa3dTm#@DYNz', {
  host: 'localhost',
  dialect: 'postgres',
});
