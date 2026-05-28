import React from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';

const INK = '#1A1035';

interface AHeaderProps {
  children: string;
  level?: 1 | 2 | 3;
  style?: StyleProp<TextStyle>;
}

export function AHeader({ children, level = 2, style }: AHeaderProps) {
  const sizes: Record<number, number> = { 1: 22, 2: 17, 3: 15 };
  const weights: Record<number, '700' | '600'> = { 1: '700', 2: '700', 3: '600' };

  return (
    <Text
      accessible
      accessibilityRole="header"
      style={[
        {
          fontSize: sizes[level],
          fontWeight: weights[level],
          color: INK,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}