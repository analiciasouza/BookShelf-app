import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  FlatList,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { CartItem } from '../@types/type';

const PURPLE = '#5C3D99';
const PURPLE_LIGHT = '#EDE8F7';
const SHIPPING_FEE = 2.0;

interface Props {
  navigation: any;
}

export function CartScreen({ navigation }: Props) {
  const { cart, handleAddToCart, handleRemoveFromCart } = useCart();
  const isEmpty = cart.items.length === 0;
  const totalPayment = cart.total + SHIPPING_FEE;

  function increaseQty(item: CartItem) {
    handleAddToCart(item.book, 1);
  }

  function decreaseQty(item: CartItem) {
    if (item.quantity === 1) {
      handleRemoveFromCart(item.book.id);
    } else {
      // reduz 1 removendo e re-adicionando com quantidade - 1
      handleRemoveFromCart(item.book.id);
      handleAddToCart(item.book, item.quantity - 1);
    }
  }

  function handleCheckout() {
    navigation.navigate('ConfirmOrder', {
      items: cart.items,
      total: cart.total,
    });
  }

  // ─── Item do carrinho ──────────────────────────────────────────
  function renderItem({ item }: { item: CartItem }) {
    return (
      <View style={styles.card}>
        <Image
          source={{ uri: item.book.coverImage }}
          style={styles.cover}
          resizeMode="cover"
        />
        <View style={styles.info}>
          <Text style={styles.bookTitle} numberOfLines={2}>
            {item.book.title}
          </Text>
          <Text style={styles.bookAuthor}>{item.book.author}</Text>
          <Text style={styles.bookPrice}>
            R${(item.book.price * item.quantity).toFixed(2)}
          </Text>
        </View>

        {/* Contador */}
        <View style={styles.qtyBlock}>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => increaseQty(item)}>
            <Ionicons name="add" size={16} color={PURPLE} />
          </TouchableOpacity>
          <Text style={styles.qtyValue}>{item.quantity}</Text>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => decreaseQty(item)}>
            <Ionicons name="remove" size={16} color={PURPLE} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ─── Carrinho vazio ────────────────────────────────────────────
  function renderEmpty() {
    return (
      <View style={styles.emptyBox}>
        <Ionicons name="cart-outline" size={72} color="#D8D0EC" />
        <Text style={styles.emptyTitle}>Carrinho vazio</Text>
        <Text style={styles.emptySubtitle}>
          Adicione livros para continuar
        </Text>
        <TouchableOpacity
          style={styles.emptyButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.emptyButtonText}>Explorar livros</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={22} color="#1A1035" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meu Carrinho</Text>
        <View style={styles.headerBadgeWrapper}>
          <Ionicons name="cart-outline" size={22} color="#1A1035" />
          {!isEmpty && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cart.items.length}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Lista */}
      <FlatList
        data={cart.items}
        keyExtractor={(item) => item.book.id}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={
          isEmpty ? styles.emptyContainer : styles.listContent
        }
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* Rodapé só aparece se tiver itens */}
      {!isEmpty && (
        <View style={styles.footer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>R${cart.total.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Frete</Text>
            <Text style={styles.summaryValue}>R${SHIPPING_FEE.toFixed(2)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>R${totalPayment.toFixed(2)}</Text>
          </View>

          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={handleCheckout}
            activeOpacity={0.85}
          >
            <Text style={styles.checkoutButtonText}>Finalizar pedido</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },

  // Header
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
  headerBadgeWrapper: { position: 'relative' },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: { fontSize: 9, color: '#FFFFFF', fontWeight: '700' },

  // Lista
  listContent: { padding: 20 },
  separator: { height: 12 },

  // Card item
  card: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    alignItems: 'center',
  },
  cover: {
    width: 64,
    height: 88,
    borderRadius: 6,
    backgroundColor: '#F0F0F0',
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  bookTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1035',
    marginBottom: 4,
    lineHeight: 18,
  },
  bookAuthor: { fontSize: 12, color: '#9E9E9E', marginBottom: 8 },
  bookPrice: { fontSize: 14, fontWeight: '700', color: PURPLE },

  // Contador
  qtyBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    gap: 6,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: PURPLE_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1035',
    minWidth: 16,
    textAlign: 'center',
  },

  // Vazio
  emptyContainer: { flex: 1 },
  emptyBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1035',
    marginTop: 16,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#9E9E9E',
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: PURPLE,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 24,
  },
  emptyButtonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 14 },

  // Footer
  footer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: { fontSize: 13, color: '#9E9E9E' },
  summaryValue: { fontSize: 13, color: '#1A1035', fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 10 },
  totalLabel: { fontSize: 15, fontWeight: '700', color: '#1A1035' },
  totalValue: { fontSize: 15, fontWeight: '700', color: PURPLE },

  checkoutButton: {
    marginTop: 16,
    backgroundColor: PURPLE,
    borderRadius: 30,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  checkoutButtonText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
});