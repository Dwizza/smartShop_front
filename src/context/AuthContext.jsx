import { createContext, useContext, useState, useEffect } from 'react';
import http from '../api/http';
import endpoints from '../api/endpoints';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check for existing token/user on mount
    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user'); // Basic user info

            if (token) {
                // Optionally verify token with /me endpoint if available/reliable
                // For now, we restore from storage to be fast
                if (storedUser) {
                    try {
                        setUser(JSON.parse(storedUser));
                    } catch (e) {
                        console.error("Failed to parse stored user", e);
                        localStorage.removeItem('user');
                    }
                }

                // Let's verify with backend
                try {
                    const { data } = await http.get(endpoints.clients.me);
                    setUser(data);
                    localStorage.setItem('user', JSON.stringify(data));
                } catch (err) {
                    console.error("Session verification failed", err);
                    // If 401, http interceptor handles it, but we should clear local state
                    if (err.response?.status === 401) {
                        logout();
                    }
                }
            }
            setLoading(false);
        };

        checkUser();
    }, []);

    const login = async (username, password) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await http.post(endpoints.auth.login, { username, password });
            // Assuming response structure: { token: '...', user: {...} } or similar
            // Adjust based on actual backend response.
            // If backend only returns token, we might need to fetch user separately.

            // Let's assume standard { accessToken: '...', ... } or similar
            const token = data.token || data.accessToken || data.jwt;

            if (token) {
                localStorage.setItem('token', token);

                // Fetch full user details immediately after login
                const userResp = await http.get(endpoints.clients.me);
                setUser(userResp.data);
                localStorage.setItem('user', JSON.stringify(userResp.data));
                return true;
            } else {
                throw new Error("No token received");
            }
        } catch (err) {
            console.error("Login failed", err);
            setError(err.response?.data?.message || "Login failed");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            await http.post(endpoints.clients.create, userData);
            // Automatically login after register? Or redirect?
            // Let's assume redirect to login is better flow for "simple"
            return true;
        } catch (err) {
            console.error("Registration failed", err);
            setError(err.response?.data?.message || "Registration failed");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        // Call backend logout if needed (optional usually for JWT)
        http.post(endpoints.auth.logout).catch(e => console.warn(e));
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
