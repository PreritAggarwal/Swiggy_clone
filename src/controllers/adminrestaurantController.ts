import { Request, Response } from 'express';
import Restaurant from '../models/restaurantModel';
import Admin from '../models/adminModel';



// Get all restaurants for the logged-in admin
const getAllRestaurantsForAdmin = async (req: Request, res: Response) => {
  try {
    const adminId = parseInt(req.params.adminId, 10); // Convert to integer
    console.log(adminId,("check"));
    // Fetch the admin to get the restaurant_id
    const admin = await Admin.findByPk(adminId);

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const restaurantId = admin.restaurant_id; // Assuming restaurant_id is directly available
console.log(restaurantId, ("check 2"));
    // Fetch the restaurant associated with the restaurant_id
    const restaurant = await Restaurant.findByPk(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    res.json(restaurant);
  } catch (error) {
    console.error('Error fetching restaurant:', error); // Log the error
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new restaurant for the logged-in admin
const createRestaurantForAdmin = async (req: Request, res: Response) => {
  
  try {
    console.log('Request Body:', req.body);
    const adminId = parseInt(req.params.adminId, 10); // Convert to integer
    if (isNaN(adminId)) {
      return res.status(400).json({ error: 'Invalid adminId' });
    }

    const admin = await Admin.findByPk(adminId);

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const { name, description } = req.body;
    console
    const image = req.body.image || ''; // Assuming image is a URL

    // Ensure required fields are provided
    if (!name || !description) {
      console.log(name,description,"final check ");
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new restaurant
    const newrestaurant= await Restaurant.create({
      name,
      image,
      description,
    });
    console.log(newrestaurant.id,"id check");
    await admin.update({ restaurant_id: newrestaurant.id });

    res.status(200).json({ message: 'Restaurant created successfully' , restaurantId: newrestaurant.id });
  } catch (error) {
    console.error('Error creating restaurant:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Update an existing restaurant for the logged-in admin
const updateRestaurantForAdmin = async (req: Request, res: Response) => {
  try {
    const adminId = parseInt(req.params.adminId, 10);
    const admin = await Admin.findByPk(adminId);

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const id = parseInt(req.params.id, 10);
    const { name, image, description } = req.body;
    const [updated] = await Restaurant.update({ name, image, description }, {
      where: {
        id: id,
        /* Remove restaurant_id if not part of the Restaurant model */
      }
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

// Delete a restaurant for the logged-in admin
const deleteRestaurantForAdmin = async (req: Request, res: Response) => {
  try {
    const adminId = parseInt(req.params.adminId, 10);
    const admin = await Admin.findByPk(adminId);

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const id = parseInt(req.params.id, 10);
    const deleted = await Restaurant.destroy({
      where: {
        id: id,
        /* Remove restaurant_id if not part of the Restaurant model */
      }
    });

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
  getAllRestaurantsForAdmin,
  createRestaurantForAdmin,
  updateRestaurantForAdmin,
  deleteRestaurantForAdmin
};
