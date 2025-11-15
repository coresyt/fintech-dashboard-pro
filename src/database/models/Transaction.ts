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

export class Transaction extends Model<TransactionAttributes, Optional<TransactionAttributes, 'id'>> implements TransactionAttributes {
  public id!: string
  public type!: keyof typeof TransactionType
  public symbol!: string
  public quantity!: number
  public price!: number
  public userId!: string
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