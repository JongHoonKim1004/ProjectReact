import { jwtDecode } from 'jwt-decode';

export const getUserInfo = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }
  return null;
};