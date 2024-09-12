import express from 'express';
import carouselController from '../controllers/carouselController';

const router = express.Router();

router.get('/carousel/menu-items', carouselController.getAllMenuItems);
export default router;