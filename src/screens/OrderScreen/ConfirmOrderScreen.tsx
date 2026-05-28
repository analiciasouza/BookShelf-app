import React, { useState, useRef } from 'react';
import { View, Text, StatusBar, ScrollView, Modal, Animated, TouchableWithoutFeedback, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { CartItem } from '../../@types/type';
import { styles, sheetStyles } from './ConfirmOrderScreen.styles';
import { AHeader, AButton, AIconButton, AImage, ACard } from '../../components/accessible';
import { orderService } from '../../services/order.services';
import { useCart } from '../../context/CartContext';

const PURPLE = '#5C3D99';
const SHIPPING_FEE = 2.0;
const SCREEN_HEIGHT = Dimensions.get('window').height;

type PaymentMethod = 'knet' | 'credit_card' | null;

interface Props {
  navigation: any;
  route: { params: { items: CartItem[]; total: number } };
}

function BottomSheet({ visible, onClose, title, children }: {
  visible: boolean; onClose: () => void; title: string; children: React.ReactNode;
}) {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, bounciness: 4 }).start();
    } else {
      Animated.timing(slideAnim, { toValue: SCREEN_HEIGHT, duration: 220, useNativeDriver: true }).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={sheetStyles.overlay} />
      </TouchableWithoutFeedback>
      <Animated.View style={[sheetStyles.sheet, { transform: [{ translateY: slideAnim }] }]}>
        <View style={sheetStyles.handle} />
        <AHeader level={2} style={sheetStyles.title}>{title}</AHeader>
        {children}
        <AButton label="Fechar" variant="ghost" onPress={onClose} style={{ marginTop: 16 }} />
      </Animated.View>
    </Modal>
  );
}

