# Assets Klasörü

Bu klasöre aşağıdaki dosyaları eklemeniz gerekiyor:

## Gerekli Dosyalar

1. **icon.png** (1024x1024 px)
   - Uygulama ikonu
   - PNG formatında
   - Şeffaf arka plan veya beyaz arka plan

2. **splash.png** (1242x2436 px)
   - Açılış ekranı
   - Yeşil tema (#E8F5E9 arka plan önerilir)
   - Ortada Şeker Metre logosu

3. **adaptive-icon.png** (1024x1024 px)
   - Android adaptive icon
   - Ortada 792x792 px'lik güvenli alan

4. **favicon.png** (48x48 px)
   - Web favicon

## Hızlı Çözüm

Eğer bu dosyalar yoksa, Expo başlangıç ekranlarını kullanacaktır. 

Alternatif olarak https://www.figma.com veya Canva kullanarak basit ikonlar oluşturabilirsiniz:
- Yeşil arka plan (#4CAF50)
- Beyaz 🩺 veya "ŞM" harfleri
- Medikal/sağlık teması

## Otomatik İkon Oluşturucu

```bash
# Expo ile otomatik icon oluşturma
npx expo install expo-app-icon-generator
```
