import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { AHeader, AButton, AIconButton, AInput } from '../../components/accessible';
import { useAuth } from '../../context/AuthContext';
import { styles } from './RegisterScreen.styles';

const PURPLE      = '#5C3D99';
const PURPLE_SOFT = '#EDE8F7';
const CREAM       = '#FAF8F4';
const INK         = '#1A1035';

interface Props {
  navigation: any;
}

export function RegisterScreen({ navigation }: Props) {
  const { signUp } = useAuth();

  const [form, setForm] = useState({
    first_name: '',
    last_name:  '',
    email:      '',
    phone:      '',
    password:   '',
    password2:  '',
  });

  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [showPassword, setShowPassword]   = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isLoading, setIsLoading]         = useState(false);

  function update(field: keyof typeof form, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
    // limpa erro do campo ao digitar
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  }

  function validate() {
    const newErrors: Partial<typeof form> = {};

    if (!form.first_name.trim()) newErrors.first_name = 'Nome é obrigatório.';
    if (!form.last_name.trim())  newErrors.last_name  = 'Sobrenome é obrigatório.';
    if (!form.email.trim())      newErrors.email      = 'Email é obrigatório.';
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = 'Email inválido.';
    if (!form.password)          newErrors.password   = 'Senha é obrigatória.';
    else if (form.password.length < 6)
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres.';
    if (!form.password2)         newErrors.password2  = 'Confirme sua senha.';
    else if (form.password !== form.password2)
      newErrors.password2 = 'As senhas não coincidem.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleRegister() {
    if (!validate()) return;

    setIsLoading(true);
    try {
      await signUp({
        first_name: form.first_name.trim(),
        last_name:  form.last_name.trim(),
        email:      form.email.trim().toLowerCase(),
        phone:      form.phone.trim(),
        password:   form.password,
        password2:  form.password2,
      });
      // AuthContext atualiza o user → Routes redireciona para Home automaticamente
    } catch (error: any) {
      const data = error?.response?.data;
      if (data) {
        // Mapeia erros de campo vindos do DRF
        const fieldErrors: Partial<typeof form> = {};
        if (data.email)     fieldErrors.email     = data.email[0];
        if (data.password)  fieldErrors.password  = data.password[0];
        if (data.password2) fieldErrors.password2 = data.password2[0];
        if (Object.keys(fieldErrors).length > 0) {
          setErrors(fieldErrors);
        } else {
          Alert.alert('Erro ao cadastrar', data.detail || 'Tente novamente.');
        }
      } else {
        Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={CREAM} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >

          {/* Botão voltar */}
          <AIconButton
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            label="Voltar para a tela anterior"
          >
            <Ionicons name="arrow-back" size={24} color={INK} />
          </AIconButton>

          {/* Cabeçalho */}
          <View style={styles.headerSection}>
            <View style={styles.iconWrapper}>
              <Ionicons name="book-outline" size={32} color={PURPLE} />
            </View>
            <AHeader level={1} style={styles.title}>Criar conta</AHeader>
            <Text style={styles.subtitle}>Preencha os dados abaixo para começar</Text>
          </View>

          {/* Formulário */}
          <View style={styles.form}>

            {/* Nome e Sobrenome lado a lado */}
            <View style={styles.row}>
              <View style={styles.rowField}>
                <AInput
                  label="Nome"
                  placeholder="Ex: Ana"
                  value={form.first_name}
                  onChangeText={v => update('first_name', v)}
                  autoCapitalize="words"
                  returnKeyType="next"
                  error={errors.first_name}
                />
              </View>
              <View style={styles.rowSpacer} />
              <View style={styles.rowField}>
                <AInput
                  label="Sobrenome"
                  placeholder="Ex: Beatriz"
                  value={form.last_name}
                  onChangeText={v => update('last_name', v)}
                  autoCapitalize="words"
                  returnKeyType="next"
                  error={errors.last_name}
                />
              </View>
            </View>

            <AInput
              label="Email"
              placeholder="seu@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              value={form.email}
              onChangeText={v => update('email', v)}
              error={errors.email}
            />

            <AInput
              label="Telefone"
              placeholder="(82) 99999-9999"
              keyboardType="phone-pad"
              returnKeyType="next"
              value={form.phone}
              onChangeText={v => update('phone', v)}
              optional
            />

            {/* Senha */}
            <View style={{ position: 'relative' }}>
              <AInput
                label="Senha"
                placeholder="Mínimo 6 caracteres"
                secureTextEntry={!showPassword}
                returnKeyType="next"
                value={form.password}
                onChangeText={v => update('password', v)}
                error={errors.password}
              />
              <AIconButton
                style={styles.eyeBtn}
                onPress={() => setShowPassword(!showPassword)}
                label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#9E9E9E"
                />
              </AIconButton>
            </View>

            {/* Confirmar senha */}
            <View style={{ position: 'relative' }}>
              <AInput
                label="Confirmar senha"
                placeholder="Repita a senha"
                secureTextEntry={!showPassword2}
                returnKeyType="done"
                value={form.password2}
                onChangeText={v => update('password2', v)}
                error={errors.password2}
              />
              <AIconButton
                style={styles.eyeBtn}
                onPress={() => setShowPassword2(!showPassword2)}
                label={showPassword2 ? 'Ocultar confirmação de senha' : 'Mostrar confirmação de senha'}
              >
                <Ionicons
                  name={showPassword2 ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#9E9E9E"
                />
              </AIconButton>
            </View>

          </View>

          {/* Botão cadastrar */}
          <AButton
            label="Criar conta"
            hint="Envia seus dados e cria uma nova conta"
            variant="primary"
            style={styles.registerButton}
            onPress={handleRegister}
            loading={isLoading}
          />

          {/* Link para login */}
          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Já tem uma conta? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              accessibilityRole="button"
              accessibilityHint="Ir para a tela de login"
            >
              <Text style={styles.loginLink}>Entrar</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

