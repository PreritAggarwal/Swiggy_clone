import  db from '../config/db';

interface MenuItem {
  id?: number;
  image: string;
  restaurantId: number;
}

const getAllMenuItems = async (): Promise<MenuItem[]> => {
    const [rows] = await db.query('SELECT * FROM menu_items');
    return rows as MenuItem[];
};

export default {
    getAllMenuItems,};