import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import useApi from '../../Component/Hooks/Use_api';
import Header from '../../Component/Header';
import Footer from '../../Component/Footer'

const API_URL = 'http://localhost:5000/api';

function EditRestaurant() {
  const { callApi, loading, error } = useApi();
  const [restaurant, setRestaurant] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedRestaurant, setUpdatedRestaurant] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [updatedMenuItems, setUpdatedMenuItems] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState({ name: '', price: '', image: '' }); // New menu item state

  const location = useLocation();
  const restaurantId = location.state?.restaurantId; // Extract restaurantId from location.state

  // Fetch restaurant details and menu items
  useEffect(() => {
    const fetchRestaurantAndMenuItems = async () => {
      try {
        // Fetch restaurant details
        const restaurantData = await callApi(`${API_URL}/restaurants/${restaurantId}`);
        setRestaurant(restaurantData);
        setUpdatedRestaurant(restaurantData);

        // Fetch menu items
        const menuItemsData = await callApi(`${API_URL}/menu-items/${restaurantId}`);
        setMenuItems(menuItemsData);
        setUpdatedMenuItems(menuItemsData);
      } catch (error) {
        console.error('Error fetching restaurant or menu items:', error);
      }
    };
console.log(restaurantId,"id");
    if (restaurantId) {
      fetchRestaurantAndMenuItems();
    } else {
      console.error('Restaurant ID not provided');
    }
  }, [restaurantId, callApi]); // Add callApi to the dependency array

  // Handle restaurant input changes
  const handleRestaurantInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRestaurant((prev) => ({ ...prev, [name]: value }));
  };

  // Handle menu item input changes
  const handleMenuItemInputChange = (index, e) => {
    const { name, value } = e.target;
    if (updatedMenuItems[index]) { // Check if the item exists
      const updatedItems = [...updatedMenuItems];
      updatedItems[index] = { ...updatedItems[index], [name]: value };
      setUpdatedMenuItems(updatedItems);
    }
  };
  

  // Handle new menu item input changes
  const handleNewMenuItemChange = (e) => {
    const { name, value } = e.target;
    setNewMenuItem((prev) => ({ ...prev, [name]: value }));
  };

  // Save both restaurant and menu items
  const handleSaveAll = async () => {
    try {
      // Update restaurant details
      await callApi(`${API_URL}/restaurants/${restaurantId}`, 'PUT', updatedRestaurant);

      // Update all menu items
      await Promise.all(
        updatedMenuItems.map((menuItem) =>
          callApi(`${API_URL}/menu-items/${menuItem.id}`, 'PUT', menuItem)
        )
      );

      setEditMode(false);
      alert('Restaurant and menu items updated successfully');
    } catch (error) {
      console.error('Error updating restaurant or menu items:', error);
    }
  };

  // Add new menu item
  const handleAddMenuItem = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newMenuItem.name);
      formData.append('price', newMenuItem.price);
      formData.append('image', newMenuItem.image);
      formData.append('restaurant_id', restaurantId);

      await callApi(`${API_URL}/menu-items`, 'POST', formData);
      setNewMenuItem({ name: '', price: '', image: '' }); // Clear input fields
      setMenuItems([...menuItems, newMenuItem]); // Update menu items list
    } catch (error) {
      console.error('Error adding new menu item:', error);
    }
  };

  return (
    <>
  
    <Header/>
    <div className="container mt-16 mx-auto px-4 py-6">
      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Restaurant and Menu Items Table */}
      {restaurant && (
        <>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <h2 className="text-xl font-bold px-6 py-4 bg-gray-50">Restaurant Details </h2>
            <table className="min-w-full divide-y  divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image URL</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editMode ? (
                      <input
                        type="text"
                        name="name"
                        value={updatedRestaurant.name}
                        onChange={handleRestaurantInputChange}
                        className="border border-gray-300 rounded-md p-1"
                      />
                    ) : (
                      restaurant.name
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editMode ? (
                      <input
                        type="text"
                        name="description"
                        value={updatedRestaurant.description}
                        onChange={handleRestaurantInputChange}
                        className="border border-gray-300 rounded-md p-1"
                      />
                    ) : (
                      restaurant.description
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editMode ? (
                      <input
                        type="text"
                        name="image"
                        value={updatedRestaurant.image}
                        onChange={handleRestaurantInputChange}
                        className="border border-gray-300 rounded-md p-1"
                      />
                    ) : (
                      <img src={restaurant.image} alt={restaurant.name} className="w-24 h-16 object-cover rounded" />
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Menu Items */}
          <div className="bg-white shadow-md rounded-lg mt-6 overflow-hidden">
            <h2 className="text-xl font-bold px-6 py-4 bg-gray-50">Menu Items</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image URL</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {menuItems.map((menuItem, index) => (
                  <tr key={menuItem.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editMode ? (
                        <input
                          type="text"
                          name="name"
                          value={updatedMenuItems[index].name}
                          onChange={(e) => handleMenuItemInputChange(index, e)}
                          className="border border-gray-300 rounded-md p-1"
                        />
                      ) : (
                        menuItem.name
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editMode ? (
                        <input
                          type="text"
                          name="price"
                          value={updatedMenuItems[index].price}
                          onChange={(e) => handleMenuItemInputChange(index, e)}
                          className="border border-gray-300 rounded-md p-1"
                        />
                      ) : (
                        menuItem.price
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editMode ? (
                        <input
                          type="text"
                          name="image"
                          value={updatedMenuItems[index].image}
                          onChange={(e) => handleMenuItemInputChange(index, e)}
                          className="border border-gray-300 rounded-md p-1"
                        />
                      ) : (
                        <img src={menuItem.image} alt={menuItem.name} className="w-24 h-16 object-cover rounded" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add New Menu Item Form */}
          {editMode && (
            <div className="bg-white shadow-md rounded-lg mt-6 p-6">
              <h2 className="text-xl font-bold mb-4">Add New Menu Item</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={newMenuItem.name}
                  onChange={handleNewMenuItemChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
                <input
                  type="text"
                  name="price"
                  placeholder="Price"
                  value={newMenuItem.price}
                  onChange={handleNewMenuItemChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
                <input
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  value={newMenuItem.image}
                  onChange={handleNewMenuItemChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
                <button
                  onClick={handleAddMenuItem}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Add Menu Item
                </button>
              </div>
            </div>
          )}

          {/* Edit/Save Button */}
          <div className="flex justify-center mt-8">
            {editMode ? (
              <button
                onClick={handleSaveAll}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Edit
              </button>
            )}
          </div>
        </>
      )}
    </div>
    <Footer/>
  </>
);

  
}

export default EditRestaurant;
