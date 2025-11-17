import { DataTypes, Sequelize, Model, Optional } from 'sequelize'
import { User } from './User.js'

interface AssetAttributes {
  id: string
  symbol: string
  name: string
  quantity: number
  purchasePrice: number
  userId: string
}

type AssetCreationAttributes = Optional<AssetAttributes, 'id'>

export class Asset extends Model<AssetAttributes, AssetCreationAttributes> {
  declare id: string
  declare symbol: string
  declare name: string
  declare quantity: number
  declare purchasePrice: number
  declare userId: string
}

export const defineAssetModel = (sequelize: Sequelize) => {
  Asset.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      symbol: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      quantity: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      purchasePrice: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: User,
          key: 'id'
        }
      }
    },
    {
      tableName: 'assets',
      sequelize,
      timestamps: true
    }
  )
  return Asset
}