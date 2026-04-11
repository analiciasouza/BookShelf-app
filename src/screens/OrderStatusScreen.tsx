import React from 'react';
import { CartItem } from '../@types/type';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

const PURPLE = '#5C3D99';
const SHIPPING_FEE = 2.0;

interface Props {
  navigation: any;
  route: {
    params: {
      items: CartItem[];
      total: number;
      orderId?: string;
    };
  };
}

export function OrderStatusScreen({ navigation, route }: Props) {
  const { items, total, orderId = '2930541' } = route.params;
  const totalPayment = total + SHIPPING_FEE;

  function handleCancel() {
    Alert.alert(
      'Cancelar pedido',
      'Tem certeza que deseja cancelar este pedido?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim, cancelar',
          style: 'destructive',
          onPress: () => navigation.navigate('Home'),
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Cabeçalho de agradecimento */}
        <View style={styles.thankSection}>
          <Text style={styles.thankEmoji}>Thankyou 🧡</Text>
          <Text style={styles.thankTitle}>
            Your order has been{'\n'}placed successfully!
          </Text>
          <Text style={styles.orderId}>Order #{orderId}</Text>
          <Text style={styles.cancelHint}>
            Do you want to cancel your order?{' '}
            <Text style={styles.cancelLink} onPress={handleCancel}>
              Cancel
            </Text>
          </Text>
        </View>

        {/* Order Details */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Order Details</Text>

          <View style={styles.divider} />

          {items.map(({ book, quantity }) => (
            <View key={book.id} style={styles.itemRow}>
              <Text style={styles.itemQty}>{quantity}x</Text>
              <Text style={styles.itemName} numberOfLines={1}>
                {book.title}
              </Text>
              <Text style={styles.itemPrice}>
                ${(book.price * quantity).toFixed(2)}
              </Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>${SHIPPING_FEE.toFixed(2)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total Payment</Text>
            <Text style={styles.totalValue}>${totalPayment.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery in</Text>
            <Text style={styles.summaryValue}>10 - 15 mins</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Time</Text>
            <Text style={styles.summaryValue}>15:24 - 15:39</Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.statusButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('OrderReceived', { orderId })}
        >
          <Text style={styles.statusButtonText}>Order Status</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { paddingBottom: 24 },

  thankSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 20,
  },
  thankEmoji: { fontSize: 15, color: '#9E9E9E', marginBottom: 8 },
  thankTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: PURPLE,
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 8,
  },
  orderId: { fontSize: 13, color: '#9E9E9E', marginBottom: 10 },
  cancelHint: { fontSize: 12, color: '#9E9E9E' },
  cancelLink: { color: PURPLE, fontWeight: '600', textDecorationLine: 'underline' },

  card: {
    marginHorizontal: 20,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#1A1035', marginBottom: 12 },

  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  itemQty: { fontSize: 13, color: '#9E9E9E', width: 28 },
  itemName: { flex: 1, fontSize: 13, color: '#1A1035' },
  itemPrice: { fontSize: 13, fontWeight: '500', color: '#1A1035' },

  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 12 },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: { fontSize: 13, color: '#9E9E9E' },
  summaryValue: { fontSize: 13, color: '#1A1035', fontWeight: '500' },
  totalLabel: { fontSize: 14, fontWeight: '700', color: '#1A1035' },
  totalValue: { fontSize: 14, fontWeight: '700', color: PURPLE },

  footer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  statusButton: {
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: PURPLE,
    backgroundColor: '#FFFFFF',
  },
  statusButtonText: { fontSize: 15, fontWeight: '700', color: PURPLE },
});