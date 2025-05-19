
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js'

export const Superhero = sequelize.define("Superhero", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  realName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  originDescription: {
    type: DataTypes.STRING,
    allowNull: false
  },
  superpowers: {
    type: DataTypes.STRING,
    allowNull: false
  },
  catchPhrase: {
    type: DataTypes.STRING,
    allowNull: false
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  }
}, {
  tableName: 'superheroes',
  createdAt: false,
  updatedAt: false,
});