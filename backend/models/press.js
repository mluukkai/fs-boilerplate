import { DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'

const Press = sequelize.define('press', {
  date: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  timestamps: false
})

export default Press
