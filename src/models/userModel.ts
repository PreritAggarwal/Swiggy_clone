// models/userModel.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public reset_token?: string;
  public reset_token_expiry?: Date;
}

User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reset_token: {
    type: DataTypes.STRING,
    allowNull: true
  },
  reset_token_expiry: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: false 
});

export default User;
