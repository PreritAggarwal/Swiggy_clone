// src/controllers/menuItemController.ts
import { Request, Response } from 'express';
import MenuItem from '../models/menuItemModel';
import Restaurant from '../models/restaurantModel';

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



export default {
    getAllMenuItems,
};
