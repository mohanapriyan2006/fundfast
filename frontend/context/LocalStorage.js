import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getItem = async (key) => {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
};

export const deleteItem = async (key) => {
    await AsyncStorage.removeItem(key);
};