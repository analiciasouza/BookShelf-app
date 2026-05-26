import Ionicons from '@expo/vector-icons/build/Ionicons';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './LoginScreen.styles';

interface Props {
  navigation: any;
}

export function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin() {
    // TODO: depois conectar com autenticação real
    if (!email || !password) {
      alert('Por favor, preencha email e senha');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { 
      alert('Por favor, insira um email válido');
      return;
    }

    if (password.length < 8) {
      alert('A senha deve conter pelo menos 8 caracteres');
      return;
    }
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
            <Ionicons 
              name={showPassword ? 'eye-off-outline' : 'eye-outline'} 
              size={20} 
              color="#9E9E9E" 
            />
          </TouchableOpacity>
        </View>

        
        <TouchableOpacity style={styles.forgotWrapper}>
          <Text style={styles.forgotText}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          activeOpacity={0.85}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

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

