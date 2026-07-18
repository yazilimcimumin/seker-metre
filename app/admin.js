import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { categories } from '../data/foodData';

const STORAGE_KEY = '@seker_metre_custom_foods';

export default function AdminScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('add'); // 'add' veya 'list'
  const [foods, setFoods] = useState([]);
  const [editingFood, setEditingFood] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    kategori: 'meyve',
    isim: '',
    seker_orani: '',
    porsiyon: '',
    glisemik_indeks: '',
    glisemik_seviye: 'Düşük',
    durum: 'uygun',
    durum_text: 'Uygundur',
    aciklama: '',
    oneriler: '',
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Ürünleri yükle
  useEffect(() => {
    loadFoods();
  }, []);

  const loadFoods = async () => {
    const customFoods = await AsyncStorage.getItem(STORAGE_KEY);
    if (customFoods) {
      setFoods(JSON.parse(customFoods));
    }
  };

  // Düzenleme için formu doldur
  const startEdit = (food) => {
    setEditingFood(food.id);
    setFormData({
      id: food.id,
      kategori: food.kategori,
      isim: food.isim,
      seker_orani: food.seker_orani,
      porsiyon: food.porsiyon,
      glisemik_indeks: food.glisemik_indeks.toString(),
      glisemik_seviye: food.glisemik_seviye,
      durum: food.durum,
      durum_text: food.durum_text,
      aciklama: food.aciklama,
      oneriler: food.oneriler.join('\n'),
    });
    setActiveTab('add');
  };

  // Silme
  const deleteFood = async (id) => {
    Alert.alert(
      'Ürünü Sil',
      'Bu ürünü silmek istediğinize emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: async () => {
            const updatedFoods = foods.filter(f => f.id !== id);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFoods));
            setFoods(updatedFoods);
            Alert.alert('Başarılı', 'Ürün silindi');
          }
        }
      ]
    );
  };

  const generateId = (isim) => {
    return isim
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]/g, '_');
  };

  const validateForm = () => {
    if (!formData.isim.trim()) {
      Alert.alert('Hata', 'Gıda adı zorunludur');
      return false;
    }
    if (!formData.seker_orani.trim()) {
      Alert.alert('Hata', 'Şeker oranı zorunludur');
      return false;
    }
    if (!formData.glisemik_indeks.trim()) {
      Alert.alert('Hata', 'Glisemik indeks zorunludur');
      return false;
    }
    if (!formData.aciklama.trim()) {
      Alert.alert('Hata', 'Açıklama zorunludur');
      return false;
    }
    return true;
  };

  const saveFood = async () => {
    if (!validateForm()) return;

    try {
      // Önerileri array'e çevir
      const onerilerArray = formData.oneriler
        .split('\n')
        .filter(line => line.trim() !== '');

      const foodData = {
        ...formData,
        id: editingFood || generateId(formData.isim),
        glisemik_indeks: parseInt(formData.glisemik_indeks),
        oneriler: onerilerArray,
        renk: '#E3F2FD',
      };

      // Mevcut custom gıdaları al
      const existingData = await AsyncStorage.getItem(STORAGE_KEY);
      let existingFoods = existingData ? JSON.parse(existingData) : [];

      if (editingFood) {
        // Güncelleme
        existingFoods = existingFoods.map(f => f.id === editingFood ? foodData : f);
      } else {
        // Yeni ekleme
        existingFoods.push(foodData);
      }

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(existingFoods));
      setFoods(existingFoods);

      Alert.alert(
        'Başarılı',
        editingFood ? 'Gıda güncellendi!' : 'Gıda eklendi!',
        [
          {
            text: 'Tamam',
            onPress: () => {
              // Formu sıfırla
              setFormData({
                id: '',
                kategori: 'meyve',
                isim: '',
                seker_orani: '',
                porsiyon: '',
                glisemik_indeks: '',
                glisemik_seviye: 'Düşük',
                durum: 'uygun',
                durum_text: 'Uygundur',
                aciklama: '',
                oneriler: '',
              });
              setEditingFood(null);
              setActiveTab('list');
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Hata', 'Gıda kaydedilirken bir hata oluştu');
      console.error(error);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: '🔐 Admin Panel',
          headerStyle: {
            backgroundColor: '#673AB7',
          },
          headerTintColor: '#fff',
        }}
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar barStyle="light-content" backgroundColor="#673AB7" />
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.warningBanner}>
            <Text style={styles.warningIcon}>🔐</Text>
            <Text style={styles.warningText}>
              Bu panel gizlidir. Jürilere gösterilmeyecektir.
            </Text>
          </View>

          {/* Tab Seçici */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'add' && styles.tabActive]}
              onPress={() => setActiveTab('add')}
            >
              <Text style={[styles.tabText, activeTab === 'add' && styles.tabTextActive]}>
                {editingFood ? '✏️ Düzenle' : '➕ Yeni Ekle'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'list' && styles.tabActive]}
              onPress={() => {
                setActiveTab('list');
                setEditingFood(null);
                loadFoods();
              }}
            >
              <Text style={[styles.tabText, activeTab === 'list' && styles.tabTextActive]}>
                📋 Ürünler ({foods.length})
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form veya Liste */}
          {activeTab === 'add' ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{editingFood ? 'Gıdayı Düzenle' : 'Yeni Gıda Ekle'}</Text>

            {/* Kategori Seçimi */}
            <Text style={styles.label}>Kategori *</Text>
            <View style={styles.categoryButtons}>
              {categories.map(cat => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryButton,
                    formData.kategori === cat.id && styles.categoryButtonActive
                  ]}
                  onPress={() => updateField('kategori', cat.id)}
                >
                  <Text style={styles.categoryButtonIcon}>{cat.icon}</Text>
                  <Text style={[
                    styles.categoryButtonText,
                    formData.kategori === cat.id && styles.categoryButtonTextActive
                  ]}>
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Gıda Adı */}
            <Text style={styles.label}>Gıda Adı *</Text>
            <TextInput
              style={styles.input}
              value={formData.isim}
              onChangeText={(text) => updateField('isim', text)}
              placeholder="Örn: Armut"
              placeholderTextColor="#999"
            />

            {/* Porsiyon */}
            <Text style={styles.label}>Porsiyon Bilgisi</Text>
            <TextInput
              style={styles.input}
              value={formData.porsiyon}
              onChangeText={(text) => updateField('porsiyon', text)}
              placeholder="Örn: 1 orta boy (150g)"
              placeholderTextColor="#999"
            />

            {/* Şeker Oranı */}
            <Text style={styles.label}>Şeker Oranı *</Text>
            <TextInput
              style={styles.input}
              value={formData.seker_orani}
              onChangeText={(text) => updateField('seker_orani', text)}
              placeholder="Örn: 12g"
              placeholderTextColor="#999"
            />

            {/* Glisemik İndeks */}
            <Text style={styles.label}>Glisemik İndeks *</Text>
            <TextInput
              style={styles.input}
              value={formData.glisemik_indeks}
              onChangeText={(text) => updateField('glisemik_indeks', text)}
              placeholder="Örn: 38"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />

            {/* Glisemik Seviye */}
            <Text style={styles.label}>Glisemik Seviye</Text>
            <View style={styles.radioGroup}>
              {['Düşük', 'Orta', 'Yüksek'].map(level => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.radioButton,
                    formData.glisemik_seviye === level && styles.radioButtonActive
                  ]}
                  onPress={() => updateField('glisemik_seviye', level)}
                >
                  <Text style={[
                    styles.radioText,
                    formData.glisemik_seviye === level && styles.radioTextActive
                  ]}>
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Durum */}
            <Text style={styles.label}>Diyabet Uygunluk Durumu</Text>
            <View style={styles.radioGroup}>
              {[
                { id: 'cok_uygun', label: 'Çok Uygun' },
                { id: 'uygun', label: 'Uygun' },
                { id: 'sinirli', label: 'Sınırlı' },
                { id: 'uygun_degil', label: 'Uygun Değil' }
              ].map(option => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.radioButton,
                    formData.durum === option.id && styles.radioButtonActive
                  ]}
                  onPress={() => {
                    updateField('durum', option.id);
                    updateField('durum_text', option.label);
                  }}
                >
                  <Text style={[
                    styles.radioText,
                    formData.durum === option.id && styles.radioTextActive
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Açıklama */}
            <Text style={styles.label}>Detaylı Açıklama *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.aciklama}
              onChangeText={(text) => updateField('aciklama', text)}
              placeholder="Gıda hakkında detaylı açıklama yazın..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />

            {/* Öneriler */}
            <Text style={styles.label}>Tüketim Önerileri (Her satıra bir öneri)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.oneriler}
              onChangeText={(text) => updateField('oneriler', text)}
              placeholder="Günde 1 porsiyon tüketilebilir&#10;Yanında protein tüketmek faydalıdır"
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            {/* Kaydet Butonu */}
            <TouchableOpacity style={styles.saveButton} onPress={saveFood}>
              <Text style={styles.saveButtonText}>
                {editingFood ? '✏️ Güncelle' : '💾 Gıdayı Kaydet'}
              </Text>
            </TouchableOpacity>

            {editingFood && (
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={() => {
                  setEditingFood(null);
                  setFormData({
                    id: '',
                    kategori: 'meyve',
                    isim: '',
                    seker_orani: '',
                    porsiyon: '',
                    glisemik_indeks: '',
                    glisemik_seviye: 'Düşük',
                    durum: 'uygun',
                    durum_text: 'Uygundur',
                    aciklama: '',
                    oneriler: '',
                  });
                  setActiveTab('list');
                }}
              >
                <Text style={styles.cancelButtonText}>❌ İptal</Text>
              </TouchableOpacity>
            )}
          </View>
          ) : (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Eklenmiş Gıdalar ({foods.length})</Text>
            
            {foods.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>Henüz ürün eklenmemiş</Text>
                <TouchableOpacity
                  style={styles.addFirstButton}
                  onPress={() => setActiveTab('add')}
                >
                  <Text style={styles.addFirstButtonText}>➕ İlk Ürünü Ekle</Text>
                </TouchableOpacity>
              </View>
            ) : (
              foods.map((food) => (
                <View key={food.id} style={styles.foodItem}>
                  <View style={styles.foodItemHeader}>
                    <Text style={styles.foodItemName}>{food.isim}</Text>
                    <Text style={styles.foodItemCategory}>
                      {categories.find(c => c.id === food.kategori)?.icon} {categories.find(c => c.id === food.kategori)?.name}
                    </Text>
                  </View>
                  <View style={styles.foodItemDetails}>
                    <Text style={styles.foodItemDetail}>🍬 {food.seker_orani}</Text>
                    <Text style={styles.foodItemDetail}>📊 GI: {food.glisemik_indeks}</Text>
                  </View>
                  <View style={styles.foodItemActions}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => startEdit(food)}
                    >
                      <Text style={styles.editButtonText}>✏️ Düzenle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => deleteFood(food.id)}
                    >
                      <Text style={styles.deleteButtonText}>🗑️ Sil</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
          )}

          <View style={styles.bottomPadding} />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
  },
  warningBanner: {
    backgroundColor: '#673AB7',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  warningIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  warningText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#FFFFFF',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: '#333',
    backgroundColor: '#FAFAFA',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  categoryButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  categoryButtonActive: {
    borderColor: '#673AB7',
    backgroundColor: '#F3E5F5',
  },
  categoryButtonIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#666',
  },
  categoryButtonTextActive: {
    color: '#673AB7',
    fontWeight: '600',
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  radioButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  radioButtonActive: {
    borderColor: '#673AB7',
    backgroundColor: '#673AB7',
  },
  radioText: {
    fontSize: 13,
    color: '#666',
  },
  radioTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#F44336',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 10,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: '#673AB7',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  foodItem: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#673AB7',
  },
  foodItemHeader: {
    marginBottom: 8,
  },
  foodItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  foodItemCategory: {
    fontSize: 12,
    color: '#666',
  },
  foodItemDetails: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  foodItemDetail: {
    fontSize: 13,
    color: '#555',
    marginRight: 15,
  },
  foodItemActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  editButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#F44336',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 15,
  },
  addFirstButton: {
    backgroundColor: '#673AB7',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addFirstButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 30,
  },
});
