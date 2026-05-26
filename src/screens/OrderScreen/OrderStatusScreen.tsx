import React from 'react';
import { CartItem } from '../../@types/type';

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
import { styles } from './OrderStatusScreen.styles';

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
          <Text style={styles.thankEmoji}>Obrigada 🧡</Text>
          <Text style={styles.thankTitle}>
            Seu pedido foi{'\n'}realizado com sucesso!
          </Text>
          <Text style={styles.orderId}>Pedido #{orderId}</Text>
          <Text style={styles.cancelHint}>
            Deseja cancelar seu pedido?{' '}
            <Text style={styles.cancelLink} onPress={handleCancel}>
              Cancelar
            </Text>
          </Text>
        </View>

        {/* Order Details */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Detalhes do Pedido</Text>

          <View style={styles.divider} />

          {items.map(({ book, quantity }) => (
            <View key={book.id} style={styles.itemRow}>
              <Text style={styles.itemQty}>{quantity}x</Text>
              <Text style={styles.itemName} numberOfLines={1}>
                {book.title}
              </Text>
              <Text style={styles.itemPrice}>
                R${(book.price * quantity).toFixed(2)}
              </Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>R${total.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Frete</Text>
            <Text style={styles.summaryValue}>R${SHIPPING_FEE.toFixed(2)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>R${totalPayment.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Chega</Text>
            <Text style={styles.summaryValue}> 15/04 a 20/04</Text>
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
          <Text style={styles.statusButtonText}>Finalizar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
