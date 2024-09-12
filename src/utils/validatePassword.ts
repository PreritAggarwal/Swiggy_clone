// utils/validatePassword.ts

export const validatePassword = (password: string): boolean => {
    // Define password complexity requirements
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumeric = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    // Check if password meets requirements
    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumeric &&
      hasSpecialChar
    );
  };
  