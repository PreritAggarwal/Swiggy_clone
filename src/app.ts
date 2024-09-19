import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import menuItemRoutes from './routes/menuItemRoutes';
import restaurantRoutes from './routes/restaurantRoutes';
import carouselRoutes from'./routes/carouselRoutes';
import adminRoutes from './routes/adminRoutes'
import cors from 'cors';
import sequelize from './config/db'; // Adjust the path if necessary
import payment from './routes/payment'; 

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000' ,
}));

// const syncModels = async () => {
//   try {
//     await sequelize.sync({ force: true }); // Reset schema for testing
//     console.log('Database synced');
//   } catch (error) {
//     console.error('Error syncing database:', error);
//   }
// };

// syncModels();

// Middleware
app.use(express.json());  // Parse JSON request bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', restaurantRoutes);
app.use('/api', menuItemRoutes);
app.use('/api', carouselRoutes);
app.use('/api/admin', adminRoutes);
app.use("/payment", payment);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});