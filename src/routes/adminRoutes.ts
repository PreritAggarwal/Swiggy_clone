// routes/adminAuthRoutes.ts
import express  from 'express';
import { adminSignup, adminLogin, adminForgotPassword, adminResetPassword } from '../controllers/adminController';
import adminRestaurantController from '../controllers/adminrestaurantController';
import adminMenuItemController from '../controllers/adminmenuController';

const router = express.Router();

router.post('/signup', adminSignup);
router.post('/login', adminLogin);
router.post('/forgotpassword', adminForgotPassword);
router.post('/resetpassword', adminResetPassword);
// Admin Restaurant Routes
router.get('/admin/:adminId/restaurants', adminRestaurantController.getAllRestaurantsForAdmin);
router.post('/admin/:adminId/restaurants', adminRestaurantController.createRestaurantForAdmin);
router.put('/admin/:adminId/restaurants/:id', adminRestaurantController.updateRestaurantForAdmin);
router.delete('/admin/:adminId/restaurants/:id', adminRestaurantController.deleteRestaurantForAdmin);

// Admin Menu Item Routes
router.get('/admin/:adminId/menu-items', adminMenuItemController.getAllMenuItemsForAdmin);
router.post('/admin/:adminId/menu-items', adminMenuItemController.createMenuItemForAdmin);
router.put('/admin/:adminId/menu-items/:id', adminMenuItemController.updateMenuItemForAdmin);
router.delete('/admin/:adminId/menu-items/:id', adminMenuItemController.deleteMenuItemForAdmin);

export default router;


