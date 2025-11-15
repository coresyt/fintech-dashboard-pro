import { Sequelize } from 'sequelize'
import { Env } from '../shared/config/env.js'
import path from 'node:path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DATABASE_PATH = path.join(__dirname, 'db', 'db.sqlite')
const logger = Env.ENV === 'dev' ? console.log : false

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: DATABASE_PATH,
  logging: logger
})

import { defineUserModel } from './models/User.js'
import { defineAssetModel } from './models/Asset.js'
import { defineTransactionModel } from './models/Transaction.js'

export const User = defineUserModel(sequelize)
export const Asset = defineAssetModel(sequelize)
export const Transaction = defineTransactionModel(sequelize)

User.hasMany(Asset, { foreignKey: 'userId', as: 'assets' })
Asset.belongsTo(User, { foreignKey: 'userId', as: 'user' })

User.hasMany(Transaction, { foreignKey: 'userId', as: 'transactions' })
Transaction.belongsTo(User, { foreignKey: 'userId', as: 'user' })

try {
  await sequelize.authenticate()
  console.log('\nConnection has been established successfully.\n')
} catch (error) {
  console.error('Unable to connect to the database:', error)
}
