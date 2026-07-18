const fs = require('fs');
const path = require('path');

// SVG icon oluştur
const createIcon = (size, filename) => {
  const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4CAF50;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#81C784;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#grad1)" rx="30"/>
  <text x="50%" y="45%" font-size="${size * 0.4}" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial, sans-serif">ŞM</text>
  <text x="50%" y="70%" font-size="${size * 0.15}" text-anchor="middle" fill="white" font-family="Arial, sans-serif" opacity="0.9">Şeker Metre</text>
</svg>`;
  
  const assetsDir = path.join(__dirname, '..', 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(assetsDir, filename), svg);
  console.log(`✅ ${filename} oluşturuldu`);
};

// Splash screen oluştur
const createSplash = () => {
  const svg = `<svg width="1242" height="2436" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#E8F5E9;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#C8E6C9;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1242" height="2436" fill="url(#bgGrad)"/>
  <circle cx="621" cy="1000" r="200" fill="#4CAF50" opacity="0.2"/>
  <circle cx="621" cy="1000" r="150" fill="#4CAF50"/>
  <text x="621" y="960" font-size="120" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial, sans-serif">ŞM</text>
  <text x="621" y="1350" font-size="80" font-weight="bold" text-anchor="middle" fill="#2E7D32" font-family="Arial, sans-serif">Şeker Metre</text>
  <text x="621" y="1450" font-size="40" text-anchor="middle" fill="#66BB6A" font-family="Arial, sans-serif">Diyabet Dostu Gıda Rehberi</text>
</svg>`;
  
  const assetsDir = path.join(__dirname, '..', 'assets');
  fs.writeFileSync(path.join(assetsDir, 'splash.svg'), svg);
  console.log('✅ splash.svg oluşturuldu');
};

// Tüm iconları oluştur
createIcon(1024, 'icon.svg');
createIcon(1024, 'adaptive-icon.svg');
createIcon(48, 'favicon.svg');
createSplash();

console.log('\n✨ Tüm iconlar başarıyla oluşturuldu!');
console.log('Not: SVG formatı çoğu durumda çalışır. PNG istiyorsanız online converter kullanabilirsiniz.');
