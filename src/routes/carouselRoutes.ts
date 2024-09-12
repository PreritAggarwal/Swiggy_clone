import express from 'express';
import menuItemController from '../controllers/menuItemController';

const router = express.Router();

router.get('/carousel/menu-items', menuItemController.getAllMenuItems);
export default router;