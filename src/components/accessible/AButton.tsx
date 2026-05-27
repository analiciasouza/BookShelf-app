import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';

const PURPLE = '#5C3D99';
const INK    = '#1A1035';

interface AButtonProps extends TouchableOpacityProps {
  label: string;
  hint?: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
}

export function AButton({
  label,
  hint,
  loading = false,
  disabled = false,
  variant = 'primary',
  style,
  ...rest
}: AButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      accessible
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={hint}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={[
        styles.base,
        styles[variant],
        isDisabled && styles.disabled,
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? '#fff' : PURPLE}
          accessibilityLabel="Carregando"
        />
      ) : (
        <Text style={[styles.text, styles[`${variant}Text` as keyof typeof styles]]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 44,
    minWidth: 44,
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary:       { backgroundColor: PURPLE },
  secondary:     { backgroundColor: '#fff', borderWidth: 1.5, borderColor: PURPLE },
  ghost:         { backgroundColor: 'transparent' },
  danger:        { backgroundColor: '#C7524A' },
  disabled:      { opacity: 0.5 },
  text:          { fontSize: 15, fontWeight: '700' },
  primaryText:   { color: '#fff' },
  secondaryText: { color: PURPLE },
  ghostText:     { color: PURPLE },
  dangerText:    { color: '#fff' },
});