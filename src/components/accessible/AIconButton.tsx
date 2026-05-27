import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';

interface AIconButtonProps extends TouchableOpacityProps {
  label: string;   // obrigatório — lido pelo screen reader no lugar do ícone
  hint?: string;
  children: React.ReactNode;
}

export function AIconButton({
  label,
  hint,
  children,
  style,
  ...rest
}: AIconButtonProps) {
  return (
    <TouchableOpacity
      accessible
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={hint}
      style={[styles.base, style]}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    minWidth: 44,   // touch target mínimo WCAG AA
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});