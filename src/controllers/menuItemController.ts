import { Request, Response } from 'express';
import MenuItem from '../models/menuItemModel';
import Restaurant from '../models/restaurantModel';
import { Op } from 'sequelize';

// Get all menu items
const getAllMenuItems = async (req: Request, res: Response) => {
    try {
        const menuItems = await MenuItem.findAll({
            include: [{ model: Restaurant, as: 'restaurant' }]
        });
        res.json(menuItems);
    } catch (error) {
        console.error('Error fetching all menu items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get menu items by restaurant ID
const getMenuItemsByRestaurantId = async (req: Request, res: Response) => {
    try {
        const restaurant_id = parseInt(req.params.restaurant_id, 10);

        if (isNaN(restaurant_id)) {
            return res.status(400).json({ error: 'Invalid restaurant ID' });
        }

        const menuItems = await MenuItem.findAll({
            where: { restaurant_id },
            include: [{ model: Restaurant, as: 'restaurant' }]
        });

        if (menuItems.length > 0) {
            res.json(menuItems);
        } else {
            res.status(404).json({ error: 'No menu items found for this restaurant' });
        }
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get restaurant by menu item ID
const getRestaurantByMenuItemId = async (req: Request, res: Response) => {
    try {
        const menuItemId = parseInt(req.params.menuItemId, 10);

        if (isNaN(menuItemId)) {
            return res.status(400).json({ error: 'Invalid menu item ID' });
        }

        const menuItem = await MenuItem.findByPk(menuItemId, {
            include: [{ model: Restaurant, as: 'restaurant' }]
        });

        if (menuItem && menuItem.restaurant) {
            res.json(menuItem.restaurant);
        } else {
            res.status(404).json({ error: 'Restaurant not found for this menu item' });
        }
    } catch (error) {
        console.error('Error fetching restaurant:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Create a new menu item
const createMenuItem = async (req: Request, res: Response) => {
    try {
        const { name, price, image, restaurant_id } = req.body;

        if (!name || !price || !image || !restaurant_id) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        await MenuItem.create({ name, price, image, restaurant_id });
        res.status(201).json({ message: 'Menu item created successfully' });
    } catch (error) {
        console.error('Error creating menu item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update an existing menu item
const updateMenuItem = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { name, price, image, restaurant_id } = req.body;

        const [updated] = await MenuItem.update({ name, price, image, restaurant_id }, {
            where: { id }
        });

        if (updated) {
            res.json({ message: 'Menu item updated successfully' });
        } else {
            res.status(404).json({ error: 'Menu item not found' });
        }
    } catch (error) {
        console.error('Error updating menu item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete a menu item
const deleteMenuItem = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const deleted = await MenuItem.destroy({ where: { id } });

        if (deleted) {
            res.json({ message: 'Menu item deleted successfully' });
        } else {
            res.status(404).json({ error: 'Menu item not found' });
        }
    } catch (error) {
        console.error('Error deleting menu item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Search restaurants by menu item name
const searchRestaurantsByMenuItemName = async (req: Request, res: Response) => {
    const menuItemName = req.query.menuItemName as string;

    try {
        const menuItems = await MenuItem.findAll({
            where: {
                name: {
                    [Op.like]: `%${menuItemName}%`
                }
            },
            include: [{ model: Restaurant, as: 'restaurant' }]
        });

        const restaurants = menuItems.map(item => item.restaurant).filter(restaurant => restaurant !== null);
        res.status(200).json(restaurants);
    } catch (error) {
        console.error('Error searching restaurants by menu item name:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default {
    getAllMenuItems,
    getMenuItemsByRestaurantId,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    searchRestaurantsByMenuItemName,
    getRestaurantByMenuItemId,
};
