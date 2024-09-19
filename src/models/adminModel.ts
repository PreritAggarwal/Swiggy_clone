// models/adminModel.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';

class Admin extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public reset_token?: string;
  public reset_token_expiry?: Date;
  public restaurant_id!: number;
}

Admin.init({
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
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Admin',
  tableName: 'admin',
  timestamps: false
});

export default Admin;
