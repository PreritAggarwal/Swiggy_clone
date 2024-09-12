import { Request, Response } from 'express';
import CarouselModel from '../models/CarouselModel';

const getAllMenuItems = async (req: Request, res: Response) => {
    try {
        const menuItems = await CarouselModel.getAllMenuItems();
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export default {
    getAllMenuItems,};