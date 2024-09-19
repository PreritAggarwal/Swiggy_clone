import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRestaurantForAdmin } from '../../Services/api';  // Import your API service

function AddRestaurant() {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [adminId, setAdminId] = useState(null); // Use a state to store adminId
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve adminId from local storage when the component mounts
    const storedAdminId = localStorage.getItem('adminId');
    if (storedAdminId) {
      setAdminId(Number(storedAdminId));
    } else {
      console.error('Admin ID not found in local storage');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Admin ID:', adminId); // Add this line to check adminId

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', imageUrl); // Assuming imageUrl is a string (URL)

    try {
      if (isNaN(adminId)) {
        throw new Error('Invalid adminId');
      }
      const response = await createRestaurantForAdmin(adminId, formData);
      const { restaurantId } = response;
      console.log(response,"id response");
      navigate(`/edit-restaurant`,{ state: { restaurantId } });
    } catch (error) {
      console.error('Error creating restaurant:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Add Restaurant</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Restaurant Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />

          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />

          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />

          <button
            type="submit"
            className="w-full py-2 px-4 bg-orange-600 text-white font-semibold rounded-md shadow-md hover:bg-orange-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddRestaurant;
