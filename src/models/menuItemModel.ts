import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import Restaurant from './restaurantModel';

interface MenuItemAttributes {
    id?: number;
    name: string;
    price: number;
    image: string;
    restaurant_id: any;
}

class MenuItem extends Model<MenuItemAttributes> implements MenuItemAttributes {
    public id!: number;
    public name!: string;
    public price!: number;
    public image!: string;
    public restaurant_id!: number;

    // Add associations
    public restaurant?: Restaurant;
}

MenuItem.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    restaurant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'menu_items',
    timestamps: false,
});

// Define the many-to-one relationship
MenuItem.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });

export default MenuItem;