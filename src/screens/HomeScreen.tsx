import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useBooks } from '../hooks/useBooks';
import { useCart } from '../context/CartContext';
import { Book } from '../@types/type';

import {
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  TextInput,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;
const FEATURED_WIDTH = width - 40;

const PURPLE      = '#5C3D99';
const PURPLE_MID  = '#7B5BC4';
const PURPLE_SOFT = '#EDE8F7';
const PURPLE_DARK = '#2E1A6E';
const CREAM       = '#FAF8F4';
const INK         = '#1A1035';

interface Props {
  navigation: any;
}

export function HomeScreen({ navigation }: Props) {
  const { books, isLoading } = useBooks();
  const { cart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const cartCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);

  const filtered = searchQuery.trim()
    ? books.filter(b =>
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : books;

  const featured = books[0];
  const rest = books.slice(1);

  // ─── Card de livro no grid ──────────────────────────────────────
  function renderBook({ item, index }: { item: Book; index: number }) {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('BookDetail', { book: item })}
      >
        <View style={styles.coverWrapper}>
          <Image source={{ uri: item.coverImage }} style={styles.cover} resizeMode="cover" />
          <View style={styles.priceTag}>
            <Text style={styles.priceTagText}>R${item.price.toFixed(2)}</Text>
          </View>
        </View>
        <Text style={styles.bookTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.bookAuthor} numberOfLines={1}>{item.author}</Text>
      </TouchableOpacity>
    );
  }

  // ─── Card destaque ──────────────────────────────────────────────
  function FeaturedCard() {
    if (!featured) return null;
    return (
      <TouchableOpacity
        style={styles.featured}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('BookDetail', { book: featured })}
      >
        <Image source={{ uri: featured.coverImage }} style={styles.featuredBg} resizeMode="cover" />
        <View style={styles.featuredOverlay} />
        <View style={styles.featuredContent}>
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredBadgeText}>⭐ Destaque</Text>
          </View>
          <Text style={styles.featuredTitle} numberOfLines={2}>{featured.title}</Text>
          <Text style={styles.featuredAuthor}>{featured.author}</Text>
          <View style={styles.featuredFooter}>
            <Text style={styles.featuredPrice}>R${featured.price.toFixed(2)}</Text>
            <View style={styles.featuredBtn}>
              <Text style={styles.featuredBtnText}>Ver livro</Text>
              <Ionicons name="arrow-forward" size={14} color="#fff" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={CREAM} />

      {/* ── Header ── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerGreeting}>Olá, leitora 👋</Text>
          <Text style={styles.headerSub}>O que vamos ler hoje?</Text>
        </View>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Ionicons name="bag-outline" size={22} color={INK} />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* ── Busca ── */}
      <View style={styles.searchWrapper}>
        <View style={[styles.searchBar, searchFocused && styles.searchBarFocused]}>
          <Ionicons name="search-outline" size={18} color={searchFocused ? PURPLE : '#9E9E9E'} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar título ou autor..."
            placeholderTextColor="#BBBBBB"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#BBBBBB" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* ── Destaque (só aparece sem busca ativa) ── */}
        {!searchQuery && (
          <>
            <FeaturedCard />
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Catálogo</Text>
              <Text style={styles.sectionCount}>{rest.length} livros</Text>
            </View>
          </>
        )}

        {searchQuery && (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {filtered.length > 0 ? `${filtered.length} resultado(s)` : 'Nenhum resultado'}
            </Text>
          </View>
        )}

        {/* ── Grid ── */}
        <View style={styles.grid}>
          {(searchQuery ? filtered : rest).map((item, index) => (
            <View key={item.id} style={index % 2 === 0 ? styles.gridLeft : styles.gridRight}>
              {renderBook({ item, index })}
            </View>
          ))}
        </View>

      </ScrollView>

      {/* ── Tab Bar ── */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
          <View style={styles.tabActiveIndicator} />
          <Ionicons name="home" size={22} color={PURPLE} />
          <Text style={styles.tabLabelActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Category')}>
          <Ionicons name="grid-outline" size={22} color="#BBBBBB" />
          <Text style={styles.tabLabel}>Categoria</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Cart')}>
          <View>
            <Ionicons name="bag-outline" size={22} color="#BBBBBB" />
            {cartCount > 0 && (
              <View style={styles.tabBadge}>
                <Text style={styles.tabBadgeText}>{cartCount}</Text>
              </View>
            )}
          </View>
          <Text style={styles.tabLabel}>Carrinho</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-outline" size={22} color="#BBBBBB" />
          <Text style={styles.tabLabel}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CREAM },

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 14,
    backgroundColor: CREAM,
  },
  headerGreeting: { fontSize: 20, fontWeight: '700', color: INK, letterSpacing: -0.3 },
  headerSub: { fontSize: 13, color: '#9E9E9E', marginTop: 1 },
  cartButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: { fontSize: 9, color: '#fff', fontWeight: '700' },

  // ── Search ──
  searchWrapper: { paddingHorizontal: 20, marginBottom: 16 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 11,
    gap: 10,
    borderWidth: 1.5,
    borderColor: '#ECECEC',
  },
  searchBarFocused: { borderColor: PURPLE_MID },
  searchInput: { flex: 1, fontSize: 14, color: INK, padding: 0 },

  // ── Scroll ──
  scroll: { paddingHorizontal: 20, paddingBottom: 24 },

  // ── Featured ──
  featured: {
    width: FEATURED_WIDTH,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
    backgroundColor: PURPLE_DARK,
  },
  featuredBg: { position: 'absolute', width: '100%', height: '100%' },
  featuredOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(30, 15, 70, 0.72)',
  },
  featuredContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
  },
  featuredBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
  },
  featuredBadgeText: { fontSize: 11, color: '#fff', fontWeight: '600' },
  featuredTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 26,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  featuredAuthor: { fontSize: 12, color: 'rgba(255,255,255,0.65)', marginBottom: 14 },
  featuredFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  featuredPrice: { fontSize: 18, fontWeight: '800', color: '#FFFFFF' },
  featuredBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: PURPLE_MID,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  featuredBtnText: { fontSize: 13, color: '#fff', fontWeight: '600' },

  // ── Section header ──
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: INK, letterSpacing: -0.2 },
  sectionCount: { fontSize: 12, color: '#BBBBBB' },

  // ── Grid ──
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  gridLeft:  { width: CARD_WIDTH },
  gridRight: { width: CARD_WIDTH },

  // ── Card ──
  card: { width: '100%' },
  coverWrapper: {
    width: '100%',
    height: CARD_WIDTH * 1.4,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#E8E4F0',
    marginBottom: 10,
  },
  cover: { width: '100%', height: '100%' },
  priceTag: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: PURPLE,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  priceTagText: { fontSize: 11, color: '#fff', fontWeight: '700' },
  bookTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: INK,
    lineHeight: 18,
    marginBottom: 3,
  },
  bookAuthor: { fontSize: 11, color: '#9E9E9E' },

  // ── Tab Bar ──
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  tabItem: { flex: 1, alignItems: 'center', position: 'relative' },
  tabActiveIndicator: {
    position: 'absolute',
    top: -10,
    width: 24,
    height: 3,
    borderRadius: 2,
    backgroundColor: PURPLE,
  },
  tabLabel:       { fontSize: 10, color: '#BBBBBB', marginTop: 3 },
  tabLabelActive: { fontSize: 10, color: PURPLE, fontWeight: '700', marginTop: 3 },
  tabBadge: {
    position: 'absolute',
    top: -4,
    right: -8,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBadgeText: { fontSize: 8, color: '#fff', fontWeight: '700' },
});