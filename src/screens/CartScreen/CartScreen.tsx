import React from 'react';
import { View, Text, StatusBar, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useCart } from '../../context/CartContext';
import { CartItem } from '../../@types/type';
import { styles } from './CartScreen.styles';

// Componentes Acessíveis
import { AHeader, AButton, AIconButton, AImage, ACard } from '../../components/accessible';

const PURPLE = '#5C3D99';
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

  function renderItem({ item }: { item: CartItem }) {
    const itemTotal = item.book.price * item.quantity;
    return (
      <ACard
        style={styles.card}
        label={`Livro: ${item.book.title}. Autor: ${item.book.author}. Quantidade: ${item.quantity}. Valor total do item: R$ ${itemTotal.toFixed(2)}.`}
        hint="Dê duplo toque nos botões internos para alterar as quantidades."
      >
        <AImage
          source={{ uri: item.book.coverImage }}
          style={styles.cover}
          resizeMode="cover"
          alt={`Capa do livro ${item.book.title}`}
        />
        <View style={styles.info} importantForAccessibility="no-hide-descendants">
          <Text style={styles.bookTitle} numberOfLines={2}>{item.book.title}</Text>
          <Text style={styles.bookAuthor}>{item.book.author}</Text>
          <Text style={styles.bookPrice}>R${itemTotal.toFixed(2)}</Text>
        </View>

        <View style={styles.qtyBlock}>
          <AIconButton 
            style={styles.qtyBtn} 
            onPress={() => increaseQty(item)}
            label={`Adicionar mais uma unidade de ${item.book.title}`}
          >
            <Ionicons name="add" size={16} color={PURPLE} />
          </AIconButton>
          
          <Text style={styles.qtyValue} importantForAccessibility="no-hide-descendants">
            {item.quantity}
          </Text>
          
          <AIconButton 
            style={styles.qtyBtn} 
            onPress={() => decreaseQty(item)}
            label={item.quantity === 1 ? `Remover ${item.book.title} do carrinho` : `Remover uma unidade de ${item.book.title}`}
          >
            <Ionicons name="remove" size={16} color={PURPLE} />
          </AIconButton>
        </View>
      </ACard>
    );
  }

  function renderEmpty() {
    return (
      <View style={styles.emptyBox}>
        <Ionicons name="cart-outline" size={72} color="#D8D0EC" importantForAccessibility="no" />
        <AHeader level={2} style={styles.emptyTitle}>Carrinho vazio</AHeader>
        <Text style={styles.emptySubtitle}>Adicione livros para continuar</Text>
        
        <AButton 
          label="Explorar livros"
          variant="primary"
          style={styles.emptyButton}
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <AIconButton onPress={() => navigation.goBack()} label="Voltar">
          <Ionicons name="arrow-back-outline" size={22} color="#1A1035" />
        </AIconButton>
        
        <AHeader level={1} style={styles.headerTitle}>Meu Carrinho</AHeader>
        
        <View 
          style={styles.headerBadgeWrapper}
          accessible
          accessibilityLabel={`Ícone do carrinho. ${cart.items.length} tipos de itens adicionados.`}
        >
          <Ionicons name="cart-outline" size={22} color="#1A1035" />
          {!isEmpty && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cart.items.length}</Text>
            </View>
          )}
        </View>
      </View>

      <FlatList
        data={cart.items}
        keyExtractor={(item) => item.book.id}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={isEmpty ? styles.emptyContainer : styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {!isEmpty && (
        <View style={styles.footer}>
          <View style={styles.summaryRow} accessible accessibilityLabel={`Subtotal: R$ ${cart.total.toFixed(2)}`}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>R${cart.total.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow} accessible accessibilityLabel={`Frete fixa: R$ ${SHIPPING_FEE.toFixed(2)}`}>
            <Text style={styles.summaryLabel}>Frete</Text>
            <Text style={styles.summaryValue}>R${SHIPPING_FEE.toFixed(2)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow} accessible accessibilityLabel={`Valor total geral: R$ ${totalPayment.toFixed(2)}`}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>R${totalPayment.toFixed(2)}</Text>
          </View>

          <AButton 
            label="Finalizar pedido"
            hint="Avança para a tela de confirmação de endereço e pagamento"
            style={styles.checkoutButton}
            onPress={handleCheckout}
          />
        </View>
      )}
    </SafeAreaView>
  );
}