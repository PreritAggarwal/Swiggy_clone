import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import Role from './roleModel'; // Import the Role model

class Admin extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public reset_token?: string;
  public reset_token_expiry?: Date;
  public restaurant_id?: number;
  public role_id!: number; // Foreign key for roles
}

Admin.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reset_token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  reset_token_expiry: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: true,
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Role,
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Admin',
  tableName: 'admin',
  timestamps: false, // Change this to true if you want createdAt and updatedAt
});

// Define associations
Admin.belongsTo(Role, { as: 'role', foreignKey: 'role_id' }); // Alias 'role' defined here
Role.hasMany(Admin, { foreignKey: 'role_id' });
export default Admin;
