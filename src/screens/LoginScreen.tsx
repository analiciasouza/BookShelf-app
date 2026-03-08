import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface Props {
  navigation: any;
}

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin() {
    // TODO: depois conectar com autenticação real
  navigation.navigate('Home');
}

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Botão voltar */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        {/* Título */}
        <Text style={styles.title}>Bem-vindo de volta 👋</Text>
        <Text style={styles.subtitle}>Entre na sua conta</Text>

        {/* Campo Email */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, email.length > 0 && styles.inputActive]}
          placeholder="Coloque seu email"
          placeholderTextColor="#BDBDBD"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {/* Campo Senha */}
        <Text style={styles.label}>Senha</Text>
        <View style={[styles.inputWrapper, password.length > 0 && styles.inputActive]}>
          <TextInput
            style={styles.inputInner}
            placeholder="Coloque sua senha"
            placeholderTextColor="#BDBDBD"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity style={styles.forgotWrapper}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Botão Login */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          activeOpacity={0.85}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* Cadastre-se */}
        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Não tem conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signupLink}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const PURPLE = '#5C3D99';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  backButton: {
    marginBottom: 24,
    width: 36,
    height: 36,
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 22,
    color: '#1A1035',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1A1035',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#9E9E9E',
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1035',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#1A1035',
    marginBottom: 20,
  },
  inputWrapper: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  inputInner: {
    flex: 1,
    fontSize: 14,
    color: '#1A1035',
  },
  inputActive: {
    borderColor: PURPLE,
  },
  eyeIcon: {
    fontSize: 16,
  },
  forgotWrapper: {
    alignSelf: 'flex-start',
    marginBottom: 32,
  },
  forgotText: {
    color: PURPLE,
    fontSize: 13,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: PURPLE,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#9E9E9E',
    fontSize: 14,
  },
  signupLink: {
    color: PURPLE,
    fontSize: 14,
    fontWeight: '600',
  },
});