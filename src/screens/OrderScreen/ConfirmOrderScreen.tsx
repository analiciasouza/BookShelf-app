import React, { useState, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { CartItem } from '../../@types/type';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { styles, sheetStyles } from './ConfirmOrderScreen.styles';

const PURPLE = '#5C3D99';
const SHIPPING_FEE = 2.0;
const SCREEN_HEIGHT = Dimensions.get('window').height;

type PaymentMethod = 'knet' | 'credit_card' | null;

interface Props {
  navigation: any;
  route: {
    params: {
      items: CartItem[];
      total: number;
    };
  };
}


function BottomSheet({
  visible,
  onClose,
  children,
}: {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 4,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 220,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal transparent animationType="none" visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={sheetStyles.overlay} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[sheetStyles.sheet, { transform: [{ translateY: slideAnim }] }]}
      >
        <View style={sheetStyles.handle} />
        {children}
      </Animated.View>
    </Modal>
  );
}


export function ConfirmOrderScreen({ navigation, route }: Props) {
  const { items, total } = route.params;
  const [showDetailsSheet, setShowDetailsSheet] = useState(false);
  const [showPaymentSheet, setShowPaymentSheet] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(null);

  const totalPayment = total + SHIPPING_FEE;

  const paymentLabel =
    selectedPayment === 'knet'
      ? 'KNET'
      : selectedPayment === 'credit_card'
      ? 'Cartão de Crédito'
      : 'Escolha uma forma de pagamento';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={22} color="#1A1035" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirmar Pedido</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={22} color="#1A1035" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Endereço</Text>
          <TouchableOpacity style={styles.addressRow} activeOpacity={0.8} onPress={() => navigation.navigate('Location')}>
          <View style={styles.addressRow}>
            <View style={styles.addressIcon}>
              <Ionicons name="location-outline" size={20} color={PURPLE} />
            </View>
            <View style={styles.addressInfo}>
              <Text style={styles.addressTitle}>Rua Dumbo</Text>
              <Text style={styles.addressSubtitle}>
                Rua Dumbo 123{'\n'}Maceió, Alagoas
              </Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={18} color="#9E9E9E" />
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.changeButton} onPress={() => navigation.navigate('Location')}>
            <Text style={styles.changeText}>Mudar</Text>
          </TouchableOpacity>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo</Text>

          {items.map(({ book, quantity }) => (
            <View key={book.id} style={styles.bookRow}>
              <Image source={{ uri: book.coverImage }} style={styles.bookCover} resizeMode="cover" />
              <View style={styles.bookInfo}>
                <Text style={styles.bookTitle} numberOfLines={2}>{book.title}</Text>
                <Text style={styles.bookAuthor}>Autor: {book.author}</Text>
                {quantity > 1 && <Text style={styles.bookQty}>Qtd: {quantity}</Text>}
              </View>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Preço</Text>
            <Text style={styles.priceValue}>R${total.toFixed(2)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Frete</Text>
            <Text style={styles.priceValue}>R${SHIPPING_FEE.toFixed(2)}</Text>
          </View>
          <View style={[styles.priceRow, { marginTop: 4 }]}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>R${totalPayment.toFixed(2)}</Text>
          </View>

          <TouchableOpacity
            style={styles.seeDetails}
            onPress={() => setShowDetailsSheet(true)}
          >
            <Text style={styles.seeDetailsText}>Ver detalhes:</Text>
            <Ionicons name="chevron-forward-outline" size={16} color={PURPLE} />
          </TouchableOpacity>
        </View>

        {/* Payment */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.paymentRow}
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
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Order Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.orderButton} activeOpacity={0.85} onPress={() => navigation.navigate('OrderStatus', { items, total })}>
          <Text style={styles.orderButtonText}>Confirmar Pedido</Text>
        </TouchableOpacity>
      </View>

      {/* ── Bottom Sheet 6.2: Payment Details ── */}
      <BottomSheet visible={showDetailsSheet} onClose={() => setShowDetailsSheet(false)}>
        <Text style={sheetStyles.title}>Detalhes Pagamento</Text>

        {/* Bloco de preço dos itens */}
        <View style={sheetStyles.detailBlock}>
          <View style={sheetStyles.detailHeaderRow}>
            <Text style={sheetStyles.detailHeaderLabel}>Preço</Text>
            <Text style={sheetStyles.detailHeaderValue}>R${total.toFixed(2)}</Text>
          </View>
          {items.map(({ book, quantity }) => (
            <View key={book.id} style={sheetStyles.detailRow}>
              <Text style={sheetStyles.detailName} numberOfLines={1}>{book.title}</Text>
              <Text style={sheetStyles.detailItemValue}>
                R${(book.price * quantity).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        <View style={sheetStyles.separator} />

        <View style={sheetStyles.detailRow}>
          <Text style={sheetStyles.detailName}>Frete</Text>
          <Text style={sheetStyles.detailItemValue}>R${SHIPPING_FEE.toFixed(2)}</Text>
        </View>

        <View style={sheetStyles.separator} />

        <View style={sheetStyles.detailRow}>
          <Text style={sheetStyles.detailTotalLabel}>Total:</Text>
          <Text style={sheetStyles.detailTotalValue}>R${totalPayment.toFixed(2)}</Text>
        </View>
      </BottomSheet>

      {/* ── Bottom Sheet 6.3: Your Payments ── */}
      <BottomSheet visible={showPaymentSheet} onClose={() => setShowPaymentSheet(false)}>
        <Text style={sheetStyles.title}>Seus pagamentos</Text>

        <TouchableOpacity
          style={sheetStyles.paymentOption}
          onPress={() => {
            setSelectedPayment('knet');
            setShowPaymentSheet(false);
          }}
        >
          <View style={[sheetStyles.paymentOptionIcon, { backgroundColor: '#E8F4FD' }]}>
            <Ionicons name="card" size={22} color="#1B6CA8" />
          </View>
          <Text style={sheetStyles.paymentOptionLabel}>KNET</Text>
          <Ionicons name="chevron-forward-outline" size={18} color="#9E9E9E" />
        </TouchableOpacity>

        <TouchableOpacity
          style={sheetStyles.paymentOption}
          onPress={() => {
            setSelectedPayment('credit_card');
            setShowPaymentSheet(false);
          }}
        >
          <View style={[sheetStyles.paymentOptionIcon, { backgroundColor: '#FFF3E0' }]}>
            <Ionicons name="card-outline" size={22} color="#E65100" />
          </View>
          <Text style={sheetStyles.paymentOptionLabel}>Cartão de Crédito</Text>
          <Ionicons name="chevron-forward-outline" size={18} color="#9E9E9E" />
        </TouchableOpacity>
      </BottomSheet>

    </SafeAreaView>
  );
}

