import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './OrderReceivedScreen.styles';

interface Props {
  navigation: any;
  route: {
    params: {
      orderId?: string;
    };
  };
}

export function OrderReceivedScreen({ navigation, route }: Props) {
  const { orderId = '2930541' } = route.params ?? {};
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Ilustração */}
        <View style={styles.illustrationBox}>
          <Text style={styles.illustrationEmoji}>🎁</Text>
          <View style={styles.sparkles}>
            <Text style={styles.sparkle}>✨</Text>
            <Text style={[styles.sparkle, { top: 10, right: 10 }]}>✨</Text>
            <Text style={[styles.sparkle, { bottom: 8, left: 20 }]}>✦</Text>
          </View>
        </View>

        <Text style={styles.title}>Seu pedido foi feito!</Text>
        <Text style={styles.orderId}>Pedido #{orderId}</Text>

        {/* Card de feedback */}
        <View style={styles.feedbackCard}>
          <Text style={styles.feedbackTitle}>Nos de um feedback 🙌</Text>
          <Text style={styles.feedbackSubtitle}>
            Como foi sua experiência com este pedido?
          </Text>

          {/* Estrelas */}
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={star <= rating ? 'star' : 'star-outline'}
                  size={36}
                  color={star <= rating ? '#F5A623' : '#E0E0E0'}
                  style={{ marginHorizontal: 4 }}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Campo de texto */}
          <TextInput
            style={styles.feedbackInput}
            placeholder="Escreva algo para nós!"
            placeholderTextColor="#C4C4C4"
            value={feedback}
            onChangeText={setFeedback}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      {/* Botão Done */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.85}
        >
          <Text style={styles.doneButtonText}>Finalizar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

