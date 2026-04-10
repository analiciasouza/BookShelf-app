import React, { useState } from 'react';
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
    };
  };
}

export function ConfirmOrderScreen({ navigation, route }: Props) {
  const { items, total } = route.params;
  const [showDetails, setShowDetails] = useState(false);

  const totalPayment = total + SHIPPING_FEE;

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

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>

          {items.map(({ book, quantity }) => (
            <View key={book.id} style={styles.bookRow}>
              <Image source={{ uri: book.coverImage }} style={styles.bookCover} resizeMode="cover" />
              <View style={styles.bookInfo}>
                <Text style={styles.bookTitle} numberOfLines={2}>{book.title}</Text>
                <Text style={styles.bookAuthor}>Autor: {book.author}</Text>
                {quantity > 1 && (
                  <Text style={styles.bookQty}>Qtd: {quantity}</Text>
                )}
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
          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Total Payment</Text>
            <Text style={styles.totalValue}>R${totalPayment.toFixed(2)}</Text>
          </View>

          <TouchableOpacity
            style={styles.seeDetails}
            onPress={() => setShowDetails(!showDetails)}
          >
            <Text style={styles.seeDetailsText}>See details</Text>
            <Ionicons
              name={showDetails ? 'chevron-up-outline' : 'chevron-forward-outline'}
              size={16}
              color={PURPLE}
            />
          </TouchableOpacity>

          {showDetails && (
            <View style={styles.detailsBox}>
              {items.map(({ book, quantity }) => (
                <View key={book.id} style={styles.detailRow}>
                  <Text style={styles.detailName} numberOfLines={1}>{book.title}</Text>
                  <Text style={styles.detailValue}>
                    {quantity}x R${book.price.toFixed(2)}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Address */}
        <View style={styles.section}>
          <View style={styles.addressRow}>
            <View style={styles.addressIcon}>
              <Ionicons name="location-outline" size={20} color={PURPLE} />
            </View>
            <View style={styles.addressInfo}>
              <Text style={styles.addressTitle}>Utama Street No.20</Text>
              <Text style={styles.addressSubtitle}>
                Dumbo No.20, Dumbo,{'\n'}New York 10001, United States
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.changeButton}>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* Payment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment</Text>
          <TouchableOpacity style={styles.paymentRow}>
            <View style={styles.paymentIcon}>
              <Ionicons name="card-outline" size={20} color={PURPLE} />
            </View>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentTitle}>Payment</Text>
              <Text style={styles.paymentSubtitle}>Choose your payment</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={18} color="#9E9E9E" />
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Order Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.orderButton}
          activeOpacity={0.85}
          onPress={() => {
            // TODO: handle order submission
          }}
        >
          <Text style={styles.orderButtonText}>Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

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
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1035',
    marginBottom: 14,
  },

  // Book row
  bookRow: { flexDirection: 'row', marginBottom: 12 },
  bookCover: {
    width: 72,
    height: 100,
    borderRadius: 6,
    backgroundColor: '#F0F0F0',
  },
  bookInfo: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  bookTitle: { fontSize: 14, fontWeight: '600', color: '#1A1035', marginBottom: 4 },
  bookAuthor: { fontSize: 12, color: '#9E9E9E', marginBottom: 4 },
  bookQty: { fontSize: 12, color: PURPLE, fontWeight: '500' },

  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 12 },

  // Prices
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: { fontSize: 13, color: '#9E9E9E' },
  priceValue: { fontSize: 13, color: '#1A1035', fontWeight: '500' },
  totalLabel: { fontSize: 14, fontWeight: '700', color: '#1A1035' },
  totalValue: { fontSize: 14, fontWeight: '700', color: PURPLE },

  // See details
  seeDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  seeDetailsText: { fontSize: 13, color: PURPLE, fontWeight: '500', marginRight: 2 },
  detailsBox: {
    marginTop: 10,
    backgroundColor: '#F4F0FB',
    borderRadius: 8,
    padding: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  detailName: { fontSize: 12, color: '#1A1035', flex: 1, marginRight: 8 },
  detailValue: { fontSize: 12, color: PURPLE, fontWeight: '500' },

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

  // Payment
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
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

  // Footer
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