import { createContext, useEffect, useState } from "react";
import { deleteData, loginUser, registerUser, verifyPin, setAuthToken } from "../service/API";
import { deleteItem, getItem, setItem } from "./LocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [userDetails, setUserDetails] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);


    // initial user and token loading
    useEffect(() => {
        const loadAuthData = async () => {
            const savedUser = await getItem('userDetails');
            const savedToken = await getItem('token');
            if (savedUser) setUserDetails(savedUser);
            if (savedToken) {
                setToken(savedToken);
                setAuthToken(savedToken);
            }
        };
        loadAuthData().finally(() => setLoading(false));
    }, []);

    // JWT Token expiration check
    useEffect(() => {
        let interval;
        if (token) {
            interval = setInterval(() => {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const currentTime = Math.floor(Date.now() / 1000);
                if (payload.exp - 60 < currentTime) {
                    logout();
                }
            }, 60000); // check every minute
        }
        return () => clearInterval(interval);
    }, [token]);

    const saveAuth = async ({ user, token }) => {
        if (user) {
            setUserDetails(user);
            await setItem('userDetails', user);
        }
        if (token) {
            setToken(token);
            await setItem('token', token);
            setAuthToken(token);
        }
    };

    // Login
    const login = async (data) => {
        const response = await loginUser(data);
        saveAuth(response);
    }

    // Register
    const register = async (data) => {
        const response = await registerUser(data);
        saveAuth(response);
    }

    // enter pin
    const isValidPin = async (pin) => {
        const response = await verifyPin({ username: userDetails?.username, pin });
        return response.valid;
    }

    // Logout
    const logout = async () => {
        setUserDetails(null);
        setToken(null);
        setAuthToken(null);
        await deleteItem('userDetails');
        await deleteItem('token');
    };

    // Delete Account
    const deleteAccount = async () => {
        try {
            console.log("Deleting account for user ID:", userDetails.id);
            await deleteData("user", userDetails.id);
            setUserDetails(null);
            setToken(null);
            setAuthToken(null);
            await deleteItem('userDetails');
            await deleteItem('token');
        } catch (err) {
            throw err;
        }
    }

    return (
        <AuthContext.Provider
            value={{
                userDetails,
                userId: userDetails?.id,
                username: userDetails?.username,
                name: userDetails?.name,
                token,
                saveAuth,
                loading,
                login,
                register,
                isValidPin,
                logout,
                deleteAccount,
            }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;