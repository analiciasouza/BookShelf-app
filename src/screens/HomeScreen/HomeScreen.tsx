import React, { useState } from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useBooks } from '../../hooks/useBooks';
import { useCart } from '../../context/CartContext'; // ← useCart, não CartProvider
import { Book } from '../../@types/type';
import { styles } from './HomeScreen.styles';
import { AHeader, AIconButton, AImage, ACard, AInput } from '../../components/accessible';

const PURPLE = '#5C3D99';
const CREAM  = '#FAF8F4';
const INK    = '#1A1035';

interface Props {
  navigation: any;
}

export function HomeScreen({ navigation }: Props) {
  const { books, isLoading } = useBooks();
  const { cart } = useCart(); // ← era CartProvider() — corrigido
  const [searchQuery, setSearchQuery] = useState('');

  const cartCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);

  const filtered = searchQuery.trim()
    ? books.filter(b =>
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : books;

  const featured = books[0];
  const rest = books.slice(1);

  // price vem como string do Django — helper para exibição
  function formatPrice(price: string | number) {
    return Number(price).toFixed(2);
  }

  function renderBook({ item }: { item: Book }) {
    // coverImage é o alias mapeado pelo bookService (cover_image → coverImage)
    const imageUri = item.coverImage ?? item.cover_image;

    return (
      <ACard
        style={styles.card}
        label={`Livro: ${item.title}. Autor: ${item.author}. Preço: R$ ${formatPrice(item.price)}.`}
        hint="Toque duas vezes para ler os detalhes deste livro"
        onPress={() => navigation.navigate('BookDetail', { book: item })}
      >
        <View style={styles.coverWrapper}>
          <AImage
            source={{ uri: imageUri ?? undefined }}
            style={styles.cover}
            resizeMode="cover"
            alt=""
            decorative
          />
          <View style={styles.priceTag} importantForAccessibility="no-hide-descendants">
            <Text style={styles.priceTagText}>R${formatPrice(item.price)}</Text>
          </View>
        </View>
        <Text style={styles.bookTitle} numberOfLines={2} importantForAccessibility="no-hide-descendants">
          {item.title}
        </Text>
        <Text style={styles.bookAuthor} numberOfLines={1} importantForAccessibility="no-hide-descendants">
          {item.author}
        </Text>
      </ACard>
    );
  }

  function FeaturedCard() {
    if (!featured) return null;
    const imageUri = featured.coverImage ?? featured.cover_image;

    return (
      <ACard
        style={styles.featured}
        label={`Livro em Destaque: ${featured.title}. Autor: ${featured.author}. Preço: R$ ${formatPrice(featured.price)}.`}
        hint="Toque duas vezes para ler os detalhes deste destaque"
        onPress={() => navigation.navigate('BookDetail', { book: featured })}
      >
        <AImage
          source={{ uri: imageUri ?? undefined }}
          style={styles.featuredBg}
          resizeMode="cover"
          alt=""
          decorative
        />
        <View style={styles.featuredOverlay} />
        <View style={styles.featuredContent} importantForAccessibility="no-hide-descendants">
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredBadgeText}>⭐ Destaque</Text>
          </View>
          <Text style={styles.featuredTitle} numberOfLines={2}>{featured.title}</Text>
          <Text style={styles.featuredAuthor}>{featured.author}</Text>
          <View style={styles.featuredFooter}>
            <Text style={styles.featuredPrice}>R${formatPrice(featured.price)}</Text>
            <View style={styles.featuredBtn}>
              <Text style={styles.featuredBtnText}>Ver livro</Text>
            </View>
          </View>
        </View>
      </ACard>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={CREAM} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerGreeting}>Olá, leitora 👋</Text>
          <AHeader level={1} style={styles.headerSub}>O que vamos ler hoje?</AHeader>
        </View>
        <AIconButton
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
          label="Ir para o carrinho de compras"
          hint={cartCount > 0 ? `${cartCount} ite${cartCount > 1 ? 'ns' : 'm'} na sacola` : 'Sacola vazia'}
        >
          <Ionicons name="bag-outline" size={22} color={INK} />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </AIconButton>
      </View>

      {/* Busca */}
      <View style={styles.searchWrapper}>
        <AInput
          label="Buscar livros"
          placeholder="Buscar título ou autor..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          optional
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {!searchQuery && (
          <>
            <FeaturedCard />
            <View style={styles.sectionHeader}>
              <AHeader level={2} style={styles.sectionTitle}>Catálogo</AHeader>
              <Text style={styles.sectionCount}>{rest.length} livros</Text>
            </View>
          </>
        )}

        {searchQuery && (
          <View style={styles.sectionHeader}>
            <AHeader level={2} style={styles.sectionTitle}>
              {filtered.length > 0 ? `${filtered.length} resultado(s)` : 'Nenhum resultado'}
            </AHeader>
          </View>
        )}

        <View style={styles.grid}>
          {(searchQuery ? filtered : rest).map((item, index) => (
            <View key={item.id} style={index % 2 === 0 ? styles.gridLeft : styles.gridRight}>
              {renderBook({ item })}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Tab Bar */}
      <View style={styles.tabBar} accessibilityRole="tablist">
        <AIconButton
          style={styles.tabItem}
          onPress={() => navigation.navigate('Home')}
          label="Home, aba 1 de 3"
          accessibilityState={{ selected: true }}
        >
          <View style={styles.tabActiveIndicator} />
          <Ionicons name="home" size={22} color={PURPLE} />
          <Text style={styles.tabLabelActive}>Home</Text>
        </AIconButton>

        <AIconButton
          style={styles.tabItem}
          onPress={() => navigation.navigate('Cart')}
          label="Carrinho, aba 2 de 3"
          accessibilityState={{ selected: false }}
        >
          <View>
            <Ionicons name="bag-outline" size={22} color="#BBBBBB" />
            {cartCount > 0 && (
              <View style={styles.tabBadge}>
                <Text style={styles.tabBadgeText}>{cartCount}</Text>
              </View>
            )}
          </View>
          <Text style={styles.tabLabel}>Carrinho</Text>
        </AIconButton>

        <AIconButton
          style={styles.tabItem}
          onPress={() => navigation.navigate('Profile')}
          label="Perfil, aba 3 de 3"
          accessibilityState={{ selected: false }}
        >
          <Ionicons name="person-outline" size={22} color="#BBBBBB" />
          <Text style={styles.tabLabel}>Perfil</Text>
        </AIconButton>
      </View>
    </SafeAreaView>
  );
}