# 🩺 Şeker Metre - Proje Özeti

## 📋 Proje Hakkında

**Şeker Metre**, şeker hastalarının (diyabet) güvenle tüketebilecekleri gıdaları öğrenmelerine yardımcı olan, bilimsel verilere dayanan bir mobil uygulamadır. TÜBİTAK projesi kapsamında geliştirilmiştir.

## ✨ Temel Özellikler

### 1. 4 Ana Kategori
- 🍎 **Meyveler**: Elma, çilek, muz, portakal
- 🥦 **Sebzeler**: Brokoli, havuç, ıspanak
- ☕ **İçecekler**: Ayran, portakal suyu, su
- 🍲 **Yemekler**: Mercimek, bulgur pilavı, pirinç pilavı, tavuk göğsü

### 2. Bilimsel Veri Gösterimi
Her gıda için:
- **Şeker Oranı** (gram)
- **Glisemik İndeks** (0-100 skala)
- **Glisemik Seviye** (Düşük/Orta/Yüksek)
- **Diyabet Uygunluk Durumu** (✅❌⚠️)
- **Detaylı Açıklama**
- **Tüketim Önerileri**

### 3. Renk Kodlaması
- 🟢 **Yeşil** (GI: 0-55): Güvenle tüketilebilir
- 🟡 **Sarı** (GI: 56-69): Dikkatli tüketilmeli
- 🔴 **Kırmızı** (GI: 70+): Kaçınılmalı

### 4. Gizli Admin Panel 🔐
- Logo'ya 3 saniye içinde 5 kez tıklama ile erişim
- Yeni gıda ekleme özelliği
- Tüm form alanları (kategori, şeker oranı, GI, açıklama, öneriler)
- Veriler cihazda yerel olarak saklanır (AsyncStorage)
- Jüriye gösterilmez

## 🎨 Tasarım

### Renk Paleti
- **Ana Renk**: #4CAF50 (Medikal Yeşil)
- **Arka Plan**: #FAFAFA (Soft Beyaz)
- **Vurgu**: #2196F3 (Mavi)
- **Uyarı**: #FFC107 (Sarı), #F44336 (Kırmızı)

### UX Prensipleri
- Minimalist ve temiz arayüz
- Büyük, okunabilir fontlar
- Dokunmatik dostu butonlar
- Renk kodlu bilgi kartları
- Sezgisel navigasyon

## 🏗️ Teknik Mimari

### Frontend
- **Framework**: React Native + Expo
- **Navigasyon**: Expo Router (file-based)
- **State Management**: React Hooks
- **Veri Saklama**: AsyncStorage (local)

### Veri Yapısı
```
foodDatabase (Array)
├── Varsayılan Veriler (foodData.js)
└── Kullanıcı Eklenen Veriler (AsyncStorage)
```

### Ekran Yapısı
```
App
├── index.js (Ana Sayfa)
│   └── 4 Kategori Kartı
├── category.js (Kategori Listesi)
│   └── Gıda Kartları
├── detail.js (Gıda Detayı)
│   ├── Besin Değerleri
│   ├── Açıklama
│   └── Öneriler
└── admin.js (Gizli Panel)
    └── Yeni Gıda Formu
```

## 📊 Örnek Veriler

### Çok Uygun (GI < 40)
- Çilek (GI: 41)
- Brokoli (GI: 15)
- Ayran (GI: 15)
- Mercimek (GI: 25)

### Sınırlı/Dikkatli (GI 40-69)
- Muz (GI: 51)
- Havuç-çiğ (GI: 39)
- Bulgur (GI: 48)

### Uygun Değil (GI > 70)
- Portakal Suyu (GI: 65)
- Pirinç Pilavı (GI: 73)

## 🚀 Deployment

### GitHub Repository
**URL**: https://github.com/yazilimcimumin/seker-metre

### Otomatik Build (GitHub Actions)
- Her push'ta otomatik tetiklenir
- Android APK oluşturur
- Node.js 20, Java 17 kullanır
- Artifacts olarak indirilir

### Build Süresi
~10-15 dakika (GitHub Actions üzerinde)

## 📱 Kullanıcı Akışı

### Normal Kullanıcı
1. Uygulamayı aç
2. Kategori seç (Meyve/Sebze/İçecek/Yemek)
3. Gıda seç
4. Detaylı bilgileri oku
5. Tüketim kararını ver

### Admin (Hoca/Geliştirici)
1. Ana ekranda logo'ya 5 kez tıkla
2. Admin panel açılır
3. Yeni gıda formunu doldur
4. Kaydet
5. Ana ekrana dön → Yeni gıda listelerde görünür

## 🎯 TÜBİTAK Değerlendirme Kriterleri

### ✅ Güçlü Yönler
1. **Bilimsel Veri**: Amerikan Diyabet Derneği kaynaklı
2. **Kullanıcı Dostu**: Renk kodlaması ve ikonlar
3. **Offline**: İnternet gerektirmez
4. **Genişletilebilir**: Admin panel ile yeni veri eklenebilir
5. **Medikal Tema**: Sağlık uygulaması görünümü
6. **Pratik**: Günlük hayatta kullanılabilir

### 🎓 Sunum İpuçları
- Diyabet istatistiklerini vurgulayın (Türkiye'de 7+ milyon)
- Glisemik indeks kavramını açıklayın
- Renk kodlamasının önemini gösterin
- Canlı demo yapın (gıda ekleme + arama)
- Admin paneli **göstermeyin** (jüri karşısında)

## 📈 Gelecek Geliştirmeler

1. **Favori Gıdalar**: Kullanıcı favori listesi
2. **Günlük Takip**: Günlük tüketim kaydı
3. **Kan Şekeri Kayıt**: Manuel şeker ölçümü girişi
4. **Bildirimler**: Öğün hatırlatıcıları
5. **PDF Export**: Gıda raporu indirme
6. **Çoklu Dil**: İngilizce desteği
7. **Cloud Sync**: Firebase entegrasyonu

## 📞 İletişim

- **GitHub**: https://github.com/yazilimcimumin/seker-metre
- **Issues**: Bug bildirimi ve öneriler için

---

## 📝 Lisans ve Yasal

Bu proje TÜBİTAK yarışması kapsamında geliştirilmiştir. Tüm veriler bilimsel kaynaklardan alınmıştır ve bilgilendirme amaçlıdır. **Tıbbi tavsiye yerine geçmez.**

---

**Projeyi geliştirdiğiniz için teşekkürler! Başarılar dilerim! 🎓🍀**
