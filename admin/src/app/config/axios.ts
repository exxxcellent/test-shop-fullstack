import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
});

api.interceptors.request.use((config) => {
    if (!config.headers) return config;

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return config;

    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});

export default api;
