import React, { useState } from 'react';
import { View, Text, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from './OrderReceivedScreen.styles';
import { AHeader, AButton, AInput, AStarRating } from '../../components/accessible';
import { orderService } from '../../services/order.services';

interface Props {
  navigation: any;
  route: { params: { orderId?: string } };
}

export function OrderReceivedScreen({ navigation, route }: Props) {
  const { orderId = '' } = route.params ?? {};
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleDone() {
    setIsLoading(true);
    try {
      if (rating > 0 && orderId) {
        // Só envia se o usuário avaliou e temos um orderId real
        await orderService.sendFeedback(orderId, rating, feedback);
      }
    } catch {
      // Feedback falhou mas não bloqueia o usuário de voltar
      console.warn('Não foi possível salvar o feedback.');
    } finally {
      setIsLoading(false);
      navigation.navigate('Home');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        <View
          style={styles.illustrationBox}
          accessible
          accessibilityLabel="Ilustração de caixa de presente — pedido recebido"
        >
          <Text style={styles.illustrationEmoji}>🎁</Text>
        </View>

        <AHeader level={1} style={styles.title}>Seu pedido foi entregue!</AHeader>

        {orderId ? (
          <Text
            style={styles.orderId}
            accessible
            accessibilityLabel={`Código do pedido: ${orderId}`}
          >
            Pedido #{orderId}
          </Text>
        ) : null}

        <View style={styles.feedbackCard}>
          <AHeader level={2} style={styles.feedbackTitle}>Nos dê um feedback 🙌</AHeader>
          <Text style={styles.feedbackSubtitle}>Como foi sua experiência com este pedido?</Text>

          <View style={{ marginVertical: 12, alignItems: 'center' }}>
            <AStarRating rating={rating} onRate={setRating} max={5} />
          </View>

          <AInput
            label="Comentário adicional"
            placeholder="Escreva algo para nós!"
            value={feedback}
            onChangeText={setFeedback}
            multiline
            numberOfLines={3}
            optional
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <AButton
          label={rating > 0 ? 'Enviar avaliação e finalizar' : 'Finalizar sem avaliar'}
          variant="primary"
          onPress={handleDone}
          loading={isLoading}
        />
      </View>
    </SafeAreaView>
  );
}