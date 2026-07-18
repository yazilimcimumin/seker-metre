import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import { Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@seker_metre_sugar_tracking';
const { width } = Dimensions.get('window');

const measurementTypes = [
  { id: 'breakfast_before', label: 'Kahvaltı Öncesi', emoji: '🌅', time: '07:00' },
  { id: 'breakfast_after', label: 'Kahvaltı Sonrası (2 saat)', emoji: '☕', time: '09:00' },
  { id: 'lunch_before', label: 'Öğle Öncesi', emoji: '🌞', time: '12:00' },
  { id: 'lunch_after', label: 'Öğle Sonrası (2 saat)', emoji: '🍽️', time: '14:00' },
  { id: 'dinner_before', label: 'Akşam Öncesi', emoji: '🌆', time: '18:00' },
  { id: 'dinner_after', label: 'Akşam Sonrası (2 saat)', emoji: '🌙', time: '20:00' },
];

export default function SugarTrackingScreen() {
  const [activeTab, setActiveTab] = useState('entry'); // 'entry', 'daily', 'weekly'
  const [measurements, setMeasurements] = useState({});
  const [allData, setAllData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    loadData();
  }, [selectedDate]);

  const loadData = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        setAllData(parsed);
        
        // Bugünün verilerini yükle
        const todayData = parsed.find(d => d.date === selectedDate);
        if (todayData) {
          setMeasurements(todayData.measurements);
        } else {
          setMeasurements({});
        }
      }
    } catch (error) {
      console.error('Veri yükleme hatası:', error);
    }
  };

  const saveMeasurement = async (type, value) => {
    if (!value || isNaN(value)) {
      Alert.alert('Hata', 'Lütfen geçerli bir değer girin');
      return;
    }

    const numValue = parseInt(value);
    if (numValue < 50 || numValue > 500) {
      Alert.alert('Uyarı', 'Şeker değeri 50-500 arasında olmalıdır');
      return;
    }

    const newMeasurements = { ...measurements, [type]: numValue };
    setMeasurements(newMeasurements);

    // Tüm verileri güncelle
    const updatedData = allData.filter(d => d.date !== selectedDate);
    updatedData.push({
      date: selectedDate,
      measurements: newMeasurements,
    });
    updatedData.sort((a, b) => b.date.localeCompare(a.date));

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    setAllData(updatedData);

    Alert.alert('Başarılı', 'Ölçüm kaydedildi');
  };

  const getStatus = (value) => {
    if (value < 70) return { text: 'Düşük', color: '#FF9800', emoji: '⚠️' };
    if (value <= 140) return { text: 'Normal', color: '#4CAF50', emoji: '✅' };
    if (value <= 180) return { text: 'Yüksek', color: '#FF9800', emoji: '⚠️' };
    return { text: 'Çok Yüksek', color: '#F44336', emoji: '🚨' };
  };

  const getAverage = (data) => {
    if (!data || data.length === 0) return 0;
    const values = Object.values(data);
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  };

  const getDailyComment = () => {
    const avg = getAverage(measurements);
    const count = Object.keys(measurements).length;
    
    if (count === 0) return 'Henüz ölçüm yok';
    if (avg < 70) return 'Ortalama değerler düşük. Doktorunuza danışın.';
    if (avg <= 140) return 'Harika! Şeker değerleriniz kontrol altında.';
    if (avg <= 180) return 'Dikkat! Ortalama değerler yüksek.';
    return 'Acil kontrol gerekli! Doktorunuza danışın.';
  };

  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split('T')[0]);
    }
    return days;
  };

  const getWeeklyAverages = () => {
    const days = getLast7Days();
    return days.map(date => {
      const dayData = allData.find(d => d.date === date);
      if (!dayData) return 0;
      return getAverage(dayData.measurements);
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: '🩺 Şeker Takibi',
          headerStyle: { backgroundColor: '#4CAF50' },
          headerTintColor: '#fff',
        }}
      />
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />

        {/* Tab Seçici */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'entry' && styles.tabActive]}
            onPress={() => setActiveTab('entry')}
          >
            <Text style={[styles.tabText, activeTab === 'entry' && styles.tabTextActive]}>
              📝 Veri Girişi
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'daily' && styles.tabActive]}
            onPress={() => setActiveTab('daily')}
          >
            <Text style={[styles.tabText, activeTab === 'daily' && styles.tabTextActive]}>
              📊 Günlük
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'weekly' && styles.tabActive]}
            onPress={() => setActiveTab('weekly')}
          >
            <Text style={[styles.tabText, activeTab === 'weekly' && styles.tabTextActive]}>
              📈 Haftalık
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Tarih Gösterici */}
          <View style={styles.dateCard}>
            <Text style={styles.dateLabel}>Seçili Tarih</Text>
            <Text style={styles.dateValue}>
              {new Date(selectedDate).toLocaleDateString('tr-TR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </View>

          {activeTab === 'entry' && (
            <View>
              {measurementTypes.map((type) => (
                <View key={type.id} style={styles.measurementCard}>
                  <View style={styles.measurementHeader}>
                    <Text style={styles.measurementEmoji}>{type.emoji}</Text>
                    <View style={styles.measurementInfo}>
                      <Text style={styles.measurementLabel}>{type.label}</Text>
                      <Text style={styles.measurementTime}>Önerilen: {type.time}</Text>
                    </View>
                  </View>

                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="mg/dL"
                      placeholderTextColor="#999"
                      keyboardType="numeric"
                      value={measurements[type.id]?.toString() || ''}
                      onChangeText={(text) => {
                        setMeasurements({ ...measurements, [type.id]: text });
                      }}
                    />
                    <TouchableOpacity
                      style={styles.saveBtn}
                      onPress={() => saveMeasurement(type.id, measurements[type.id])}
                    >
                      <Text style={styles.saveBtnText}>Kaydet</Text>
                    </TouchableOpacity>
                  </View>

                  {measurements[type.id] && (
                    <View style={styles.statusBar}>
                      <Text style={styles.statusValue}>{measurements[type.id]} mg/dL</Text>
                      <View
                        style={[
                          styles.statusBadge,
                          { backgroundColor: getStatus(measurements[type.id]).color },
                        ]}
                      >
                        <Text style={styles.statusText}>
                          {getStatus(measurements[type.id]).emoji} {getStatus(measurements[type.id]).text}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {activeTab === 'daily' && (
            <View>
              {/* Günlük Özet */}
              <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>📊 Günlük Özet</Text>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Ölçüm Sayısı:</Text>
                  <Text style={styles.summaryValue}>{Object.keys(measurements).length}/6</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Ortalama:</Text>
                  <Text style={[styles.summaryValue, { color: getStatus(getAverage(measurements)).color }]}>
                    {getAverage(measurements)} mg/dL
                  </Text>
                </View>
                <View style={styles.commentBox}>
                  <Text style={styles.commentIcon}>💬</Text>
                  <Text style={styles.commentText}>{getDailyComment()}</Text>
                </View>
              </View>

              {/* Günlük Grafik */}
              <View style={styles.chartCard}>
                <Text style={styles.chartTitle}>📈 Gün İçi Değişim</Text>
                <View style={styles.simpleChart}>
                  {measurementTypes.map((type, index) => {
                    const value = measurements[type.id];
                    const height = value ? (value / 200) * 100 : 0;
                    return (
                      <View key={type.id} style={styles.barContainer}>
                        <View
                          style={[
                            styles.bar,
                            {
                              height: Math.max(height, 5),
                              backgroundColor: value ? getStatus(value).color : '#E0E0E0',
                            },
                          ]}
                        >
                          {value && <Text style={styles.barValue}>{value}</Text>}
                        </View>
                        <Text style={styles.barLabel}>{type.emoji}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
          )}

          {activeTab === 'weekly' && (
            <View>
              {/* Haftalık Özet */}
              <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>📈 Son 7 Gün</Text>
                <View style={styles.weeklyChart}>
                  {getLast7Days().map((date, index) => {
                    const dayData = allData.find(d => d.date === date);
                    const avg = dayData ? getAverage(dayData.measurements) : 0;
                    const height = avg ? (avg / 200) * 100 : 0;
                    const dayName = new Date(date).toLocaleDateString('tr-TR', { weekday: 'short' });

                    return (
                      <View key={date} style={styles.weekBarContainer}>
                        <View
                          style={[
                            styles.weekBar,
                            {
                              height: Math.max(height, 5),
                              backgroundColor: avg ? getStatus(avg).color : '#E0E0E0',
                            },
                          ]}
                        >
                          {avg > 0 && <Text style={styles.weekBarValue}>{avg}</Text>}
                        </View>
                        <Text style={styles.weekBarLabel}>{dayName}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>

              {/* Haftalık İstatistikler */}
              <View style={styles.statsCard}>
                <Text style={styles.statsTitle}>📊 Haftalık İstatistikler</Text>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Ortalama:</Text>
                  <Text style={styles.statValue}>
                    {Math.round(getWeeklyAverages().reduce((a, b) => a + b, 0) / 7)} mg/dL
                  </Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Ölçüm Günü:</Text>
                  <Text style={styles.statValue}>{allData.length} gün</Text>
                </View>
              </View>

              {/* Bilgilendirme */}
              <View style={styles.infoBox}>
                <Text style={styles.infoIcon}>💡</Text>
                <Text style={styles.infoText}>
                  Düzenli ölçüm şeker kontrolü için çok önemlidir. Günde en az 4 ölçüm yapmanız
                  önerilir.
                </Text>
              </View>
            </View>
          )}

          <View style={styles.bottomPadding} />
        </ScrollView>
      </View>
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 10,
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
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: '#4CAF50',
  },
  tabText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  dateCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  dateValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  measurementCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginBottom: 12,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  measurementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  measurementEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  measurementInfo: {
    flex: 1,
  },
  measurementLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  measurementTime: {
    fontSize: 12,
    color: '#999',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#FAFAFA',
    marginRight: 10,
  },
  saveBtn: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  statusValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 15,
    color: '#666',
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  commentBox: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  commentIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  commentText: {
    flex: 1,
    fontSize: 14,
    color: '#2E7D32',
    lineHeight: 20,
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 20,
    borderRadius: 12,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  simpleChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 150,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  barContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  bar: {
    width: 40,
    borderRadius: 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 4,
    minHeight: 5,
  },
  barValue: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  barLabel: {
    fontSize: 16,
    marginTop: 8,
  },
  weeklyChart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 150,
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingHorizontal: 10,
  },
  weekBarContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  weekBar: {
    width: 35,
    borderRadius: 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 4,
    minHeight: 5,
  },
  weekBarValue: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
  weekBarLabel: {
    fontSize: 11,
    marginTop: 8,
    color: '#666',
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 20,
    borderRadius: 12,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  infoBox: {
    backgroundColor: '#FFF3E0',
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    borderLeftWidth: 3,
    borderLeftColor: '#FF9800',
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#E65100',
    lineHeight: 20,
  },
  bottomPadding: {
    height: 30,
  },
});
