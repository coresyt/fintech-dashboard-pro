import { DataTypes, Sequelize, Model, Optional } from 'sequelize'
import { User } from './User.js'

const TransactionType = {
  BUY: 'BUY',
  SELL: 'SELL',
} as const

interface TransactionAttributes {
  id: string
  type: keyof typeof TransactionType
  symbol: string
  quantity: number
  price: number
  userId: string
}

type TransactionCreationAttributes = Optional<TransactionAttributes, 'id'>

export class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> {
  declare id: string
  declare type: keyof typeof TransactionType
  declare symbol: string
  declare quantity: number
  declare price: number
  declare userId: string
}

export const defineTransactionModel = (sequelize: Sequelize) => {
  Transaction.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      type: {
        type: DataTypes.ENUM(...Object.values(TransactionType)),
        allowNull: false,
      },
      symbol: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: User,
          key: 'id',
        },
      },
    },
    {
      tableName: 'transactions',
      sequelize,
      timestamps: true,
    }
  )
  return Transaction
}