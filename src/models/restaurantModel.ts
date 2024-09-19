import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';




interface RestaurantAttributes {
  id?: number;
  name: string;
  image: string;
  description: string;
}

class Restaurant extends Model<RestaurantAttributes> implements RestaurantAttributes {
  public id!: number;
  public name!: string;
  public image!: string;
  public description!: string;

 
}


Restaurant.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'restaurants',
  timestamps: false,
});



// Define the one-to-many relationship
// Restaurant.hasMany(MenuItem, { foreignKey: 'restaurant_id', as: 'menu-items' });

export default Restaurant;