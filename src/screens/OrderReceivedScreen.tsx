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

const PURPLE = '#5C3D99';
const PURPLE_LIGHT = '#EDE8F7';

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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
  },

  illustrationBox: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  illustrationEmoji: { fontSize: 72 },
  sparkles: { position: 'absolute', width: '100%', height: '100%' },
  sparkle: { position: 'absolute', fontSize: 18, color: PURPLE },

  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1035',
    textAlign: 'center',
    marginBottom: 6,
  },
  orderId: { fontSize: 13, color: '#9E9E9E', marginBottom: 28 },

  feedbackCard: {
    width: '100%',
    backgroundColor: PURPLE_LIGHT,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  feedbackTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: PURPLE,
    marginBottom: 6,
    textAlign: 'center',
  },
  feedbackSubtitle: {
    fontSize: 12,
    color: '#7B61B0',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 18,
  },
  starsRow: { flexDirection: 'row', marginBottom: 16 },
  feedbackInput: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    fontSize: 13,
    color: '#1A1035',
    minHeight: 80,
    borderWidth: 1,
    borderColor: '#E8E0F0',
  },

  footer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  doneButton: {
    backgroundColor: PURPLE,
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  doneButtonText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
});