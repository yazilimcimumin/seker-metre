// Gıda veritabanı - TÜBİTAK Projesi için bilimsel kaynaklara dayanan veriler

export const foodDatabase = [
  // MEYVELER
  {
    id: 'elma',
    kategori: 'meyve',
    isim: 'Elma',
    seker_orani: '15g',
    porsiyon: '1 orta boy (150g)',
    glisemik_indeks: 36,
    glisemik_seviye: 'Düşük',
    durum: 'uygun',
    durum_text: 'Şeker Hastaları İçin Uygundur',
    aciklama: 'Elma, lif (pektin) açısından zengin olduğu için kan şekerini hızla yükseltmez. Şeker hastaları günde 1 adet orta boy elmayı, yanında bir miktar yoğurt veya 2-3 adet cevizle (kana karışma hızını daha da yavaşlatmak için) güvenle tüketebilir.',
    oneriler: [
      'Günde 1 orta boy elma tüketilebilir',
      'Yanında 2-3 ceviz ile tüketmek daha iyidir',
      'Kabuğuyla birlikte yenmesi önerilir (daha fazla lif)'
    ],
    renk: '#4CAF50'
  },
  {
    id: 'cilek',
    kategori: 'meyve',
    isim: 'Çilek',
    seker_orani: '4.9g',
    porsiyon: '1 porsiyon (100g / 7-8 adet)',
    glisemik_indeks: 41,
    glisemik_seviye: 'Düşük',
    durum: 'cok_uygun',
    durum_text: 'Yüksek Derecede Uygundur',
    aciklama: 'Şeker oranı en düşük ve antioksidan oranı en yüksek meyvelerdendir. Diyabet hastaları için mükemmel bir ara öğündür. Bir porsiyonu kan şekerinde ani dalgalanmalara yol açmaz.',
    oneriler: [
      'Günde 1-2 porsiyon güvenle tüketilebilir',
      'Ara öğün olarak idealdir',
      'Yoğurt ile birlikte çok sağlıklı bir tatlı alternatifidir'
    ],
    renk: '#E91E63'
  },
  {
    id: 'muz',
    kategori: 'meyve',
    isim: 'Muz',
    seker_orani: '14g',
    porsiyon: '1 orta boy (120g)',
    glisemik_indeks: 51,
    glisemik_seviye: 'Orta',
    durum: 'sinirli',
    durum_text: 'Sınırlı/Kontrollü Tüketilmeli',
    aciklama: 'Muz olgunlaştıkça içindeki nişasta şekere dönüşür ve glisemik indeksi yükselir. Şeker hastalarının tam olgunlaşmamış (hafif yeşil uçlu) küçük boy muzları tercih etmesi ve günde yarım veya en fazla 1 adet tüketmesi önerilir.',
    oneriler: [
      'Günde en fazla yarım veya 1 küçük boy muz',
      'Hafif yeşil uçlu, tam olgunlaşmamış olanlar tercih edilmeli',
      'Sabah kahvaltısında, öğle öncesi tüketilmeli'
    ],
    renk: '#FFC107'
  },
  {
    id: 'portakal',
    kategori: 'meyve',
    isim: 'Portakal',
    seker_orani: '12g',
    porsiyon: '1 orta boy (150g)',
    glisemik_indeks: 43,
    glisemik_seviye: 'Düşük',
    durum: 'uygun',
    durum_text: 'Kontrollü Şekilde Uygundur',
    aciklama: 'Portakal C vitamini açısından zengindir ve lif içeriği sayesinde kan şekerini yavaş yükseltir. Ancak meyvenin kendisi tüketilmelidir, suyu değil.',
    oneriler: [
      'Günde 1 orta boy portakal tüketilebilir',
      'Meyvenin kendisini yiyin, suyunu değil',
      'Öğünler arasında ara öğün olarak idealdir'
    ],
    renk: '#FF9800'
  },

  // SEBZELER
  {
    id: 'brokoli',
    kategori: 'sebze',
    isim: 'Brokoli',
    seker_orani: '1.7g',
    porsiyon: '100g (çiğ/haşlanmış)',
    glisemik_indeks: 15,
    glisemik_seviye: 'Çok Düşük',
    durum: 'cok_uygun',
    durum_text: 'Mükemmel Şekilde Uygundur',
    aciklama: 'Neredeyse hiç şeker içermez. İçindeki "sulforafan" bileşiği sayesinde damar sağlığını korur ve diyabetin yarattığı hasarları azaltmaya yardımcı olur. Sınır olmadan tüketilebilir.',
    oneriler: [
      'Sınırsız miktarda tüketilebilir',
      'Haşlama veya buharda pişirme önerilir',
      'Her öğünde bulundurulması idealdir'
    ],
    renk: '#4CAF50'
  },
  {
    id: 'havuc',
    kategori: 'sebze',
    isim: 'Havuç',
    seker_orani: '4.7g',
    porsiyon: '100g (çiğ)',
    glisemik_indeks: 39,
    glisemik_seviye: 'Düşük (Çiğ)',
    durum: 'sinirli',
    durum_text: 'Kontrollü Tüketilmeli (Özellikle Pişmişse)',
    aciklama: 'Çiğ havuç lifli yapısıyla şeker hastaları için güvenlidir. Ancak havuç pişirildiğinde hücre duvarları yıkılır ve glisemik indeksi hızla yükselir (GI: 85 civarı). Bu yüzden şeker hastaları havucu çiğ tüketmeli, yemeklerin içinde pişen havucu ise az miktarda yemelidir.',
    oneriler: [
      'Çiğ olarak salatalarda tüketilebilir',
      'Pişmiş havuç az miktarda yenmeli',
      'Haşlama veya kızartma yerine çiğ tercih edilmeli'
    ],
    renk: '#FF5722'
  },
  {
    id: 'ispanak',
    kategori: 'sebze',
    isim: 'Ispanak',
    seker_orani: '0.4g',
    porsiyon: '100g',
    glisemik_indeks: 15,
    glisemik_seviye: 'Çok Düşük',
    durum: 'cok_uygun',
    durum_text: 'Mükemmel Şekilde Uygundur',
    aciklama: 'Demir ve magnezyum açısından zengindir. Kan şekerini düzenlemeye yardımcı olur ve insülin direncini azaltabilir.',
    oneriler: [
      'Sınırsız miktarda tüketilebilir',
      'Yemeklerde ve salatalarda bolca kullanılabilir',
      'Demir emilimini artırmak için C vitamini kaynakları ile tüketin'
    ],
    renk: '#4CAF50'
  },

  // İÇECEKLER
  {
    id: 'ayran',
    kategori: 'icecek',
    isim: 'Ayran',
    seker_orani: '2.5-3g',
    porsiyon: '1 su bardağı (200ml)',
    glisemik_indeks: 15,
    glisemik_seviye: 'Çok Düşük',
    durum: 'cok_uygun',
    durum_text: 'Mükemmel Şekilde Uygundur',
    aciklama: 'İlave şeker içermez (sadece sütün doğal laktoz şekeri). Protein ve yağ içeriği sayesinde kan şekerini dengeler. Yemeklerin yanında şekerli veya asitli içecekler yerine diyabetliler için en sağlıklı alternatiftir.',
    oneriler: [
      'Yemeklerin yanında güvenle içilebilir',
      'Ev yapımı, tuzsuz ayran tercih edilmeli',
      'Günde 2-3 bardak tüketilebilir'
    ],
    renk: '#FFFFFF'
  },
  {
    id: 'portakal_suyu',
    kategori: 'icecek',
    isim: 'Portakal Suyu (Taze Sıkılmış)',
    seker_orani: '20-24g',
    porsiyon: '1 bardak (200ml)',
    glisemik_indeks: 65,
    glisemik_seviye: 'Yüksek',
    durum: 'uygun_degil',
    durum_text: 'Uygun Değildir',
    aciklama: 'Meyvenin kendisini yemek lifli olduğu için sağlıklıdır ancak suyu sıkıldığında tüm lifler gider ve geriye saf meyve şekeri (fruktoz) kalır. Kan şekerini anında fırlatır. Şeker hastaları ani şeker düşmesi (hipoglisemi) yaşamadığı sürece uzak durmalıdır.',
    oneriler: [
      'Meyve suyundan kaçınılmalı',
      'Meyvenin kendisi tüketilmeli',
      'Sadece hipoglisemi durumunda acil müdahale için içilebilir'
    ],
    renk: '#FF5722'
  },
  {
    id: 'su',
    kategori: 'icecek',
    isim: 'Su',
    seker_orani: '0g',
    porsiyon: 'Sınırsız',
    glisemik_indeks: 0,
    glisemik_seviye: 'Yok',
    durum: 'cok_uygun',
    durum_text: 'En İdeal İçecek',
    aciklama: 'Su, şeker hastalarının en güvenli ve en gerekli içeceğidir. Böbreklerin şekeri atmasına yardımcı olur ve vücudu hidrasyonda tutar.',
    oneriler: [
      'Günde en az 2-2.5 litre su içilmeli',
      'Öğünler arasında bol su tüketimi önemlidir',
      'Şekerli içecekler yerine her zaman su tercih edilmeli'
    ],
    renk: '#2196F3'
  },

  // YEMEKLER
  {
    id: 'pirinc_pilavi',
    kategori: 'yemek',
    isim: 'Pirinç Pilavı (Beyaz Pirinç)',
    seker_orani: '0.1g',
    porsiyon: '1 porsiyon (100g / 4-5 kaşık)',
    glisemik_indeks: 73,
    glisemik_seviye: 'Çok Yüksek',
    durum: 'uygun_degil',
    durum_text: 'Uygun Değildir / Çok Nadir Tüketilmeli',
    aciklama: 'Beyaz pirinç glisemik indeksi en yüksek gıdalardan biridir. Vücuda girdiğinde tıpkı toz şeker yemiş gibi kan şekerini hızla yükseltir. Şeker hastalarının pirinç yerine Bulgur Pilavı veya Karabuğday (Greçka) tercih etmesi gerekir.',
    oneriler: [
      'Mümkünse hiç tüketilmemeli',
      'Bulgur pilavı ile değiştirilmeli',
      'Eğer yenecekse çok küçük porsiyon ve bol sebze ile'
    ],
    renk: '#F44336'
  },
  {
    id: 'mercimek_yemegi',
    kategori: 'yemek',
    isim: 'Yeşil Mercimek Yemeği',
    seker_orani: '1-2g',
    porsiyon: '1 porsiyon (150g)',
    glisemik_indeks: 25,
    glisemik_seviye: 'Çok Düşük',
    durum: 'cok_uygun',
    durum_text: 'Mükemmel Şekilde Uygundur',
    aciklama: 'Bitkisel protein ve inanılmaz yüksek lif içerir. Karbonhidrat içermesine rağmen kan şekerini hiç yükseltmez, aksine uzun süre tok tutarak şekerin dengede kalmasını sağlar. Diyabet hastalarının ana öğünleri için idealdir.',
    oneriler: [
      'Haftada 3-4 kez güvenle tüketilebilir',
      'Ana öğünlerde tercih edilmeli',
      'Yanında salata ile birlikte mükemmel bir öğündür'
    ],
    renk: '#4CAF50'
  },
  {
    id: 'bulgur_pilavi',
    kategori: 'yemek',
    isim: 'Bulgur Pilavı',
    seker_orani: '0.8g',
    porsiyon: '1 porsiyon (100g)',
    glisemik_indeks: 48,
    glisemik_seviye: 'Düşük',
    durum: 'uygun',
    durum_text: 'Beyaz Pirince Göre Çok Daha Uygundur',
    aciklama: 'Bulgur, tam tahıl olduğu için lif oranı yüksektir ve beyaz pirince göre çok daha yavaş sindirilerek kan şekerini yavaş yükseltir. Şeker hastaları için pirinç yerine en iyi alternatiftir.',
    oneriler: [
      'Beyaz pirinç yerine her zaman bulgur tercih edilmeli',
      'Günde 1 porsiyon güvenle tüketilebilir',
      'Sebzeli bulgur pilavı idealdir'
    ],
    renk: '#8BC34A'
  },
  {
    id: 'tavuk_gogsu',
    kategori: 'yemek',
    isim: 'Izgara Tavuk Göğsü',
    seker_orani: '0g',
    porsiyon: '150g',
    glisemik_indeks: 0,
    glisemik_seviye: 'Yok',
    durum: 'cok_uygun',
    durum_text: 'Protein Kaynağı - Mükemmel',
    aciklama: 'Yağsız protein kaynağıdır. Şeker içermez ve tokluk hissi verir. Kan şekerini yükseltmez. Şeker hastaları için ideal bir ana yemek protein kaynağıdır.',
    oneriler: [
      'Haftada 4-5 kez güvenle tüketilebilir',
      'Izgara, fırın veya haşlama şeklinde pişirilmeli',
      'Kızartma ve soslu yemeklerden kaçınılmalı'
    ],
    renk: '#FFF9C4'
  }
];

// Kategoriye göre filtreleme fonksiyonu
export const getByCategory = (kategori) => {
  return foodDatabase.filter(item => item.kategori === kategori);
};

// ID'ye göre tekil veri alma
export const getById = (id) => {
  return foodDatabase.find(item => item.id === id);
};

// Kategorilerin listesi
export const categories = [
  { id: 'meyve', name: 'Meyveler', icon: '🍎', color: '#E8F5E9' },
  { id: 'sebze', name: 'Sebzeler', icon: '🥦', color: '#E3F2FD' },
  { id: 'icecek', name: 'İçecekler', icon: '☕', color: '#FFF3E0' },
  { id: 'yemek', name: 'Yemekler', icon: '🍲', color: '#F3E5F5' }
];
