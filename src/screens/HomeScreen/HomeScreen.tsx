import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useBooks } from '../../hooks/useBooks';
import { useCart } from '../../context/CartContext';
import { Book } from '../../@types/type';
import { styles } from './HomeScreen.styles';

import {
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  TextInput,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 56) / 2;
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

