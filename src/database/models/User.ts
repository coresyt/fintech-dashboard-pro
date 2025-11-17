import { DataTypes, Sequelize, Model, Optional } from 'sequelize'

interface UserAttributes {
  id: string
  age: number
  email: string
  password: string
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>

export class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: string
  declare email: string
  declare password: string
  declare age: number
  declare createdAt: Date
  declare updatedAt: Date
}

export const defineUserModel = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        },
        unique: true
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 18,
          max: 120
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'users',
      sequelize,
      timestamps: true
    }
  )
  return User
}
