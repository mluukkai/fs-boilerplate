import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE_STORAGE || 'presses.db',
  logging: false
})
