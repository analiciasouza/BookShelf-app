import React, { useState } from 'react';
import { View, Text, StatusBar, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './LoginScreen.styles';
import { AHeader, AButton, AIconButton, AInput } from '../../components/accessible';

interface Props {
  navigation: any;
}

export function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      alert('Por favor, preencha email e senha');
      return;
    }
    navigation.navigate('Home');
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <KeyboardAvoidingView style={styles.inner} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        
        <AIconButton onPress={() => navigation.goBack()} style={styles.backButton} label="Voltar para a tela inicial">
          <Ionicons name="arrow-back" size={24} color="#1A1035" />
        </AIconButton>

        <AHeader level={1} style={styles.title}>Bem-vindo de volta 👋</AHeader>
        <Text style={styles.subtitle}>Entre na sua conta</Text>

        <AInput
          label="Email"
          placeholder="Coloque seu email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <View style={{ position: 'relative' }}>
          <AInput
            label="Senha"
            placeholder="Coloque sua senha"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <AIconButton
            style={{ position: 'absolute', right: 10, top: 28, height: 44, justifyContent: 'center' }}
            onPress={() => setShowPassword(!showPassword)}
            label={showPassword ? "Ocultar senha" : "Mostrar senha em texto claro"}
          >
            <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#9E9E9E" />
          </AIconButton>
        </View>

        <TouchableOpacity style={styles.forgotWrapper} accessibilityRole="button" accessibilityLabel="Esqueceu a senha? Recuperar credenciais.">
          <Text style={styles.forgotText}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <AButton label="Login" variant="primary" style={styles.loginButton} onPress={handleLogin} />

        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Não tem conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')} accessibilityRole="button" accessibilityHint="Leva para o formulário de cadastro">
            <Text style={styles.signupLink}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}