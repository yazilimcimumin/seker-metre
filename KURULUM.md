# 🚀 Şeker Metre - Kurulum ve Çalıştırma Rehberi

## ✅ Hızlı Başlangıç

### 1. Gerekli Yazılımlar
```bash
# Node.js 20+ kurulu olmalı
node --version  # v20.x.x veya üzeri

# npm kurulu olmalı
npm --version   # 9.x.x veya üzeri
```

### 2. Projeyi İndirin
```bash
git clone https://github.com/yazilimcimumin/seker-metre.git
cd seker-metre
```

### 3. Bağımlılıkları Yükleyin
```bash
npm install
```

### 4. Uygulamayı Başlatın

#### Expo Go ile Test (En Kolay)
```bash
npx expo start
```
- QR kodu telefonunuzdan tarayın
- Expo Go uygulamasını açın
- Uygulama telefonunuzda çalışacak

#### Android Emülatör
```bash
npx expo start --android
```

#### iOS Simulator (Sadece macOS)
```bash
npx expo start --ios
```

## 📱 APK Build Alma

### Otomatik Build (GitHub Actions)
1. GitHub'a push yapın
2. Actions sekmesine gidin
3. Build tamamlandığında APK'yı indirin

### Manuel Build (Yerel)
```bash
# EAS CLI kur
npm install -g eas-cli

# EAS'e giriş yap
eas login

# Build başlat
eas build --platform android --profile preview

# Build tamamlandığında APK linkini alacaksınız
```

## 🔐 Admin Panel Erişimi

Ana ekranda **🩺 logo**ya **3 saniye içinde 5 kez** tıklayın.

## 🎨 Özellikler

### Ana Ekran
- 4 kategori kartı: Meyveler, Sebzeler, İçecekler, Yemekler
- Glisemik indeks bilgilendirme kartı
- Gizli admin panel erişimi (5x logo tıklama)

### Kategori Ekranı  
- Kategorideki tüm gıdalar listelenir
- Her gıda için özet bilgi:
  - Şeker oranı
  - Glisemik indeks
  - Uygunluk durumu

### Detay Ekranı
- Gıdanın tam bilgileri
- Besin değerleri
- Detaylı açıklama
- Tüketim önerileri

### Admin Panel
- Yeni gıda ekleme formu
- Tüm alanlar doldurulabilir
- Veriler AsyncStorage'da saklanır
- Jürilere görünmez

## 🗂️ Veri Yapısı

```javascript
{
  id: "elma",
  kategori: "meyve",
  isim: "Elma",
  seker_orani: "15g",
  porsiyon: "1 orta boy (150g)",
  glisemik_indeks: 36,
  glisemik_seviye: "Düşük",
  durum: "uygun",
  durum_text: "Uygundur",
  aciklama: "...",
  oneriler: ["...", "..."]
}
```

## 🔧 Sorun Giderme

### Metro Bundler Hatası
```bash
npx expo start --clear
```

### Node Modules Sorunu
```bash
rm -rf node_modules package-lock.json
npm install
```

### Android Build Hatası
```bash
cd android
./gradlew clean
cd ..
npx expo prebuild --clean
```

## 📦 Bağımlılıklar

- **expo**: ~52.0.0
- **expo-router**: ~4.0.0 (Sayfa navigasyonu)
- **react-native**: 0.76.5
- **@react-native-async-storage/async-storage**: ~2.1.0 (Veri saklama)
- **react-native-gesture-handler**: ~2.20.0 (Dokunma etkileşimleri)

## 🎯 TÜBİTAK Sunum İpuçları

1. ✅ **Admin paneli gizli**: Jüriye göstermeyin
2. ✅ **Bilimsel veri vurgusu**: Verilerin kaynağını belirtin
3. ✅ **Kullanıcı dostu arayüz**: Renk kodlaması ve ikonlar
4. ✅ **Offline çalışma**: İnternet gerektirmez
5. ✅ **Genişletilebilir**: Admin panel ile yeni gıda eklenebilir

## 📞 Destek

Herhangi bir sorun için GitHub Issues kullanabilirsiniz:
https://github.com/yazilimcimumin/seker-metre/issues

---

**Başarılar dilerim! 🎓🍀**
