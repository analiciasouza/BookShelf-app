import React, { useState } from 'react';
import { View, Text, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from './OrderReceivedScreen.styles';
import { AHeader, AButton, AInput, AStarRating } from '../../components/accessible';

interface Props { navigation: any; route: { params: { orderId?: string } } }

export function OrderReceivedScreen({ navigation, route }: Props) {
  const { orderId = '2930541' } = route.params ?? {};
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.illustrationBox} accessible accessibilityLabel="Ilustração de caixa de presente com brilhos decorativos">
          <Text style={styles.illustrationEmoji}>🎁</Text>
        </View>

        <AHeader level={1} style={styles.title}>Seu pedido foi feito!</AHeader>
        <Text style={styles.orderId} accessible accessibilityLabel={`Código do pedido: ${orderId}`}>Pedido #{orderId}</Text>

        <View style={styles.feedbackCard}>
          <AHeader level={2} style={styles.feedbackTitle}>Nos dê um feedback 🙌</AHeader>
          <Text style={styles.feedbackSubtitle}>Como foi sua experiência com este pedido?</Text>

          {/* Chamada para o componente estelar acessível */}
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
        <AButton label="Finalizar" variant="primary" onPress={() => navigation.navigate('Home')} />
      </View>
    </SafeAreaView>
  );
}