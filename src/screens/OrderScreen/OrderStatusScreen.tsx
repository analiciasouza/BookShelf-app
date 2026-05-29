import React from 'react';
import { View, Text, StatusBar, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CartItem } from '../../@types/type';
import { styles } from './OrderStatusScreen.styles';
import { AHeader, AButton } from '../../components/accessible';

const SHIPPING_FEE = 2.0;

interface Props { navigation: any; route: { params: { items: CartItem[]; total: number; orderId?: string } } }

export function OrderStatusScreen({ navigation, route }: Props) {
  const { items, total, orderId = '2930541' } = route.params;
  const totalPayment = total + SHIPPING_FEE;

  function handleCancel() {
    Alert.alert('Cancelar pedido', 'Tem certeza que deseja cancelar este pedido?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim, cancelar', style: 'destructive', onPress: () => navigation.navigate('Home') },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.thankSection}>
          <Text style={styles.thankEmoji}>Obrigada 🧡</Text>
          <AHeader level={1} style={styles.thankTitle}>Seu pedido foi realizado com sucesso!</AHeader>
          <Text style={styles.orderId}>Pedido #{orderId}</Text>
          <AButton label="Cancelar pedido" variant="ghost" style={{ marginTop: 8 }} onPress={handleCancel} />
        </View>

        <View style={styles.card}>
          <AHeader level={2} style={styles.cardTitle}>Detalhes do Pedido</AHeader>
          <View style={styles.divider} />

          {items.map(({ book, quantity }) => {
            const itemTotal = (Number(book.price) * quantity).toFixed(2); // ← Number() corrigido
            return (
              <View
                key={book.id}
                style={styles.itemRow}
                accessible
                accessibilityLabel={`${quantity} unidades de ${book.title}. Valor: R$ ${itemTotal}`}
              >
                <Text style={styles.itemQty}>{quantity}x</Text>
                <Text style={styles.itemName} numberOfLines={1}>{book.title}</Text>
                <Text style={styles.itemPrice}>R${itemTotal}</Text>
              </View>
            );
          })}

          <View style={styles.divider} />
          <Text style={{ color: '#1A1035', marginVertical: 4 }}>Subtotal: R$ {total.toFixed(2)}</Text>
          <Text style={{ color: '#1A1035', marginVertical: 4 }}>Frete: R$ {SHIPPING_FEE.toFixed(2)}</Text>
          <AHeader level={3}>{`Total Geral: R$ ${totalPayment.toFixed(2)}`}</AHeader>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <AButton
          label="Prosseguir e Finalizar"
          variant="primary"
          onPress={() => navigation.navigate('OrderReceived', { orderId })}
        />
      </View>
    </SafeAreaView>
  );
}