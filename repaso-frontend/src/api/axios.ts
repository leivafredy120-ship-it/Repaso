import axios from 'axios';

// La URL base se toma de la variable de entorno VITE_API_URL (.env)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
