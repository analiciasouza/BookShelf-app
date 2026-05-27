import React, { useState, useRef } from 'react';
import { View, Text, StatusBar, ScrollView, Modal, Animated, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { CartItem } from '../../@types/type';
import { styles, sheetStyles } from './ConfirmOrderScreen.styles';
import { AHeader, AButton, AIconButton, AImage, ACard } from '../../components/accessible';

const PURPLE = '#5C3D99';
const SHIPPING_FEE = 2.0;
const SCREEN_HEIGHT = Dimensions.get('window').height;

type PaymentMethod = 'knet' | 'credit_card' | null;

interface Props { navigation: any; route: { params: { items: CartItem[]; total: number } } }

function BottomSheet({ visible, onClose, title, children }: { visible: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
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
        <AButton label="Fechar painel" variant="ghost" onPress={onClose} style={{ marginTop: 16 }} />
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
  const paymentLabel = selectedPayment === 'knet' ? 'KNET' : selectedPayment === 'credit_card' ? 'Cartão de Crédito' : 'Escolha uma forma de pagamento';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <AIconButton onPress={() => navigation.goBack()} label="Voltar"><Ionicons name="arrow-back-outline" size={22} color="#1A1035" /></AIconButton>
        <AHeader level={1} style={styles.headerTitle}>Confirmar Pedido</AHeader>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Seção Endereço */}
        <View style={styles.section}>
          <AHeader level={2} style={styles.sectionTitle}>Endereço</AHeader>
          <ACard style={styles.addressRow} label="Endereço de entrega atual: Rua Dumbo 123, Maceió Alagoas." hint="Toque duplo para alterar o endereço" onPress={() => navigation.navigate('Location')}>
            <Ionicons name="location-outline" size={20} color={PURPLE} />
            <View style={styles.addressInfo}>
              <Text style={styles.addressTitle}>Rua Dumbo</Text>
              <Text style={styles.addressSubtitle}>Rua Dumbo 123{'\n'}Maceió, Alagoas</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={18} color="#9E9E9E" />
          </ACard>
        </View>

        {/* Seção Resumo */}
        <View style={styles.section}>
          <AHeader level={2} style={styles.sectionTitle}>Resumo do Pedido</AHeader>
          {items.map(({ book, quantity }) => (
            <View key={book.id} style={styles.bookRow} accessible accessibilityLabel={`${quantity} unidades de ${book.title}.`}>
              <AImage source={{ uri: book.coverImage }} style={styles.bookCover} resizeMode="cover" alt="" decorative />
              <View style={styles.bookInfo}>
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text style={styles.bookAuthor}>Autor: {book.author}</Text>
              </View>
            </View>
          ))}

          <AButton label="Ver mais detalhes de valores" variant="secondary" style={{ marginTop: 12 }} onPress={() => setShowDetailsSheet(true)} />
        </View>

        {/* Seção Pagamento */}
        <View style={styles.section}>
          <ACard style={styles.paymentRow} label={`Forma de pagamento ativa: ${paymentLabel}`} hint="Toque duas vezes para alterar a forma de pagamento" onPress={() => setShowPaymentSheet(true)}>
            <Ionicons name="card-outline" size={20} color={PURPLE} />
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentTitle}>Pagamento</Text>
              <Text style={styles.paymentSubtitle}>{paymentLabel}</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={18} color="#9E9E9E" />
          </ACard>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <AButton label="Confirmar Pedido e Finalizar" variant="primary" onPress={() => navigation.navigate('OrderStatus', { items, total })} disabled={!selectedPayment} />
      </View>

      <BottomSheet visible={showDetailsSheet} onClose={() => setShowDetailsSheet(false)} title="Detalhes do Pagamento">
        <Text style={{ color: '#1A1035', marginVertical: 8 }}>Subtotal: R$ {total.toFixed(2)}</Text>
        <Text style={{ color: '#1A1035', marginVertical: 8 }}>Frete: R$ {SHIPPING_FEE.toFixed(2)}</Text>
        <View style={styles.divider} />
        <AHeader level={3}>{`Total Geral: R$ ${totalPayment.toFixed(2)}`}</AHeader>
      </BottomSheet>

      <BottomSheet visible={showPaymentSheet} onClose={() => setShowPaymentSheet(false)} title="Seus pagamentos">
        <AButton label="Pagar com KNET" variant="secondary" style={{ marginBottom: 12 }} onPress={() => { setSelectedPayment('knet'); setShowPaymentSheet(false); }} />
        <AButton label="Pagar com Cartão de Crédito" variant="secondary" onPress={() => { setSelectedPayment('credit_card'); setShowPaymentSheet(false); }} />
      </BottomSheet>
    </SafeAreaView>
  );
}