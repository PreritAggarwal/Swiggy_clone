import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import menuItemRoutes from './routes/menuItemRoutes';
import restaurantRoutes from './routes/restaurantRoutes';
import carouselRoutes from'./routes/carouselRoutes';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000' ,
}));




// Middleware
app.use(express.json());  // Parse JSON request bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', restaurantRoutes);
app.use('/api', menuItemRoutes);
// app.use('/api', carouselRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});