// Local-storage backed API shim for preview / offline builds.
// Replaces network axios calls with AsyncStorage operations so the app works
// without a backend when building a preview APK.

import { getItem, setItem } from '../context/LocalStorage';

// Helper: sequence key for generating IDs per entity
const seqKey = (entity) => `__seq__${entity}`;

const getNextId = async (entity) => {
    const k = seqKey(entity);
    const cur = (await getItem(k)) || 0;
    const next = cur + 1;
    await setItem(k, next);
    return next;
};

// Ensure a collection exists
const ensureCollection = async (key, seed = []) => {
    let v = (await getItem(key));
    if (!v) {
        // seed default demo user + wallet for easier preview testing
        if (key === 'user') {
            const demo = { id: 1, username: 'demo', password: 'demo', name: 'Demo User', email: 'demo@example.com', pin: '1234' };
            await setItem('user', [demo]);
            await setItem(seqKey('user'), 1);
            // create a wallet for demo user
            const demoWallet = { id: 1, ownerId: demo.id, walletName: "Demo Wallet", balance: 1000 };
            await setItem('wallet', [demoWallet]);
            await setItem(seqKey('wallet'), 1);
            v = [demo];
        } else {
            await setItem(key, seed);
            v = seed;
        }
    }
    return v;
};

// Simple no-op token setter to preserve API surface
export const setAuthToken = (token) => {
    // noop for local-storage mode
    return;
};

export const testHealth = async () => {
    // indicate offline/local mode
    return { status: 'ok', mode: 'local' };
};

export const fetchAllData = async (endpoint) => {
    try {
        const key = endpoint;
        const data = await ensureCollection(key, []);
        return data;
    } catch (error) {
        console.log(`Local fetchAllData error at ${endpoint}:`, error);
        throw error;
    }
}

export const fetchDataById = async (endpoint, id) => {
    try {
        const arr = (await ensureCollection(endpoint, []));
        const obj = arr.find((i) => String(i.id) === String(id));
        return obj || null;
    } catch (error) {
        console.log(`Local fetchDataById error at ${endpoint} with ID ${id}:`, error);
        throw error;
    }
};

export const updateData = async (endpoint, id, data) => {
    try {
        const arr = (await ensureCollection(endpoint, []));
        const idx = arr.findIndex((i) => String(i.id) === String(id));
        if (idx === -1) throw new Error('Not found');
        arr[idx] = { ...arr[idx], ...data };
        await setItem(endpoint, arr);
        return arr[idx];
    } catch (error) {
        throw error;
    }
};

export const deleteData = async (endpoint, id) => {
    try {
        const arr = (await ensureCollection(endpoint, []));
        const filtered = arr.filter((i) => String(i.id) !== String(id));
        await setItem(endpoint, filtered);
        return { success: true };
    } catch (error) {
        console.log(`Local deleteData error at ${endpoint} with ID ${id}:`, error);
        throw error;
    }
}

export const createWalletByUserId = async (data, userId) => {
    try {
        const wallets = await ensureCollection('wallet', []);
        const id = await getNextId('wallet');
        const newWallet = { id, ownerId: userId, walletName: data.walletName || `Wallet ${id}`, balance: Number(data.balance) || 0 };
        wallets.push(newWallet);
        await setItem('wallet', wallets);
        return newWallet;
    } catch (error) {
        console.log(`Local createWallet error:`, error);
        throw error;
    }
}

export const getWalletByUserId = async (userId) => {
    try {
        const wallets = await ensureCollection('wallet', []);
        return wallets.filter(w => String(w.ownerId) === String(userId));
    } catch (error) {
        console.log(`Local getWalletByUserId error:`, error);
        throw error;
    }
};

export const getWalletByUsername = async (username) => {
    try {
        const users = await ensureCollection('user', []);
        const user = users.find(u => u.username === username);
        if (!user) return [];
        return await getWalletByUserId(user.id);
    } catch (error) {
        throw error;
    }
};

