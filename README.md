# 🩺 Şeker Metre - Diyabet Dostu Gıda Rehberi

TÜBİTAK Projesi için geliştirilmiş, şeker hastalarının güvenle tüketebilecekleri gıdaları öğrenmelerine yardımcı olan mobil uygulama.

## 📱 Özellikler

- ✅ 4 Ana Kategori: Meyveler, Sebzeler, İçecekler, Yemekler
- 📊 Bilimsel kaynaklara dayanan glisemik indeks verileri
- 🍎 Her gıda için detaylı bilgiler:
  - Şeker oranı
  - Glisemik indeks değeri
  - Diyabet uygunluk durumu
  - Tüketim önerileri
- 🔐 Gizli admin paneli (5 kez logo tıklama)
- 💾 Yerel veri depolama (AsyncStorage)
- 🎨 Kullanıcı dostu, medikal tema

## 🚀 Kurulum

### Gereksinimler
- Node.js (v18 veya üzeri)
- npm veya yarn
- Expo CLI
- Android Studio (Android için)
- Xcode (iOS için - sadece macOS)

### Yerel Geliştirme

```bash
# Bağımlılıkları yükle
cd SekerMetre
npm install

# Uygulamayı başlat
npx expo start

# Android'de çalıştır
npx expo start --android

# iOS'ta çalıştır (sadece macOS)
npx expo start --ios
```

## 🔨 APK Build (GitHub Actions)

Projeyi GitHub'a push ettiğinizde otomatik olarak APK oluşturulur.

### Manuel Build

```bash
# EAS CLI kurulumu
npm install -g eas-cli

# EAS'e giriş yap
eas login

# Build profili oluştur
eas build:configure

# Android APK build
eas build --platform android --profile preview
```

## 🔐 Admin Panel Kullanımı

1. Ana ekranda logo (🩺) üzerine **3 saniye içinde 5 kez** tıklayın
2. Gizli admin paneli açılacak
3. Yeni gıda ekleyebilirsiniz:
   - Kategori seçimi
   - Gıda bilgileri (isim, şeker oranı, GI değeri)
   - Detaylı açıklama
   - Tüketim önerileri
4. Veriler cihazda yerel olarak saklanır

## 📂 Proje Yapısı

```
SekerMetre/
├── app/                    # Uygulama ekranları
│   ├── _layout.js         # Ana layout
│   ├── index.js           # Ana sayfa
│   ├── category.js        # Kategori listesi
│   ├── detail.js          # Gıda detay sayfası
│   └── admin.js           # Gizli admin panel
├── data/                   # Veri katmanı
│   ├── foodData.js        # Varsayılan gıda veritabanı
│   └── storageHelper.js   # AsyncStorage yardımcıları
├── .github/
│   └── workflows/
│       └── build-android.yml  # GitHub Actions workflow
├── app.json               # Expo konfigürasyonu
├── eas.json              # EAS Build konfigürasyonu
└── package.json          # Bağımlılıklar
```

## 📊 Veri Kaynağı

Uygulamada kullanılan glisemik indeks ve şeker oranı verileri bilimsel kaynaklara dayanmaktadır:
- Amerikan Diyabet Derneği (ADA)
- Glisemik İndeks Vakfı
- Türkiye Diyabet Vakfı

## ⚠️ Önemli Notlar

- Bu uygulama sadece bilgilendirme amaçlıdır
- Doktor tavsiyelerinin yerine geçmez
- Bireysel diyabet yönetimi için mutlaka sağlık uzmanına danışılmalıdır

## 🎨 Tasarım

- **Renk Paleti:** Medikal yeşil (#4CAF50), Soft mavi, Temiz beyaz
- **Tipografi:** San-serif, okunabilir fontlar
- **UX:** Minimalist, kullanımı kolay arayüz

## 📝 Lisans

Bu proje TÜBİTAK projesi kapsamında geliştirilmiştir.

## 👥 Geliştirici

Hocam için özel olarak hazırlanmıştır 🎓

---

**Not:** Jüri sunumu sırasında admin panelinin gizli olduğunu unutmayın! Logo'ya 5 kez tıklamadan kimse erişemez.
