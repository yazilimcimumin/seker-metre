import AsyncStorage from '@react-native-async-storage/async-storage';
import { foodDatabase } from './foodData';

const STORAGE_KEY = '@seker_metre_custom_foods';

// Tüm gıdaları getir (varsayılan + custom)
export const getAllFoods = async () => {
  try {
    const customData = await AsyncStorage.getItem(STORAGE_KEY);
    const customFoods = customData ? JSON.parse(customData) : [];
    return [...foodDatabase, ...customFoods];
  } catch (error) {
    console.error('Veri okuma hatası:', error);
    return foodDatabase;
  }
};

// Kategoriye göre getir
export const getFoodsByCategory = async (kategori) => {
  const allFoods = await getAllFoods();
  return allFoods.filter(item => item.kategori === kategori);
};

// ID'ye göre getir
export const getFoodById = async (id) => {
  const allFoods = await getAllFoods();
  return allFoods.find(item => item.id === id);
};

// Custom gıdaları getir
export const getCustomFoods = async () => {
  try {
    const customData = await AsyncStorage.getItem(STORAGE_KEY);
    return customData ? JSON.parse(customData) : [];
  } catch (error) {
    console.error('Custom veri okuma hatası:', error);
    return [];
  }
};

// Custom gıda ekle
export const addCustomFood = async (food) => {
  try {
    const customFoods = await getCustomFoods();
    customFoods.push(food);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(customFoods));
    return true;
  } catch (error) {
    console.error('Veri kaydetme hatası:', error);
    return false;
  }
};

// Custom gıda sil
export const deleteCustomFood = async (id) => {
  try {
    const customFoods = await getCustomFoods();
    const filtered = customFoods.filter(food => food.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Veri silme hatası:', error);
    return false;
  }
};

// Tüm custom verileri temizle
export const clearCustomFoods = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Veri temizleme hatası:', error);
    return false;
  }
};