export const depositToWallet = async (amt, id) => {
    try {
        const wallets = await ensureCollection('wallet', []);
        const wIdx = wallets.findIndex(w => String(w.id) === String(id));
        if (wIdx === -1) throw new Error('Wallet not found');
        const amount = Number(amt);
        wallets[wIdx].balance = Number(wallets[wIdx].balance || 0) + amount;
        await setItem('wallet', wallets);

        // create transaction
        const transactions = await ensureCollection('transaction', []);
        const txId = await getNextId('transaction');
        const tx = {
            id: txId,
            timestamp: new Date().toISOString(),
            type: 'DEPOSIT',
            amount: amount,
            fromWallet: null,
            toWallet: { id: wallets[wIdx].id, walletName: wallets[wIdx].walletName, ownerId: wallets[wIdx].ownerId }
        };
        transactions.unshift(tx);
        await setItem('transaction', transactions);
        return tx;
    } catch (error) {
        throw error;
    }
}

export const transferToWallet = async (amt, fromId, toId) => {
    try {
        const wallets = await ensureCollection('wallet', []);
        const fromIdx = wallets.findIndex(w => String(w.id) === String(fromId));
        const toIdx = wallets.findIndex(w => String(w.id) === String(toId));
        if (fromIdx === -1 || toIdx === -1) throw new Error('Wallet not found');
        const amount = Number(amt);
        if (Number(wallets[fromIdx].balance || 0) < amount) throw new Error('Insufficient balance');
        wallets[fromIdx].balance = Number(wallets[fromIdx].balance) - amount;
        wallets[toIdx].balance = Number(wallets[toIdx].balance || 0) + amount;
        await setItem('wallet', wallets);

        // create transaction
        const transactions = await ensureCollection('transaction', []);
        const txId = await getNextId('transaction');
        const tx = {
            id: txId,
            timestamp: new Date().toISOString(),
            type: 'TRANSFER',
            amount: amount,
            fromWallet: { id: wallets[fromIdx].id, walletName: wallets[fromIdx].walletName, ownerId: wallets[fromIdx].ownerId },
            toWallet: { id: wallets[toIdx].id, walletName: wallets[toIdx].walletName, ownerId: wallets[toIdx].ownerId }
        };
        transactions.unshift(tx);
        await setItem('transaction', transactions);
        return tx;
    } catch (error) {
        throw error;
    }
};

export const fetchTransactionsPaginated = async (page, size, sortBy, sortDir) => {
    try {
        const all = await ensureCollection('transaction', []);
        // simple pagination
        const start = page * size;
        const slice = all.slice(start, start + size);
        return { data: slice, total: all.length };
    } catch (error) {
        throw error;
    }
};

export const fetchTransactionsByWalletIdPaginated = async (walletId, page = 0, size = 20, sortBy, sortDir) => {
    try {
        const all = await ensureCollection('transaction', []);
        const filtered = all.filter(tx => String(tx.fromWallet?.id) === String(walletId) || String(tx.toWallet?.id) === String(walletId));
        const start = page * size;
        return filtered.slice(start, start + size);
    } catch (error) {
        throw error;
    }
};

export const createUser = async (data) => {
    try {
        const users = await ensureCollection('user', []);
        const id = await getNextId('user');
        const newUser = { id, username: data.username, password: data.password, name: data.name || data.username, email: data.email || '', pin: data.pin || '' };
        users.push(newUser);
        await setItem('user', users);
        // optionally create a default wallet
        await createWalletByUserId({ walletName: `${newUser.name}'s Wallet`, balance: 0 }, newUser.id);
        // return same shape as backend: { user, token }
        return { user: newUser, token: `localtoken.${id}.${Date.now()}` };
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (data) => {
    try {
        const users = await ensureCollection('user', []);
        const user = users.find(u => u.username === data.username && u.password === data.password);
        if (!user) throw new Error('Invalid credentials');
        return { user, token: `localtoken.${user.id}.${Date.now()}` };
    } catch (error) {
        throw error;
    }
}

export const registerUser = async (data) => {
    try {
        // reuse createUser behavior
        return await createUser(data);
    } catch (error) {
        throw error;
    }
}

export const verifyPin = async (data) => {
    try {
        const users = await ensureCollection('user', []);
        const user = users.find(u => u.username === data.username);
        if (!user) return { valid: false };
        return { valid: String(user.pin) === String(data.pin) };
    } catch (error) {
        throw error;
    }
}
