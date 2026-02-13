import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:8080', // Assuming standard Spring Boot port, will verify if needed
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to add the auth token to headers
http.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle common errors (like 401)
http.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Auto-logout if token is invalid/expired
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Optional: Redirect to login or specialized event
            // window.location.href = '/login'; 
        }
        return Promise.reject(error);
    }
);

export default http;
