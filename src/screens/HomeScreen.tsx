import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const MOCK_BOOKS = [
  { id: '1', title: 'She who became the sun', price: 24.99, cover: 'https://covers.openlibrary.org/b/id/11505297-L.jpg' },
  { id: '2', title: 'This is how you lose the Time War', price: 24.99, cover: 'https://covers.openlibrary.org/b/id/9255920-L.jpg' },
  { id: '3', title: 'She who became the sun', price: 24.99, cover: 'https://covers.openlibrary.org/b/id/11505297-L.jpg' },
  { id: '4', title: 'This is how you lose the Time War', price: 24.99, cover: 'https://covers.openlibrary.org/b/id/9255920-L.jpg' },
  { id: '5', title: 'She who became the sun', price: 24.99, cover: 'https://covers.openlibrary.org/b/id/11505297-L.jpg' },
  { id: '6', title: 'This is how you lose the Time War', price: 24.99, cover: 'https://covers.openlibrary.org/b/id/9255920-L.jpg' },
];

interface Props {
  navigation: any;
}

export default function HomeScreen({ navigation }: Props) {
  function renderBook({ item }: { item: typeof MOCK_BOOKS[0] }) {
    return (
      <TouchableOpacity style={styles.card} activeOpacity={0.8}>
        <Image source={{ uri: item.cover }} style={styles.cover} resizeMode="cover" />
        <Text style={styles.bookTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.bookPrice}>Preço: R${item.price.toFixed(2)}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.headerIcon}>🔍</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Home</Text>
        <TouchableOpacity>
          <Text style={styles.headerIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Grid de livros */}
      <FlatList
        data={MOCK_BOOKS}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        renderItem={renderBook}
        showsVerticalScrollIndicator={false}
      />

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.tabIconActive}>🏠</Text>
          <Text style={styles.tabLabelActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Category')}>
          <Text style={styles.tabIcon}>☰</Text>
          <Text style={styles.tabLabel}>Category</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.tabIcon}>🛒</Text>
          <Text style={styles.tabLabel}>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.tabIcon}>👤</Text>
          <Text style={styles.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const PURPLE = '#5C3D99';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: { fontSize: 17, fontWeight: '600', color: '#1A1035' },
  headerIcon: { fontSize: 20 },
  listContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 20 },
  row: { justifyContent: 'space-between', marginBottom: 20 },
  card: { width: CARD_WIDTH },
  cover: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.4,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    marginBottom: 8,
  },
  bookTitle: { fontSize: 13, fontWeight: '500', color: '#1A1035', marginBottom: 4, lineHeight: 18 },
  bookPrice: { fontSize: 13, fontWeight: '600', color: PURPLE },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  tabItem: { flex: 1, alignItems: 'center' },
  tabIcon: { fontSize: 20, marginBottom: 2, opacity: 0.4 },
  tabIconActive: { fontSize: 20, marginBottom: 2 },
  tabLabel: { fontSize: 11, color: '#9E9E9E' },
  tabLabelActive: { fontSize: 11, color: PURPLE, fontWeight: '600' },
});