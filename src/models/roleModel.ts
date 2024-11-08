import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';

class Role extends Model {
  public id!: number;
  public role_name!: string;
  public createdAt!: Date; // Define the type for createdAt
  public updatedAt!: Date; // Define the type for updatedAt
}

Role.init({
  role_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize,
  modelName: 'Role',
  tableName: 'roles',
  timestamps: false, // Automatically manage createdAt and updatedAt
});

export default Role;
