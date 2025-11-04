import { createContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../service/API";
import { deleteItem, getItem, setItem } from "./LocalStorage";
import { setAuthToken } from '../service/API';

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
    // useEffect(() => {

    // })

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

    // Logout
    const logout = async () => {
        setUserDetails(null);
        setToken(null);
        setAuthToken(null);
        await deleteItem('userDetails');
        await deleteItem('token');
    };

    return (
        <AuthContext.Provider
            value={{
                userDetails,
                userId: userDetails?.id,
                token,
                saveAuth,
                loading,
                login,
                register,
                logout
            }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;