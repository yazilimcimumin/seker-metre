import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { getFoodById } from '../data/storageHelper';

export default function DetailScreen() {
  const params = useLocalSearchParams();
  const { foodId } = params;

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFood();
  }, [foodId]);

  const loadFood = async () => {
    const loadedFood = await getFoodById(foodId);
    setFood(loadedFood);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (!food) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Ürün bulunamadı</Text>
      </View>
    );
  }

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

  const getGlisemikSeviyeColor = (seviye) => {
    if (seviye.includes('Düşük')) return '#4CAF50';
    if (seviye.includes('Orta')) return '#FFC107';
    if (seviye.includes('Yüksek')) return '#F44336';
    return '#999';
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: food.isim,
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
        }}
      />
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Ana Başlık */}
          <View style={styles.header}>
            <Text style={styles.foodName}>{food.isim}</Text>
            <Text style={styles.portion}>{food.porsiyon}</Text>
          </View>

          {/* Durum Kartı */}
          <View style={[styles.statusCard, { backgroundColor: getStatusColor(food.durum) }]}>
            <Text style={styles.statusTitle}>{food.durum_text}</Text>
          </View>

          {/* Besin Değerleri */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>📊 Besin Değerleri</Text>
            
            <View style={styles.valueRow}>
              <Text style={styles.valueLabel}>Şeker Oranı:</Text>
              <Text style={styles.valueText}>{food.seker_orani}</Text>
            </View>

            <View style={styles.valueRow}>
              <Text style={styles.valueLabel}>Glisemik İndeks:</Text>
              <View style={styles.giContainer}>
                <Text style={[styles.giValue, { color: getGlisemikSeviyeColor(food.glisemik_seviye) }]}>
                  {food.glisemik_indeks}
                </Text>
                <View style={[styles.giBadge, { backgroundColor: getGlisemikSeviyeColor(food.glisemik_seviye) }]}>
                  <Text style={styles.giBadgeText}>{food.glisemik_seviye}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Açıklama */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>📝 Detaylı Bilgi</Text>
            <Text style={styles.description}>{food.aciklama}</Text>
          </View>

          {/* Öneriler */}
          {food.oneriler && food.oneriler.length > 0 && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>💡 Tüketim Önerileri</Text>
              {food.oneriler.map((oneri, index) => (
                <View key={index} style={styles.suggestionItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.suggestionText}>{oneri}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Uyarı */}
          <View style={styles.warningCard}>
            <Text style={styles.warningIcon}>⚕️</Text>
            <Text style={styles.warningText}>
              Bu bilgiler genel sağlık önerileri içindir. Bireysel durumunuz için mutlaka doktorunuza danışınız.
            </Text>
          </View>

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
  content: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  foodName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  portion: {
    fontSize: 14,
    color: '#999',
  },
  statusCard: {
    margin: 15,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  valueLabel: {
    fontSize: 15,
    color: '#666',
  },
  valueText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  giContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  giValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  giBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  giBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  description: {
    fontSize: 15,
    color: '#555',
    lineHeight: 24,
  },
  suggestionItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  bullet: {
    fontSize: 18,
    color: '#4CAF50',
    marginRight: 10,
    marginTop: -2,
  },
  suggestionText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  warningCard: {
    backgroundColor: '#FFF3E0',
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  warningIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  warningText: {
    flex: 1,
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  bottomPadding: {
    height: 20,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#999',
  },
});
