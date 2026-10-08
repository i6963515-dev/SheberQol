import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, ScrollView, TouchableOpacity, 
  TextInput, Image, SafeAreaView, StatusBar 
} from 'react-native';
import * as Speech from 'expo-speech';
import { 
  Volume2, VolumeX, Mic, Eye, EyeOff, Sparkles, 
  ShoppingBag, Search, User, CheckCircle2, Code, Smartphone, Database, Cpu 
} from 'lucide-react-native';

const INITIAL_PRODUCTS = [
  {
    id: 1,
    title: 'Қазақы ұлттық оюлы киіз ноутбук қабы',
    artisan: 'Серік Қалиев',
    city: 'Орал қ.',
    disability: 'Көру қабілеті I топ',
    price: 12500,
    category: 'Киіз бұйымдары',
    audioDesc: 'Биіктігі 28 сантиметр, ені 38 сантиметр сұр түсті киізден жасалған ноутбук қабы. Ортасында көк түсті ою-өрнегі бар.',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Ағаштан ойылған органайзер мен тақта',
    artisan: 'Анна Васильева',
    city: 'Атырау қ.',
    disability: 'Қозғалыс аппараты шектелген',
    price: 8500,
    category: 'Ағаш бұйымдары',
    audioDesc: 'Табиғи емен ағашынан жасалған асүйлік кесу тақтасы. Шеттері тегістеліп, табиғи ара балы балауызымен өңделген.',
    imageUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Керамикалық қазақы кесе жиынтығы',
    artisan: 'Нұрлан Ахметов',
    city: 'Ақтөбе қ.',
    disability: 'Көру қабілеті II топ',
    price: 15000,
    category: 'Керамика',
    audioDesc: 'Төрт дана сазкесе. Сияқты көгілдір глазурьмен қапталған, ұстағанда бедерлі оюлары сезіледі.',
    imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=600&auto=format&fit=crop',
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('marketplace');
  const [highContrast, setHighContrast] = useState(true);
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(true);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');

  // AI Camera Simulator State
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [aiDetectedText, setAiDetectedText] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');

  // Анық қазақша дауыс баптауы
  const speak = (text) => {
    if (!screenReaderEnabled) return;
    Speech.stop();
    Speech.speak(text, { 
      language: 'kk-KZ', 
      pitch: 1.0, 
      rate: 0.85 // Баяуырақ әрі анық сөйлеу үшін
    });
  };

  const simulateAiCamera = () => {
    setAiAnalyzing(true);
    speak('Сурет түсірілуде. Жасанды интеллект өнімді талдап жатыр, күте тұрыңыз.');

    setTimeout(() => {
      const generatedDesc = 'Суретте: Табиғи қоңыр былғарыдан қолмен тігілген дәстүрлі Торсық бұйымы. Бедерлі ұлттық өрнегі бар, баулары мықты ширатылған.';
      const generatedImg = 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop';
      
      setCapturedImage(generatedImg);
      setAiDetectedText(generatedDesc);
      setNewTitle('Қолдан тігілген Былғары Торсық');
      setNewPrice('18000');
      setAiAnalyzing(false);
      speak(`Жасанды интеллект бұйымды анықтады: Қолдан тігілген Былғары Торсық. Бағасы 18 000 теңге.`);
    }, 3000);
  };

  const handlePublishProduct = () => {
    if (!newTitle) return;
    const newProd = {
      id: Date.now(),
      title: newTitle,
      artisan: 'Сіз (Шебер)',
      city: 'Орал қ.',
      disability: 'Көру қабілеті шектелген шебер',
      price: Number(newPrice) || 10000,
      category: 'Былғары бұйымдары',
      audioDesc: aiDetectedText,
      imageUrl: capturedImage || 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop',
    };
    setProducts([newProd, ...products]);
    setActiveTab('marketplace');
    speak('Құттықтаймыз! Тауарыңыз сәтті жарияланды және маркетплейске қосылды.');
    setCapturedImage(null);
    setAiDetectedText('');
  };

  const theme = {
    bg: highContrast ? '#000000' : '#0f172a',
    cardBg: highContrast ? '#18181b' : '#1e293b',
    text: highContrast ? '#facc15' : '#ffffff',
    subText: highContrast ? '#fef08a' : '#94a3b8',
    border: highContrast ? '#facc15' : '#334155',
    btnPrimaryBg: highContrast ? '#facc15' : '#4f46e5',
    btnPrimaryText: highContrast ? '#000000' : '#ffffff',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <View style={styles.headerTitleRow}>
          <Eye color={theme.text} size={28} />
          <Text style={[styles.appTitle, { color: theme.text }]}>ШеберҚол</Text>
        </View>

        <View style={styles.toggleRow}>
          <TouchableOpacity 
            onPress={() => {
              const next = !screenReaderEnabled;
              setScreenReaderEnabled(next);
              if (next) speak('Экрандық оқырман қосылды.');
            }}
            style={[styles.iconBtn, { borderColor: theme.border }]}
          >
            {screenReaderEnabled ? <Volume2 color={theme.text} size={20} /> : <VolumeX color="#94a3b8" size={20} />}
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => {
              setHighContrast(!highContrast);
              speak(`Жоғары контраст режимі ${!highContrast ? 'қосылды' : 'өшірілді'}`);
            }}
            style={[styles.iconBtn, { borderColor: theme.border }]}
          >
            {highContrast ? <Eye color={theme.text} size={20} /> : <EyeOff color="#94a3b8" size={20} />}
          </TouchableOpacity>
        </View>
      </View>

      {/* Navigation Tabs */}
      <View style={[styles.tabContainer, { borderBottomColor: theme.border }]}>
        <TouchableOpacity 
          onPress={() => { setActiveTab('marketplace'); speak('Маркетплейс каталогы ашылды.'); }}
          style={[styles.tab, activeTab === 'marketplace' && { borderBottomColor: theme.text, borderBottomWidth: 3 }]}
        >
          <ShoppingBag color={activeTab === 'marketplace' ? theme.text : '#94a3b8'} size={20} />
          <Text style={[styles.tabText, { color: activeTab === 'marketplace' ? theme.text : '#94a3b8' }]}>Каталог</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => { setActiveTab('ai-upload'); speak('Жасанды интеллект арқылы тауар қосу бөлімі.'); }}
          style={[styles.tab, activeTab === 'ai-upload' && { borderBottomColor: theme.text, borderBottomWidth: 3 }]}
        >
          <Sparkles color={activeTab === 'ai-upload' ? theme.text : '#94a3b8'} size={20} />
          <Text style={[styles.tabText, { color: activeTab === 'ai-upload' ? theme.text : '#94a3b8' }]}>ЖИ Фото</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => { setActiveTab('tech-stack'); speak('Техникалық стек бөлімі.'); }}
          style={[styles.tab, activeTab === 'tech-stack' && { borderBottomColor: theme.text, borderBottomWidth: 3 }]}
        >
          <Code color={activeTab === 'tech-stack' ? theme.text : '#94a3b8'} size={20} />
          <Text style={[styles.tabText, { color: activeTab === 'tech-stack' ? theme.text : '#94a3b8' }]}>Стек</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Marketplace Tab */}
        {activeTab === 'marketplace' && (
          <View>
            <View style={[styles.searchBox, { borderColor: theme.border, backgroundColor: theme.cardBg }]}>
              <Search color={theme.text} size={20} />
              <TextInput
                placeholder="Іздеу (киіз, ағаш, кесе)..."
                placeholderTextColor={highContrast ? '#fef08a' : '#94a3b8'}
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={[styles.searchInput, { color: theme.text }]}
              />
            </View>

            {products
              .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
              .map(product => (
                <View key={product.id} style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
                  
                  {/* ИИ Картинкасы */}
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
                    <View style={[styles.categoryBadge, { backgroundColor: theme.bg }]}>
                      <Text style={[styles.categoryBadgeText, { color: theme.text }]}>{product.category}</Text>
                    </View>
                  </View>

                  <Text style={[styles.productTitle, { color: theme.text }]}>{product.title}</Text>
                  <Text style={[styles.productPrice, { color: theme.text }]}>{product.price.toLocaleString()} ₸</Text>
                  
                  <View style={[styles.artisanBox, { borderColor: theme.border }]}>
                    <User color={theme.text} size={16} />
                    <Text style={[styles.artisanText, { color: theme.subText }]}>{product.artisan} • {product.disability}</Text>
                  </View>

                  <Text style={[styles.audioDesc, { color: theme.subText }]}>
                    🎧 {product.audioDesc}
                  </Text>

                  <TouchableOpacity 
                    onPress={() => speak(`Тауар сипаттамасы: ${product.audioDesc}`)}
                    style={[styles.actionBtnSecondary, { borderColor: theme.border }]}
                  >
                    <Volume2 color={theme.text} size={18} />
                    <Text style={[styles.btnTextSecondary, { color: theme.text }]}>Қазақша тыңдау</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    onPress={() => speak(`${product.title} себетке қосылды. Бағасы ${product.price} теңге.`)}
                    style={[styles.actionBtnPrimary, { backgroundColor: theme.btnPrimaryBg }]}
                  >
                    <ShoppingBag color={theme.btnPrimaryText} size={18} />
                    <Text style={[styles.btnTextPrimary, { color: theme.btnPrimaryText }]}>Сатып Алу (Kaspi)</Text>
                  </TouchableOpacity>
                </View>
            ))}
          </View>
        )}

        {/* AI Camera Tab */}
        {activeTab === 'ai-upload' && (
          <View style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>ЖИ Фото-Көмекші</Text>
            <Text style={[styles.subText, { color: theme.subText, marginBottom: 15 }]}>
              Камера бұйымды түсіреді. Жасанды интеллект суретті танып, сипаттамасын авто-жазады.
            </Text>

            <View style={[styles.cameraView, { borderColor: theme.border }]}>
              {aiAnalyzing ? (
                <Text style={[styles.cameraText, { color: theme.text }]}>⏳ ЖИ Талдауда...</Text>
              ) : capturedImage ? (
                <Image source={{ uri: capturedImage }} style={styles.capturedPreview} />
              ) : (
                <View style={{ alignItems: 'center' }}>
                  <Smartphone color={theme.text} size={48} />
                  <Text style={{ color: theme.subText, marginTop: 8, fontSize: 12 }}>Камера белсенді</Text>
                </View>
              )}
            </View>

            {!capturedImage && (
              <TouchableOpacity 
                onPress={simulateAiCamera}
                disabled={aiAnalyzing}
                style={[styles.actionBtnPrimary, { backgroundColor: theme.btnPrimaryBg }]}
              >
                <Mic color={theme.btnPrimaryText} size={20} />
                <Text style={[styles.btnTextPrimary, { color: theme.btnPrimaryText }]}>📸 Бұйымды Фотоға Түсіру</Text>
              </TouchableOpacity>
            )}

            {capturedImage && (
              <View style={{ marginTop: 15 }}>
                <Text style={[styles.audioDesc, { color: theme.subText, marginBottom: 10 }]}>
                  ✨ ЖИ Жазған сипаттама: {aiDetectedText}
                </Text>

                <Text style={[styles.inputLabel, { color: theme.text }]}>Бұйым атауы:</Text>
                <TextInput 
                  value={newTitle} 
                  onChangeText={setNewTitle}
                  style={[styles.input, { color: theme.text, borderColor: theme.border }]} 
                />

                <Text style={[styles.inputLabel, { color: theme.text }]}>Бағасы (₸):</Text>
                <TextInput 
                  value={newPrice} 
                  keyboardType="numeric"
                  onChangeText={setNewPrice}
                  style={[styles.input, { color: theme.text, borderColor: theme.border }]} 
                />

                <TouchableOpacity 
                  onPress={handlePublishProduct}
                  style={[styles.actionBtnPrimary, { backgroundColor: theme.btnPrimaryBg, marginTop: 15 }]}
                >
                  <CheckCircle2 color={theme.btnPrimaryText} size={20} />
                  <Text style={[styles.btnTextPrimary, { color: theme.btnPrimaryText }]}>Маркетплейске Жариялау</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {/* Tech Stack Tab */}
        {activeTab === 'tech-stack' && (
          <View style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>IT Архитектура</Text>
            
            <View style={styles.techItem}>
              <Smartphone color={theme.text} size={24} />
              <Text style={[styles.techText, { color: theme.subText }]}>1. React Native / Expo (iOS & Android)</Text>
            </View>

            <View style={styles.techItem}>
              <Volume2 color={theme.text} size={24} />
              <Text style={[styles.techText, { color: theme.subText }]}>2. expo-speech (Қазақша TTS арнайы дауысы)</Text>
            </View>

            <View style={styles.techItem}>
              <Cpu color={theme.text} size={24} />
              <Text style={[styles.techText, { color: theme.subText }]}>3. Gemini Vision API (Авто-сипаттау модуль)</Text>
            </View>

            <View style={styles.techItem}>
              <Database color={theme.text} size={24} />
              <Text style={[styles.techText, { color: theme.subText }]}>4. Firebase / Kaspi Pay Интеграциясы</Text>
            </View>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1 },
  headerTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  appTitle: { fontSize: 22, fontWeight: '900' },
  toggleRow: { flexDirection: 'row', gap: 8 },
  iconBtn: { padding: 8, borderWidth: 1, borderRadius: 8 },
  
  tabContainer: { flexDirection: 'row', borderBottomWidth: 1 },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 6 },
  tabText: { fontWeight: 'bold', fontSize: 13 },

  scrollContent: { padding: 16 },
  searchBox: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, borderWidth: 1, borderRadius: 12, marginBottom: 16 },
  searchInput: { flex: 1, paddingVertical: 12, paddingHorizontal: 8, fontWeight: 'bold' },

  card: { borderWidth: 2, borderRadius: 16, padding: 16, marginBottom: 16 },
  
  imageContainer: { width: '100%', height: 180, borderRadius: 12, overflow: 'hidden', marginBottom: 12, relative: 'relative' },
  productImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  categoryBadge: { position: 'absolute', top: 8, left: 8, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  categoryBadgeText: { fontSize: 10, fontWeight: 'bold' },

  productTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  productPrice: { fontSize: 20, fontWeight: '900', marginBottom: 8 },
  artisanBox: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  artisanText: { fontSize: 12, fontWeight: 'bold' },
  audioDesc: { fontSize: 12, fontStyle: 'italic', marginBottom: 12, lineHeight: 18 },

  actionBtnPrimary: { padding: 14, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 8 },
  actionBtnSecondary: { padding: 12, borderRadius: 12, borderWidth: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 8 },
  btnTextPrimary: { fontWeight: '900', fontSize: 15 },
  btnTextSecondary: { fontWeight: 'bold', fontSize: 14 },

  sectionTitle: { fontSize: 20, fontWeight: '900', marginBottom: 6 },
  subText: { fontSize: 13 },
  cameraView: { height: 180, borderWidth: 2, borderStyle: 'dashed', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 16, overflow: 'hidden' },
  capturedPreview: { width: '100%', height: '100%', resizeMode: 'cover' },
  cameraText: { fontWeight: 'bold' },
  inputLabel: { fontWeight: 'bold', marginTop: 8, marginBottom: 4 },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, fontWeight: 'bold' },

  techItem: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 8 },
  techText: { fontSize: 13, fontWeight: 'bold' }
});