import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import MapView, { Marker, Region } from 'react-native-maps';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './LocationScreen.styles';

const PURPLE = '#5C3D99';
const PURPLE_LIGHT = '#EDE8F7';

interface AddressForm {
  city: string;
  block: string;
  streetName: string;
  avenue: string;
}

interface Props {
  navigation: any;
}

// ─── Tela 4.1: Mapa + Endereço detectado ────────────────────────────────────
function MapStep({
  onConfirm,
  onManual,
  onUseGPS,
  detectedAddress,
  region,
  loadingGPS,
}: {
  onConfirm: () => void;
  onManual: () => void;
  onUseGPS: () => void;
  detectedAddress: string;
  region: Region | null;
  loadingGPS: boolean;
}) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Mapa */}
        <View style={styles.mapContainer}>
          {region ? (
            <MapView
              style={styles.map}
              region={region}
              scrollEnabled={false}
              zoomEnabled={false}
            >
              <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }}>
                <View style={styles.markerOuter}>
                  <View style={styles.markerInner} />
                </View>
              </Marker>
            </MapView>
          ) : (
            <View style={[styles.map, styles.mapPlaceholder]}>
              {loadingGPS ? (
                <ActivityIndicator color={PURPLE} size="large" />
              ) : (
                <Ionicons name="map-outline" size={48} color="#C0B8D8" />
              )}
            </View>
          )}
        </View>

        {/* Detail Address */}
        <View style={styles.detailCard}>
          <View style={styles.detailCardHeader}>
            <Text style={styles.detailCardTitle}>Detalhar Endereço</Text>
            <TouchableOpacity onPress={onUseGPS} style={styles.gpsButton}>
              {loadingGPS ? (
                <ActivityIndicator size="small" color={PURPLE} />
              ) : (
                <Ionicons name="locate-outline" size={20} color={PURPLE} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.addressRow}>
            <View style={styles.locationDot}>
              <Ionicons name="location" size={16} color={PURPLE} />
            </View>
            <View style={styles.addressTextBlock}>
              {detectedAddress ? (
                <>
                  <Text style={styles.addressStreet} numberOfLines={1}>
                    {detectedAddress.split(',')[0]}
                  </Text>
                  <Text style={styles.addressFull} numberOfLines={2}>
                    {detectedAddress}
                  </Text>
                </>
              ) : (
                <Text style={styles.addressPlaceholder}>
                  {loadingGPS
                    ? 'Detectando localização...'
                    : 'Pressione o ícone GPS para detectar'}
                </Text>
              )}
            </View>
          </View>

          <SaveAddressAs />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {/* Botão principal — confirma com GPS */}
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={onConfirm}
          activeOpacity={0.85}
        >
          <Text style={styles.confirmButtonText}>Confirmar</Text>
        </TouchableOpacity>

        {/* Botão secundário — cadastro manual */}
        <TouchableOpacity
          style={styles.manualButton}
          onPress={onManual}
          activeOpacity={0.7}
        >
          <Ionicons name="create-outline" size={16} color={PURPLE} />
          <Text style={styles.manualButtonText}>
            Cadastrar endereço manualmente
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// ─── Chip "Save Address As" ──────────────────────────────────────────────────
function SaveAddressAs() {
  const [selected, setSelected] = useState<'home' | 'offices'>('home');
  return (
    <View style={styles.saveAsBlock}>
      <Text style={styles.saveAsLabel}> Salvar Endereço </Text>
      <View style={styles.saveAsChips}>
        <TouchableOpacity
          style={[styles.chip, selected === 'home' && styles.chipActive]}
          onPress={() => setSelected('home')}
        >
          <Text style={[styles.chipText, selected === 'home' && styles.chipTextActive]}>
            Casa
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.chip, selected === 'offices' && styles.chipActive]}
          onPress={() => setSelected('offices')}
        >
          <Text style={[styles.chipText, selected === 'offices' && styles.chipTextActive]}>
           Trabalho
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Tela 4.2: Formulário de endereço ───────────────────────────────────────
function FormStep({
  onConfirm,
  onUseGPS,
  loadingGPS,
}: {
  onConfirm: (form: AddressForm) => void;
  onUseGPS: () => void;
  loadingGPS: boolean;
}) {
  const [form, setForm] = useState<AddressForm>({
    city: '',
    block: '',
    streetName: '',
    avenue: '',
  });

  function update(field: keyof AddressForm, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  const fields: { key: keyof AddressForm; label: string }[] = [
    { key: 'city', label: 'Cidade' },
    { key: 'block', label: 'Bairro' },
    { key: 'streetName', label: 'Nome da rua / número' },
    { key: 'avenue', label: 'Complemento (opcional)' },
  ];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.formScrollContent}
      >
        {fields.map(({ key, label }) => (
          <View key={key} style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>{label}</Text>
            <TextInput
              style={styles.input}
              placeholder={label}
              placeholderTextColor="#C4C4C4"
              value={form[key]}
              onChangeText={v => update(key, v)}
              returnKeyType="next"
            />
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => onConfirm(form)}
          activeOpacity={0.85}
        >
          <Text style={styles.confirmButtonText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// ─── Tela principal ──────────────────────────────────────────────────────────
export function LocationScreen({ navigation }: Props) {
  const [step, setStep] = useState<'map' | 'form'>('map');
  const [region, setRegion] = useState<Region | null>(null);
  const [detectedAddress, setDetectedAddress] = useState('');
  const [loadingGPS, setLoadingGPS] = useState(false);

  useEffect(() => {
    handleUseGPS();
  }, []);

  async function handleUseGPS() {
    setLoadingGPS(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão negada',
          'Permita o acesso à localização nas configurações do dispositivo.'
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { latitude, longitude } = location.coords;

      setRegion({ latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 });

      const [place] = await Location.reverseGeocodeAsync({ latitude, longitude });

      if (place) {
        const parts = [
          place.street,
          place.streetNumber,
          place.district,
          place.city,
          place.region,
          place.country,
        ].filter(Boolean);

        setDetectedAddress(parts.join(', '));
      }
    } catch {
      Alert.alert('Erro', 'Não foi possível obter a localização.');
    } finally {
      setLoadingGPS(false);
    }
  }

  function handleFormConfirm(form: AddressForm) {
    // TODO: salvar endereço
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (step === 'form') setStep('map');
            else navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back-outline" size={22} color="#1A1035" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Localização</Text>
        {step === 'map' ? (
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={22} color="#1A1035" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleUseGPS}>
            {loadingGPS ? (
              <ActivityIndicator size="small" color={PURPLE} />
            ) : (
              <Ionicons name="locate-outline" size={22} color={PURPLE} />
            )}
          </TouchableOpacity>
        )}
      </View>

      {step === 'map' ? (
        <MapStep
          onConfirm={() => setStep('form')}
          onManual={() => setStep('form')}
          onUseGPS={handleUseGPS}
          detectedAddress={detectedAddress}
          region={region}
          loadingGPS={loadingGPS}
        />
      ) : (
        <FormStep
          onConfirm={handleFormConfirm}
          onUseGPS={handleUseGPS}
          loadingGPS={loadingGPS}
        />
      )}
    </SafeAreaView>
  );
}

