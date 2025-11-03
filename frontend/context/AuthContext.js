import { createContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../service/API";
import { useNavigation } from "@react-navigation/native";
import { deleteItem, getItem, setItem } from "./LocalStorage";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [userDetails, setUserDetails] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);


    // initial user and token loading
    useEffect(() => {
        const loadAuthData = async () => {
            const savedDetails = await getItem("userDetails");
            if (savedDetails) {
                const savedToken = await getItem("token");
                if (savedToken) setToken(JSON.parse(savedToken));
                setUserDetails(JSON.parse(savedDetails));
            }
        };
        loadAuthData();
        setLoading(false);
    }, [])

    // JWT Token expiration check
    // useEffect(() => {

    // })

    const saveAuth = async (data) => {
        setUserDetails(data.user);
        setToken(data.token);
        await setItem("userDetails", data.user);
        await setItem("token", data.token);
    }

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
        setToken(null);
        setUserDetails(null);
        await deleteItem("userDetails");
        await deleteItem("token");
    };

    return (
        <AuthContext.Provider
            value={{
                userDetails,
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