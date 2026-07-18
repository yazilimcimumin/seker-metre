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
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleLogoPress} activeOpacity={0.8}>
          <Animated.Text style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}>
            🩺
          </Animated.Text>
        </TouchableOpacity>
        <Text style={styles.title}>Şeker Metre</Text>
        <Text style={styles.subtitle}>Diyabet Dostu Gıda Rehberi</Text>
      </View>

      {/* Kategoriler */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryCard, { backgroundColor: category.color }]}
              onPress={() => router.push({
                pathname: '/category',
                params: { categoryId: category.id }
              })}
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
  header: {
    backgroundColor: '#4CAF50',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  logo: {
    fontSize: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#E8F5E9',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  categoriesContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  categoryName: {
    flex: 1,
    fontSize: 20,
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
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  infoIcon: {
    fontSize: 30,
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
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
