import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin'; // Replace with your backend URL


// Restaurant API
export const getRestaurantsForAdmin = (adminId) => axios.get(`${API_URL}/admin/${adminId}/restaurants`);
export const createRestaurantForAdmin = async (adminId, data) => {
    try {
      const response = await axios.post(`${API_URL}/admin/${adminId}/restaurants`, data, {
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating restaurant:', error);
      throw error;
    }
  };
export const updateRestaurantForAdmin = (adminId, restaurantId, data) => axios.put(`${API_URL}/admin/${adminId}/restaurants/${restaurantId}`, data);
export const deleteRestaurantForAdmin = (adminId, restaurantId) => axios.delete(`${API_URL}/admin/${adminId}/restaurants/${restaurantId}`);

// Menu Item API
export const getMenuItemsForAdmin = (adminId) => axios.get(`${API_URL}/admin/${adminId}/menu-items`);
export const createMenuItemForAdmin = (adminId, data) => axios.post(`${API_URL}/admin/${adminId}/menu-items`, data);
export const updateMenuItemForAdmin = (adminId, menuItemId, data) => axios.put(`${API_URL}/admin/${adminId}/menu-items/${menuItemId}`, data);
export const deleteMenuItemForAdmin = (adminId, menuItemId) => axios.delete(`${API_URL}/admin/${adminId}/menu-items/${menuItemId}`);
