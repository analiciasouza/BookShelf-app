import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface ACardProps extends TouchableOpacityProps {
  label: string;  // screen reader lê o card inteiro com esse label
  hint?: string;
  children: React.ReactNode;
}

export function ACard({ label, hint, children, style, ...rest }: ACardProps) {
  return (
    <TouchableOpacity
      accessible
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={hint}
      style={style}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
}