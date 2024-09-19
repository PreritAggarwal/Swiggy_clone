// controllers/adminMenuItemController.ts
import { Request, Response } from 'express';
import MenuItem from '../models/menuItemModel';
import Admin from '../models/adminModel';

import Restaurant from '../models/restaurantModel';
import {Op} from 'sequelize';

// Get all menu items for the logged-in admin's restaurant
const getAllMenuItemsForAdmin = async (req: Request, res: Response) => {
  try {
    const adminId = parseInt(req.params.adminId);
    const admin = await Admin.findByPk(adminId);

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const menuItems = await MenuItem.findAll({
      where: { restaurant_id: admin.restaurant_id }
    });

    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new menu item for the logged-in admin's restaurant
const createMenuItemForAdmin = async (req: Request, res: Response) => {
  try {
    const adminId = parseInt(req.params.adminId);
    const admin = await Admin.findByPk(adminId);

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const { name, price, image } = req.body;
    await MenuItem.create({
      name,
      price,
      image,
      restaurant_id: admin.restaurant_id
    });
    res.status(201).json({ message: 'Menu item created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update an existing menu item for the logged-in admin's restaurant
const updateMenuItemForAdmin = async (req: Request, res: Response) => {
  try {
    const adminId = parseInt(req.params.adminId);
    const admin = await Admin.findByPk(adminId);

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const id = parseInt(req.params.id);
    const { name, price, image } = req.body;
    const [updated] = await MenuItem.update({ name, price, image }, {
      where: { id, restaurant_id: admin.restaurant_id }
    });

    if (updated) {
      res.json({ message: 'Menu item updated successfully' });
    } else {
      res.status(404).json({ error: 'Menu item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a menu item for the logged-in admin's restaurant
const deleteMenuItemForAdmin = async (req: Request, res: Response) => {
  try {
    const adminId = parseInt(req.params.adminId);
    const admin = await Admin.findByPk(adminId);

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const id = parseInt(req.params.id);
    const deleted = await MenuItem.destroy({
      where: { id, restaurant_id: admin.restaurant_id }
    });

    if (deleted) {
      res.json({ message: 'Menu item deleted successfully' });
    } else {
      res.status(404).json({ error: 'Menu item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Search restaurants by menu item name for the logged-in admin's restaurant
const searchRestaurantsByMenuItemNameForAdmin = async (req: Request, res: Response) => {
  try {
    const adminId = parseInt(req.params.adminId);
    const admin = await Admin.findByPk(adminId);

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const menuItemName = req.query.menuItemName as string;

    const menuItems = await MenuItem.findAll({
      where: {
        name: {
          [Op.like]: `%${menuItemName}%`
        },
        restaurant_id: admin.restaurant_id
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
  getAllMenuItemsForAdmin,
  createMenuItemForAdmin,
  updateMenuItemForAdmin,
  deleteMenuItemForAdmin,
  searchRestaurantsByMenuItemNameForAdmin
};
