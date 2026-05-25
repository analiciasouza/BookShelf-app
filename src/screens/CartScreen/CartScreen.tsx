import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';

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
import { CartItem } from '../../@types/type';
import { styles } from './CartScreen.styles';

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

