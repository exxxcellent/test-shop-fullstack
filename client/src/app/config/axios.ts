import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
});

api.interceptors.request.use((config) => {
    if (!config.headers) return config;

    const authStorage = localStorage.getItem('auth-storage');
    if (!authStorage) return config;

    const state = JSON.parse(authStorage);
    config.headers.Authorization = `Bearer ${state.state.accessToken}`;
    return config;
});

export default api;
