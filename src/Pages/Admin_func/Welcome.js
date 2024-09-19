import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Header from '../../Component/Header';
import Footer from '../../Component/Footer';
import { getRestaurantsForAdmin } from '../../Services/api';

function Welcome() {
  const location = useLocation();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get adminId from location state
  const adminId = location.state?.adminId;

  useEffect(() => {
    console.log("Admin ID passed to Welcome component:", adminId);

    if (!adminId) {
      setLoading(false);
      setError('Admin ID is not provided.');
      return;
    }

    const fetchRestaurant = async () => {
      try {
        console.log(`Fetching restaurant for adminId: ${adminId}`);
        const response = await getRestaurantsForAdmin(adminId);
        console.log('Response data:', response);
        
        if (response.data) {
          setRestaurant(response.data);
          setError(null);
        } else {
          setRestaurant(null);
          setError('No restaurant found for this admin.');
        }
      } catch (err) {
        console.error('Error fetching restaurant:', err);
        setRestaurant(null);
        setError('Failed to load restaurant. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [adminId]);

  useEffect(() => {
    if (restaurant && restaurant.id) {
      navigate(`/edit-restaurant`, { state: { restaurantId: restaurant.id } });
    }
  }, [restaurant, navigate]);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {loading ? (
          <p className="text-lg text-gray-700">Loading...</p>
        ) : error ? (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Welcome, Admin!</h1>
            <p className="mb-6 text-lg">{error}</p>
            <Link to="/add-restaurant" className="px-6 py-3 bg-orange-600 text-white font-semibold rounded shadow-lg hover:bg-orange-700">
              Add Restaurant
            </Link>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Welcome, Admin!</h1>
            <p className="mb-6 text-lg">Redirecting to your restaurant details...</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Welcome;
