import express from 'express';
import menuItemController from '../controllers/menuItemController';

const router = express.Router();

router.get('/menu-items', menuItemController.getAllMenuItems);
router.get('/menu-items/:restaurant_id', menuItemController.getMenuItemsByRestaurantId);
router.post('/menu-items', menuItemController.createMenuItem);
router.put('/menu-items/:id', menuItemController.updateMenuItem);
router.delete('/menu-items/:id', menuItemController.deleteMenuItem);
router.get('/carousel/menu-item/:menuItemId', menuItemController.getRestaurantByMenuItemId);
router.get('/searchbar/search-restaurants', menuItemController.searchRestaurantsByMenuItemName);


export default router;