export function ConfirmOrderScreen({ navigation, route }: Props) {
  const { items, total } = route.params;
  const { handleClearCart } = useCart();
  const [showDetailsSheet, setShowDetailsSheet] = useState(false);
  const [showPaymentSheet, setShowPaymentSheet] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(null);
  const [isLoading, setIsLoading] = useState(false);

  const totalPayment = total + SHIPPING_FEE;
  const paymentLabel = selectedPayment === 'knet'
    ? 'KNET'
    : selectedPayment === 'credit_card'
    ? 'Cartão de Crédito'
    : 'Escolha uma forma de pagamento';

  async function handleOrder() {
    if (!selectedPayment) {
      Alert.alert('Atenção', 'Selecione um método de pagamento.');
      return;
    }

    setIsLoading(true);
    try {
      const order = await orderService.create({
        // payload exato que o CreateOrderSerializer espera
        items: items.map(i => ({
          book: i.book.id,       // ← "book", não "book_id"
          quantity: i.quantity,
        })),
        shipping_address: {
          street_address: 'Rua Dumbo 123', // TODO: substituir pelo endereço da LocationScreen
          city: 'Maceió',
          state: 'AL',
          postal_code: '57000-000',
          country: 'Brasil',
        },
        payment_method: selectedPayment === 'knet' ? 1 : 2, // TODO: usar ID real do PaymentMethod
      });

      handleClearCart();

      navigation.navigate('OrderStatus', {
        items,
        total,
        orderId: order.order_number, // número real vindo da API
      });
    } catch (error: any) {
      const msg = error?.response?.data?.error || 'Não foi possível finalizar o pedido.';
      Alert.alert('Erro', msg);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <AIconButton onPress={() => navigation.goBack()} label="Voltar">
          <Ionicons name="arrow-back-outline" size={22} color="#1A1035" />
        </AIconButton>
        <AHeader level={1} style={styles.headerTitle}>Confirmar Pedido</AHeader>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Endereço */}
        <View style={styles.section}>
          <AHeader level={2} style={styles.sectionTitle}>Endereço</AHeader>
          <ACard
            style={styles.addressRow}
            label="Endereço de entrega: Rua Dumbo 123, Maceió, Alagoas"
            hint="Toque para alterar o endereço de entrega"
            onPress={() => navigation.navigate('Location')}
          >
            <Ionicons name="location-outline" size={20} color={PURPLE} />
            <View style={styles.addressInfo}>
              <Text style={styles.addressTitle}>Rua Dumbo</Text>
              <Text style={styles.addressSubtitle}>Rua Dumbo 123{'\n'}Maceió, Alagoas</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={18} color="#9E9E9E" />
          </ACard>
        </View>

        {/* Resumo */}
        <View style={styles.section}>
          <AHeader level={2} style={styles.sectionTitle}>Resumo do Pedido</AHeader>
          {items.map(({ book, quantity }) => (
            <View
              key={book.id}
              style={styles.bookRow}
              accessible
              accessibilityLabel={`${quantity} unidades de ${book.title}`}
            >
              <AImage
                source={{ uri: book.coverImage ?? book.cover_image }}
                style={styles.bookCover}
                resizeMode="cover"
                alt=""
                decorative
              />
              <View style={styles.bookInfo}>
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text style={styles.bookAuthor}>Autor: {book.author}</Text>
              </View>
            </View>
          ))}
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Preço</Text>
            <Text style={styles.priceValue}>R${total.toFixed(2)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Frete</Text>
            <Text style={styles.priceValue}>R${SHIPPING_FEE.toFixed(2)}</Text>
          </View>
          <View style={[styles.priceRow, { marginTop: 4 }]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>R${totalPayment.toFixed(2)}</Text>
          </View>
          <AButton
            label="Ver detalhes dos valores"
            variant="ghost"
            style={styles.seeDetails}
            onPress={() => setShowDetailsSheet(true)}
          />
        </View>

        {/* Pagamento */}
        <View style={styles.section}>
          <ACard
            style={styles.paymentRow}
            label={`Pagamento: ${paymentLabel}`}
            hint="Toque para escolher o método de pagamento"
            onPress={() => setShowPaymentSheet(true)}
          >
            <View style={styles.paymentIcon}>
              <Ionicons name="card-outline" size={20} color={PURPLE} />
            </View>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentTitle}>Pagamento</Text>
              <Text style={styles.paymentSubtitle}>{paymentLabel}</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={18} color="#9E9E9E" />
          </ACard>
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <AButton
          label="Confirmar Pedido"
          hint={`Total a pagar: R$${totalPayment.toFixed(2)}`}
          variant="primary"
          loading={isLoading}
          disabled={!selectedPayment}
          onPress={handleOrder}
        />
      </View>

      {/* Bottom Sheet — Detalhes */}
      <BottomSheet visible={showDetailsSheet} onClose={() => setShowDetailsSheet(false)} title="Detalhes do Pagamento">
        {items.map(({ book, quantity }) => (
          <View key={book.id} style={sheetStyles.detailRow}>
            <Text style={sheetStyles.detailName} numberOfLines={1}>{book.title}</Text>
            <Text style={sheetStyles.detailItemValue}>R${(Number(book.price) * quantity).toFixed(2)}</Text>
          </View>
        ))}
        <View style={sheetStyles.separator} />
        <View style={sheetStyles.detailRow}>
          <Text style={sheetStyles.detailName}>Frete</Text>
          <Text style={sheetStyles.detailItemValue}>R${SHIPPING_FEE.toFixed(2)}</Text>
        </View>
        <View style={sheetStyles.separator} />
        <View style={sheetStyles.detailRow}>
          <Text style={sheetStyles.detailTotalLabel}>Total</Text>
          <Text style={sheetStyles.detailTotalValue}>R${totalPayment.toFixed(2)}</Text>
        </View>
      </BottomSheet>

      {/* Bottom Sheet — Pagamento */}
      <BottomSheet visible={showPaymentSheet} onClose={() => setShowPaymentSheet(false)} title="Seus Pagamentos">
        <AButton
          label="Pagar com KNET"
          variant="secondary"
          style={{ marginBottom: 12 }}
          onPress={() => { setSelectedPayment('knet'); setShowPaymentSheet(false); }}
        />
        <AButton
          label="Pagar com Cartão de Crédito"
          variant="secondary"
          onPress={() => { setSelectedPayment('credit_card'); setShowPaymentSheet(false); }}
        />
      </BottomSheet>

    </SafeAreaView>
  );
}