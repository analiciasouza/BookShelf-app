import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AIconButton } from './AIconButton';

interface AStarRatingProps {
  rating: number;
  onRate: (value: number) => void;
  max?: number;
}

export function AStarRating({ rating, onRate, max = 5 }: AStarRatingProps) {
  return (
    <View
      style={styles.row}
      accessible={false}
      // o container não é focável — cada estrela tem seu próprio label
    >
      {Array.from({ length: max }, (_, i) => i + 1).map((value) => (
        <AIconButton
          key={value}
          label={`${value} estrela${value > 1 ? 's' : ''}`}
          hint={`Dar nota ${value} de ${max}`}
          onPress={() => onRate(value)}
          style={styles.btn}
          accessibilityState={{ selected: value <= rating }}
        >
          <Ionicons
            name={value <= rating ? 'star' : 'star-outline'}
            size={36}
            color={value <= rating ? '#F5A623' : '#E0E0E0'}
          />
        </AIconButton>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  btn: { marginHorizontal: 2 },
});