import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';

const INK = '#1A1035';

interface AInputProps extends TextInputProps {
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
}

export function AInput({
  label,
  hint,
  error,
  optional = false,
  style,
  ...rest
}: AInputProps) {
  const labelText = optional ? `${label} (opcional)` : label;

  return (
    <View style={styles.wrapper}>
      <Text
        style={styles.label}
        nativeID={`label-${label}`}
      >
        {labelText}
      </Text>

      <TextInput
        accessible
        accessibilityLabel={labelText}
        accessibilityHint={hint}
        accessibilityState={{ disabled: rest.editable === false }}
        accessibilityValue={error ? { text: `Erro: ${error}` } : undefined}
        style={[styles.input, error ? styles.inputError : undefined, style]}
        placeholderTextColor="#9E9E9E"
        {...rest}
      />

      {error && (
        <Text
          style={styles.error}
          accessibilityLiveRegion="polite"
          role="alert"
        >
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label:   { fontSize: 13, fontWeight: '600', color: INK, marginBottom: 6 },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 13,
    color: INK,
    backgroundColor: '#FAFAFA',
  },
  inputError: { borderColor: '#C7524A' },
  error:      { fontSize: 11, color: '#C7524A', marginTop: 4 },
});