import { Request, Response } from 'express';
import Restaurant from '../models/restaurantModel';

const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getRestaurantById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const restaurant = await Restaurant.findByPk(id);
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ error: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createRestaurant = async (req: Request, res: Response) => {
  try {
    const { name, image, description } = req.body;
    await Restaurant.create({ name, image, description });
    res.status(201).json({ message: 'Restaurant created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { name, image, description } = req.body;
    const [updated] = await Restaurant.update({ name, image, description }, {
      where: { id }
    });
    if (updated) {
      res.json({ message: 'Restaurant updated successfully' });
    } else {
      res.status(404).json({ error: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteRestaurant = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await Restaurant.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: 'Restaurant deleted successfully' });
    } else {
      res.status(404).json({ error: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
