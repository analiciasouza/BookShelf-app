import React, { useState, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { CartItem } from '../@types/type';

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

// ─── Componente Bottom Sheet genérico ───────────────────────────────────────
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

// ─── Tela principal ──────────────────────────────────────────────────────────
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
      ? 'Credit Card'
      : 'Choose your payment';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={22} color="#1A1035" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirm Order</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={22} color="#1A1035" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address</Text>
          <View style={styles.addressRow}>
            <View style={styles.addressIcon}>
              <Ionicons name="location-outline" size={20} color={PURPLE} />
            </View>
            <View style={styles.addressInfo}>
              <Text style={styles.addressTitle}>Utama Street No.20</Text>
              <Text style={styles.addressSubtitle}>
                Dumbo Street No.20, Dumbo,{'\n'}New York 10001, United States
              </Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={18} color="#9E9E9E" />
          </View>
          <TouchableOpacity style={styles.changeButton}>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>

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
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.priceValue}>R${total.toFixed(2)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Shipping</Text>
            <Text style={styles.priceValue}>R${SHIPPING_FEE.toFixed(2)}</Text>
          </View>
          <View style={[styles.priceRow, { marginTop: 4 }]}>
            <Text style={styles.totalLabel}>Total Payment</Text>
            <Text style={styles.totalValue}>R${totalPayment.toFixed(2)}</Text>
          </View>

          <TouchableOpacity
            style={styles.seeDetails}
            onPress={() => setShowDetailsSheet(true)}
          >
            <Text style={styles.seeDetailsText}>See details</Text>
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
              <Text style={styles.paymentTitle}>Payment</Text>
              <Text style={styles.paymentSubtitle}>{paymentLabel}</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={18} color="#9E9E9E" />
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Order Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.orderButton} activeOpacity={0.85}>
          <Text style={styles.orderButtonText}>Order</Text>
        </TouchableOpacity>
      </View>

      {/* ── Bottom Sheet 6.2: Payment Details ── */}
      <BottomSheet visible={showDetailsSheet} onClose={() => setShowDetailsSheet(false)}>
        <Text style={sheetStyles.title}>Payment Details</Text>

        {/* Bloco de preço dos itens */}
        <View style={sheetStyles.detailBlock}>
          <View style={sheetStyles.detailHeaderRow}>
            <Text style={sheetStyles.detailHeaderLabel}>Price</Text>
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
          <Text style={sheetStyles.detailName}>Shipping</Text>
          <Text style={sheetStyles.detailItemValue}>R${SHIPPING_FEE.toFixed(2)}</Text>
        </View>

        <View style={sheetStyles.separator} />

        <View style={sheetStyles.detailRow}>
          <Text style={sheetStyles.detailTotalLabel}>Total Payment</Text>
          <Text style={sheetStyles.detailTotalValue}>R${totalPayment.toFixed(2)}</Text>
        </View>
      </BottomSheet>

      {/* ── Bottom Sheet 6.3: Your Payments ── */}
      <BottomSheet visible={showPaymentSheet} onClose={() => setShowPaymentSheet(false)}>
        <Text style={sheetStyles.title}>Your Payments</Text>

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
          <Text style={sheetStyles.paymentOptionLabel}>Credit Card</Text>
          <Ionicons name="chevron-forward-outline" size={18} color="#9E9E9E" />
        </TouchableOpacity>
      </BottomSheet>

    </SafeAreaView>
  );
}

// ─── Estilos da tela ─────────────────────────────────────────────────────────
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

  scrollContent: { paddingBottom: 24 },

  section: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#1A1035', marginBottom: 14 },

  // Address
  addressRow: { flexDirection: 'row', alignItems: 'flex-start' },
  addressIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0EBF8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  addressInfo: { flex: 1 },
  addressTitle: { fontSize: 14, fontWeight: '600', color: '#1A1035', marginBottom: 4 },
  addressSubtitle: { fontSize: 12, color: '#9E9E9E', lineHeight: 18 },
  changeButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: PURPLE,
  },
  changeText: { fontSize: 13, color: PURPLE, fontWeight: '500' },

  // Book row
  bookRow: { flexDirection: 'row', marginBottom: 12 },
  bookCover: { width: 72, height: 100, borderRadius: 6, backgroundColor: '#F0F0F0' },
  bookInfo: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  bookTitle: { fontSize: 14, fontWeight: '600', color: '#1A1035', marginBottom: 4 },
  bookAuthor: { fontSize: 12, color: '#9E9E9E', marginBottom: 4 },
  bookQty: { fontSize: 12, color: PURPLE, fontWeight: '500' },

  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 12 },

  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  priceLabel: { fontSize: 13, color: '#9E9E9E' },
  priceValue: { fontSize: 13, color: '#1A1035', fontWeight: '500' },
  totalLabel: { fontSize: 14, fontWeight: '700', color: '#1A1035' },
  totalValue: { fontSize: 14, fontWeight: '700', color: PURPLE },

  seeDetails: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  seeDetailsText: { fontSize: 13, color: PURPLE, fontWeight: '500', marginRight: 2 },

  paymentRow: { flexDirection: 'row', alignItems: 'center' },
  paymentIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0EBF8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentInfo: { flex: 1 },
  paymentTitle: { fontSize: 14, fontWeight: '600', color: '#1A1035' },
  paymentSubtitle: { fontSize: 12, color: '#9E9E9E', marginTop: 2 },

  footer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  orderButton: {
    backgroundColor: PURPLE,
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  orderButtonText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
});

// ─── Estilos do Bottom Sheet ──────────────────────────────────────────────────
const sheetStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 36,
    paddingTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E0E0E0',
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1035',
    marginBottom: 20,
  },

  // Payment Details
  detailBlock: { marginBottom: 4 },
  detailHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailHeaderLabel: { fontSize: 14, fontWeight: '600', color: '#1A1035' },
  detailHeaderValue: { fontSize: 14, fontWeight: '600', color: '#1A1035' },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailName: { fontSize: 13, color: '#9E9E9E', flex: 1, marginRight: 8 },
  detailItemValue: { fontSize: 13, color: '#9E9E9E' },
  separator: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 12 },
  detailTotalLabel: { fontSize: 14, fontWeight: '700', color: '#1A1035' },
  detailTotalValue: { fontSize: 14, fontWeight: '700', color: PURPLE },

  // Your Payments
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  paymentOptionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  paymentOptionLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1035',
  },
});