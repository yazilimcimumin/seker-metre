import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { categories } from '../data/foodData';
import { getFoodsByCategory } from '../data/storageHelper';

export default function CategoryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { categoryId } = params;

  const [foods, setFoods] = useState([]);
  const category = categories.find(cat => cat.id === categoryId);

  useEffect(() => {
    loadFoods();
  }, [categoryId]);

  const loadFoods = async () => {
    const loadedFoods = await getFoodsByCategory(categoryId);
    setFoods(loadedFoods);
  };

  const getStatusColor = (durum) => {
    switch (durum) {
      case 'cok_uygun':
        return '#4CAF50';
      case 'uygun':
        return '#8BC34A';
      case 'sinirli':
        return '#FFC107';
      case 'uygun_degil':
        return '#F44336';
      default:
        return '#999';
    }
  };

  const getStatusIcon = (durum) => {
    switch (durum) {
      case 'cok_uygun':
        return '✅';
      case 'uygun':
        return '✓';
      case 'sinirli':
        return '⚠️';
      case 'uygun_degil':
        return '⛔';
      default:
        return '';
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: category?.name || 'Kategori',
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
        }}
      />
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />
        
        {/* Kategori Header */}
        <View style={[styles.categoryHeader, { backgroundColor: category?.color }]}>
          <Text style={styles.categoryIcon}>{category?.icon}</Text>
          <Text style={styles.categoryTitle}>{category?.name}</Text>
          <Text style={styles.itemCount}>{foods.length} Ürün</Text>
        </View>

        {/* Gıda Listesi */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {foods.map((food) => (
            <TouchableOpacity
              key={food.id}
              style={styles.foodCard}
              onPress={() => router.push({
                pathname: '/detail',
                params: { foodId: food.id }
              })}
              activeOpacity={0.7}
            >
              <View style={styles.foodHeader}>
                <View style={styles.foodTitleContainer}>
                  <Text style={styles.foodName}>{food.isim}</Text>
                  <Text style={styles.foodPortion}>{food.porsiyon}</Text>
                </View>
                <Text style={styles.statusIcon}>{getStatusIcon(food.durum)}</Text>
              </View>

              <View style={styles.foodInfo}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Şeker</Text>
                  <Text style={styles.infoValue}>{food.seker_orani}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Gİ</Text>
                  <Text style={styles.infoValue}>{food.glisemik_indeks}</Text>
                </View>
              </View>

              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(food.durum) }]}>
                <Text style={styles.statusText}>{food.durum_text}</Text>
              </View>
            </TouchableOpacity>
          ))}

          <View style={styles.bottomPadding} />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  categoryHeader: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  categoryIcon: {
    fontSize: 50,
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  itemCount: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  foodCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  foodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  foodTitleContainer: {
    flex: 1,
  },
  foodName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  foodPortion: {
    fontSize: 13,
    color: '#999',
  },
  statusIcon: {
    fontSize: 24,
    marginLeft: 10,
  },
  foodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: 12,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: '#E0E0E0',
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  statusBadge: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  bottomPadding: {
    height: 20,
  },
});
