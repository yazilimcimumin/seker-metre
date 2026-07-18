import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Animated
} from 'react-native';
import { useRouter } from 'expo-router';
import { categories } from '../data/foodData';

export default function HomeScreen() {
  const router = useRouter();
  const [tapCount, setTapCount] = useState(0);
  const tapTimeout = useRef(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Gizli admin paneli için 5 kez tıklama
  const handleLogoPress = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);

    // Animasyon efekti
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    if (newCount >= 5) {
      // Admin paneline yönlendir
      router.push('/admin');
      setTapCount(0);
    }

    // 3 saniye içinde 5 kez tıklanmazsa sayacı sıfırla
    if (tapTimeout.current) {
      clearTimeout(tapTimeout.current);
    }
    tapTimeout.current = setTimeout(() => {
      setTapCount(0);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (tapTimeout.current) {
        clearTimeout(tapTimeout.current);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />

      {/* Kategoriler */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Gizli Admin Erişimi - Bilgi kartına 5 kez tıkla */}
        <TouchableOpacity 
          style={styles.adminHintCard}
          onPress={handleLogoPress}
          activeOpacity={0.9}
        >
          <Text style={styles.adminHintIcon}>🩺</Text>
          <Text style={styles.adminHintText}>Diyabet Dostu Gıda Rehberi</Text>
        </TouchableOpacity>

        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryCard, { backgroundColor: category.color }]}
              onPress={() => {
                if (category.route) {
                  router.push(category.route);
                } else {
                  router.push({
                    pathname: '/category',
                    params: { categoryId: category.id }
                  });
                }
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryName}>{category.name}</Text>
              <View style={styles.arrow}>
                <Text style={styles.arrowText}>→</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bilgilendirme */}
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={styles.infoTitle}>Glisemik İndeks Nedir?</Text>
          <Text style={styles.infoText}>
            Glisemik indeks (Gİ), gıdaların kan şekerini ne kadar hızlı yükselttiğini gösteren bir ölçümdür.
          </Text>
          <View style={styles.infoLevels}>
            <View style={styles.levelItem}>
              <View style={[styles.levelDot, { backgroundColor: '#4CAF50' }]} />
              <Text style={styles.levelText}>Düşük (0-55): İdeal</Text>
            </View>
            <View style={styles.levelItem}>
              <View style={[styles.levelDot, { backgroundColor: '#FFC107' }]} />
              <Text style={styles.levelText}>Orta (56-69): Dikkatli</Text>
            </View>
            <View style={styles.levelItem}>
              <View style={[styles.levelDot, { backgroundColor: '#F44336' }]} />
              <Text style={styles.levelText}>Yüksek (70+): Kaçının</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Bu uygulama bilimsel kaynaklara dayalı bilgiler içermektedir.
          </Text>
          <Text style={styles.footerSubtext}>
            Doktorunuzun önerilerini mutlaka takip ediniz.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  adminHintCard: {
    backgroundColor: '#E8F5E9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  adminHintIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  adminHintText: {
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: '600',
  },
  categoriesContainer: {
    marginTop: 20,
    marginBottom: 15,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    fontSize: 36,
    marginRight: 12,
  },
  categoryName: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  arrow: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 18,
    color: '#333',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    borderLeftWidth: 3,
    borderLeftColor: '#2196F3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  infoIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 12,
  },
  infoLevels: {
    marginTop: 10,
  },
  levelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  levelDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  levelText: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginBottom: 5,
  },
  footerSubtext: {
    fontSize: 11,
    color: '#BBB',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
