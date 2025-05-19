import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('postgres', 'postgres', '123456789', {
  host: 'localhost',
  dialect: 'postgres',
})