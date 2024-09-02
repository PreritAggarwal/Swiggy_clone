const API_URL = 'http://localhost:8000/api/auth'; 

export const signup = async (name, email, password) => {
  try {
    console.log('Sending signup request:', { name, email, password }); // Log request data
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Signup failed:', errorData); // Log error response
      throw new Error(errorData.error || 'Signup failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Signup error:', error); // Log caught errors
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    console.log('Sending login request:', { email, password }); // Log request data
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Login failed:', errorData); // Log error response
      throw new Error(errorData.error || 'Login failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Login error:', error); // Log caught errors
    throw error;
  }
};
