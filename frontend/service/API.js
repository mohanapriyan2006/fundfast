import axios from 'axios';
import { getItem } from '../context/LocalStorage';

// const API_BASE_URL = 'http://10.142.53.50:8080/api';
const API_BASE_URL = 'http://172.19.86.114:8080/api';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


let currentToken = null;
export const setAuthToken = (token) => {
    currentToken = token || null;
    if (currentToken) {
        api.defaults.headers.common.Authorization = `Bearer ${currentToken}`;
    } else {
        delete api.defaults.headers.common.Authorization;
    }
};


api.interceptors.request.use((config) => {
    if (currentToken && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${currentToken}`;
    }
    return config;
});


api.interceptors.response.use(
    (res) => res,
    (err) => {
        const s = err?.response?.status;
        if (s === 401 || s === 403) {
            console.log('Auth error', s, 'Authorization header present:', !!api.defaults.headers.common.Authorization);
        }
        return Promise.reject(err);
    }
);


(async () => {
    try {
        const t = await getItem('token');
        if (t) setAuthToken(t);
    } catch { }
})();

// Test the health endpoint
export const testHealth = async () => {
    try {
        const response = await api.get('/health');
        return response.data;
    } catch (error) {
        console.log('API fetch error:', error);
        throw error;
    }
};

// Generic GET All API functions for [wallet , transaction , user ]
export const fetchAllData = async (endpoint) => {
    try {
        const response = await api.get(`/${endpoint}/all`);
        // console.log('API fetchAllData response:', response);
        return response.data;
    } catch (error) {
        console.log(`API fetch error at ${endpoint}:`, error);
        throw error;
    }
}

// Generic GET by ID API functions for [wallet , transaction , user ]
export const fetchDataById = async (endpoint, id) => {
    try {
        const response = await api.get(`/${endpoint}/${id}`);
        return response.data;
    } catch (error) {
        console.log(`API fetch error at ${endpoint} with ID ${id}:`, error);
        throw error;
    }
};

// Generic PUT API functions for [wallet , user ]
export const updateData = async (endpoint, id, data) => {
    try {
        const response = await api.put(`/${endpoint}/${id}`, data);
        return response.data;
    } catch (error) {
        const message =
            error.response?.data?.message ??
            (typeof error.response?.data === 'string' ? error.response.data : undefined) ??
            error.response?.statusText ??
            error.message ??
            'Update failed';
        throw new Error(message);
    }
};

// Generic DELETE API functions for [wallet , transaction , user ]
export const deleteData = async (endpoint, id) => {
    try {
        const response = await api.delete(`/${endpoint}/${id}`);
        return response.data;
    } catch (error) {
        console.log(`API delete error at ${endpoint} with ID ${id}:`, error);
        throw error;
    }
}

// POST API (CREATE new wallet) functions for [ wallet ]
export const createWalletByUserId = async (data, userId) => {
    try {
        const response = await api.post(`/wallet/${userId}`, data);
        return response.data;
    } catch (error) {
        console.log(`API create error at wallet:`, error);
        throw error;
    }
}

// GET by userID API functions for [ wallet ]
export const getWalletByUserId = async (userId) => {
    try {
        const response = await api.get(`/wallet/ownerId/${userId}`);
        return response.data;
    } catch (error) {
        console.log(`API fetch error at wallet:`, error);
        throw error;
    }
};

// GET by username API functions for [ wallet ]
export const getWalletByUsername = async (username) => {
    try {
        const response = await api.get(`/wallet/username/${username}`);
        return response.data;
    } catch (error) {
       const message =
            error.response?.data?.message ??
            (typeof error.response?.data === 'string' ? error.response.data : undefined) ??
            error.response?.statusText ??
            error.message ??
            'Fetch wallet by username failed';
        throw new Error(message);
    }
};

// POST API (DEPOSIT amt to wallet) functions for [ wallet ]
export const depositToWallet = async (amt, id) => {
    try {
        const response = await api.post(`/wallet/${id}/deposit?amount=${amt}`);
        return response.data;
    } catch (error) {
        const message =
            error.response?.data?.message ??
            (typeof error.response?.data === 'string' ? error.response.data : undefined) ??
            error.response?.statusText ??
            error.message ??
            'Deposit failed';
        throw new Error(message);
    }
}

// POST API (TRANSFER amt one wallet to another) functions for [ Wallet -> Transaction ]
export const transferToWallet = async (amt, fromId, toId) => {
    try {
        const response = await api.post(`/wallet/${fromId}/transfer/${toId}?amount=${amt}`);
        return response.data;
    } catch (error) {
        const message =
            error.response?.data?.message ??
            (typeof error.response?.data === 'string' ? error.response.data : undefined) ??
            error.response?.statusText ??
            error.message ??
            'Transfer failed';
        throw new Error(message);
    }
};


// GET ALL by PAGINATION & SORTING API functions for [ Transactions ]
export const fetchTransactionsPaginated = async (page, size, sortBy, sortDir) => {
    try {
        const response = await api.get(`/transaction/all?pageNo=${page}&pageSize=${size}&sortBy=${sortBy}&sortDir=${sortDir}`);
        return response;
    } catch (error) {
        console.log(`API fetch error at transactions paginated:`, error);
        throw error;
    }
};


// GET by Wallet by PAGINATION & SORTING API functions for [ Transactions ]
export const fetchTransactionsByWalletIdPaginated = async (walletId, page, size, sortBy, sortDir) => {
    try {
        const response = await api.get(`/transaction/walletId/${walletId}?pageNo=${page}&pageSize=${size}&sortBy=${sortBy}&sortDir=${sortDir}`);
        return response.data;
    } catch (error) {
        console.log(`API fetch error at transactions paginated:`, error);
        throw error;
    }
};


// POST API functions for [ user ]
export const createUser = async (data) => {
    try {
        const response = await api.post(`/user`, data);
        return response.data;
    } catch (error) {
        console.log(`API create error at user:`, error);
        throw error;
    }
};


// AUTH API functions

// Login user
export const loginUser = async (data) => {
    try {
        const response = await api.post("/auth/login", data);
        return response.data;
    } catch (error) {
        const message =
            error.response?.data?.message ??
            (typeof error.response?.data === 'string' ? error.response.data : undefined) ??
            error.response?.statusText ??
            error.message ??
            'Login failed';
        throw new Error(message);
    }
}

// Register user
export const registerUser = async (data) => {
    try {
        const response = await api.post("/auth/register", data);
        return response.data;
    } catch (error) {
        const message =
            error.response?.data?.message ??
            (typeof error.response?.data === 'string' ? error.response.data : undefined) ??
            error.response?.statusText ??
            error.message ??
            'Registration failed';
        throw new Error(message);
    }
}

// verify PIN user
export const verifyPin = async (data) => {
    try {
        const response = await api.post("/auth/pin", data);
        return response.data;
    } catch (error) {
        const message =
            error.response?.data?.message ??
            (typeof error.response?.data === 'string' ? error.response.data : undefined) ??
            error.response?.statusText ??
            error.message ??
            'Registration failed';
        throw new Error(message);
    }
}