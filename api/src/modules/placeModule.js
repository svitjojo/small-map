import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db.js";

export const Place = sequelize.define('Place', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'places',
  createdAt: false,
  updatedAt: false,
});
