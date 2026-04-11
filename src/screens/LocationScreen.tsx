import React, { useState, useEffect, useRef } from 'react';
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

const PURPLE = '#5C3D99';
const PURPLE_LIGHT = '#EDE8F7';

interface AddressForm {
  phone: string;
  name: string;
  governorate: string;
  city: string;
  block: string;
  streetName: string;
  buildingName: string;
  floor: string;
  flat: string;
  avenue: string;
}

interface Props {
  navigation: any;
}

// ─── Tela 4.1: Mapa + Endereço detectado ────────────────────────────────────
function MapStep({
  onConfirm,
  onUseGPS,
  detectedAddress,
  region,
  loadingGPS,
}: {
  onConfirm: () => void;
  onUseGPS: () => void;
  detectedAddress: string;
  region: Region | null;
  loadingGPS: boolean;
}) {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

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
            <Text style={styles.detailCardTitle}>Detail Address</Text>
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
                  {loadingGPS ? 'Detectando localização...' : 'Pressione o ícone GPS para detectar'}
                </Text>
              )}
            </View>
          </View>

          {/* Save Address As */}
          <SaveAddressAs />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmButton} onPress={onConfirm} activeOpacity={0.85}>
          <Text style={styles.confirmButtonText}>Confirmation</Text>
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
      <Text style={styles.saveAsLabel}>Save Address As</Text>
      <View style={styles.saveAsChips}>
        <TouchableOpacity
          style={[styles.chip, selected === 'home' && styles.chipActive]}
          onPress={() => setSelected('home')}
        >
          <Text style={[styles.chipText, selected === 'home' && styles.chipTextActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.chip, selected === 'offices' && styles.chipActive]}
          onPress={() => setSelected('offices')}
        >
          <Text style={[styles.chipText, selected === 'offices' && styles.chipTextActive]}>Offices</Text>
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
    phone: '',
    name: '',
    governorate: '',
    city: '',
    block: '',
    streetName: '',
    buildingName: '',
    floor: '',
    flat: '',
    avenue: '',
  });

  function update(field: keyof AddressForm, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  const fields: { key: keyof AddressForm; label: string; optional?: boolean }[] = [
    { key: 'phone', label: 'Phone' },
    { key: 'name', label: 'Name' },
    { key: 'governorate', label: 'Governorate' },
    { key: 'city', label: 'City' },
    { key: 'block', label: 'Block' },
    { key: 'streetName', label: 'Street name /number' },
    { key: 'buildingName', label: 'Building name/number' },
    { key: 'floor', label: 'Floor (option)', optional: true },
    { key: 'flat', label: 'Flat(option)', optional: true },
    { key: 'avenue', label: 'Avenue (option)', optional: true },
  ];

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formScrollContent}>
        {fields.map(({ key, label, optional }) => (
          <View key={key} style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>{label}</Text>
            <TextInput
              style={styles.input}
              placeholder={label}
              placeholderTextColor="#C4C4C4"
              value={form[key]}
              onChangeText={v => update(key, v)}
              keyboardType={key === 'phone' ? 'phone-pad' : 'default'}
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
          <Text style={styles.confirmButtonText}>Confirmation</Text>
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

  // Tenta pegar GPS ao montar a tela
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
        setLoadingGPS(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { latitude, longitude } = location.coords;

      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      // Geocoding reverso — transforma coordenadas em endereço legível
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
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível obter a localização.');
    } finally {
      setLoadingGPS(false);
    }
  }

  function handleMapConfirm() {
    setStep('form');
  }

  function handleFormConfirm(form: AddressForm) {
    // TODO: salvar endereço e navegar de volta
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          if (step === 'form') setStep('map');
          else navigation.goBack();
        }}>
          <Ionicons name="arrow-back-outline" size={22} color="#1A1035" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Location</Text>
        {step === 'map' ? (
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={22} color="#1A1035" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleUseGPS}>
            {loadingGPS
              ? <ActivityIndicator size="small" color={PURPLE} />
              : <Ionicons name="locate-outline" size={22} color={PURPLE} />
            }
          </TouchableOpacity>
        )}
      </View>

      {step === 'map' ? (
        <MapStep
          onConfirm={handleMapConfirm}
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

// ─── Estilos ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: { fontSize: 17, fontWeight: '600', color: '#1A1035' },

  scrollContent: { paddingBottom: 24 },
  formScrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 24 },

  // Mapa
  mapContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
    height: 200,
  },
  map: { width: '100%', height: '100%' },
  mapPlaceholder: {
    backgroundColor: PURPLE_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Marker customizado
  markerOuter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(92,61,153,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: PURPLE,
  },

  // Card de endereço
  detailCard: {
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  detailCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  detailCardTitle: { fontSize: 15, fontWeight: '700', color: '#1A1035' },
  gpsButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: PURPLE_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addressRow: { flexDirection: 'row', alignItems: 'flex-start' },
  locationDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: PURPLE_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  addressTextBlock: { flex: 1 },
  addressStreet: { fontSize: 14, fontWeight: '600', color: '#1A1035', marginBottom: 4 },
  addressFull: { fontSize: 12, color: '#9E9E9E', lineHeight: 18 },
  addressPlaceholder: { fontSize: 13, color: '#C4C4C4', fontStyle: 'italic' },

  // Save as
  saveAsBlock: { marginTop: 20 },
  saveAsLabel: { fontSize: 13, fontWeight: '600', color: '#1A1035', marginBottom: 10 },
  saveAsChips: { flexDirection: 'row', gap: 10 },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  chipActive: { backgroundColor: PURPLE_LIGHT, borderColor: PURPLE },
  chipText: { fontSize: 13, color: '#9E9E9E' },
  chipTextActive: { color: PURPLE, fontWeight: '600' },

  // Formulário
  fieldGroup: { marginBottom: 16 },
  fieldLabel: { fontSize: 13, fontWeight: '600', color: '#1A1035', marginBottom: 6 },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 13,
    color: '#1A1035',
    backgroundColor: '#FAFAFA',
  },

  // Footer
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  confirmButton: {
    backgroundColor: PURPLE,
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmButtonText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
});