import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, ScrollView, ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import MapView, { Marker, Region } from 'react-native-maps';

import { styles } from './LocationScreen.styles';
import { AHeader, AButton, AIconButton, AInput } from '../../components/accessible';

const PURPLE = '#5C3D99';

interface AddressForm {
  city: string;
  block: string;
  streetName: string;
  avenue: string;
}

interface Props {
  navigation: any;
}

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
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.mapContainer} accessible accessibilityLabel="Visualização do mapa da sua região de entrega">
          {region ? (
            <MapView style={styles.map} region={region} scrollEnabled={false} zoomEnabled={false}>
              <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
            </MapView>
          ) : (
            <View style={[styles.map, styles.mapPlaceholder]}>
              {loadingGPS ? <ActivityIndicator color={PURPLE} size="large" /> : <Ionicons name="map-outline" size={48} color="#C0B8D8" />}
            </View>
          )}
        </View>

        <View style={styles.detailCard}>
          <View style={styles.detailCardHeader}>
            <AHeader level={2} style={styles.detailCardTitle}>Detalhar Endereço</AHeader>
            <AIconButton onPress={onUseGPS} label="Detectar localização pelo GPS atual">
              <Ionicons name="locate-outline" size={20} color={PURPLE} />
            </AIconButton>
          </View>

          <View style={styles.addressRow} accessible accessibilityLabel={`Endereço detectado: ${detectedAddress || 'Nenhum endereço detectado ainda.'}`}>
            <View style={styles.locationDot}><Ionicons name="location" size={16} color={PURPLE} /></View>
            <View style={styles.addressTextBlock}>
              {detectedAddress ? (
                <>
                  <Text style={styles.addressStreet}>{detectedAddress.split(',')[0]}</Text>
                  <Text style={styles.addressFull}>{detectedAddress}</Text>
                </>
              ) : (
                <Text style={styles.addressPlaceholder}>
                  {loadingGPS ? 'Detectando localização...' : 'Pressione o ícone GPS para detectar'}
                </Text>
              )}
            </View>
          </View>

          <SaveAddressAs />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <AButton label="Confirmar" variant="primary" style={styles.confirmButton} onPress={onConfirm} disabled={!detectedAddress || loadingGPS} />
        <AButton label="Cadastrar endereço manualmente" variant="secondary" style={styles.manualButton} onPress={onManual} />
      </View>
    </KeyboardAvoidingView>
  );
}

function SaveAddressAs() {
  const [selected, setSelected] = useState<'home' | 'offices'>('home');
  return (
    <View style={styles.saveAsBlock}>
      <Text style={styles.saveAsLabel}>Salvar Endereço Como</Text>
      <View style={styles.saveAsChips} accessibilityRole="radiogroup">
        <AIconButton
          label="Selecionar endereço tipo Casa"
          hint={selected === 'home' ? 'Já selecionado' : 'Toque duas vezes para selecionar'}
          style={[
            styles.chip, 
            { minHeight: 40, paddingHorizontal: 16, borderRadius: 20 },
            selected === 'home' ? { backgroundColor: '#5C3D99' } : { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#5C3D99' }
          ]}
          onPress={() => setSelected('home')}
          accessibilityState={{ selected: selected === 'home' }}>
          <Text style={{ 
            fontSize: 14, 
            fontWeight: '600', 
            color: selected === 'home' ? '#FFF' : '#5C3D99' 
          }}>
            Casa
          </Text>
        </AIconButton>

        <AIconButton
          label="Selecionar endereço tipo Trabalho"
          hint={selected === 'offices' ? 'Já selecionado' : 'Toque duas vezes para selecionar'}
          style={[
            styles.chip, 
            { minHeight: 40, paddingHorizontal: 16, borderRadius: 20, marginLeft: 8 },
            selected === 'offices' ? { backgroundColor: '#5C3D99' } : { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#5C3D99' }
          ]}
          onPress={() => setSelected('offices')}
          accessibilityState={{ selected: selected === 'offices' }}>
          <Text style={{ 
            fontSize: 14, 
            fontWeight: '600', 
            color: selected === 'offices' ? '#FFF' : '#5C3D99' 
          }}>
            Trabalho
          </Text>
        </AIconButton>
      </View>
    </View>
  );
}

function FormStep({ onConfirm }: { onConfirm: (form: AddressForm) => void }) {
  const [form, setForm] = useState<AddressForm>({ city: '', block: '', streetName: '', avenue: '' });

  function update(field: keyof AddressForm, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formScrollContent}>
        <AInput label="Cidade" placeholder="Digite sua cidade" value={form.city} onChangeText={v => update('city', v)} />
        <AInput label="Bairro" placeholder="Digite seu bairro" value={form.block} onChangeText={v => update('block', v)} />
        <AInput label="Nome da rua / número" placeholder="Ex: Rua das Flores, 123" value={form.streetName} onChangeText={v => update('streetName', v)} />
        <AInput label="Complemento" placeholder="Ex: Apto 42 (opcional)" value={form.avenue} onChangeText={v => update('avenue', v)} optional />
      </ScrollView>

      <View style={styles.footer}>
        <AButton label="Confirmar Endereço" variant="primary" style={styles.confirmButton} onPress={() => onConfirm(form)} />
      </View>
    </KeyboardAvoidingView>
  );
}

export function LocationScreen({ navigation }: Props) {
  const [step, setStep] = useState<'map' | 'form'>('map');
  const [region, setRegion] = useState<Region | null>(null);
  const [detectedAddress, setDetectedAddress] = useState('');
  const [loadingGPS, setLoadingGPS] = useState(false);

  useEffect(() => { handleUseGPS(); }, []);

  async function handleUseGPS() {
    setLoadingGPS(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Permita o acesso à localização nas configurações.');
        return;
      }
      const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      const { latitude, longitude } = location.coords;
      setRegion({ latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 });

      const [place] = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (place) {
        const parts = [place.street, place.streetNumber, place.district, place.city, place.region].filter(Boolean);
        setDetectedAddress(parts.join(', '));
      }
    } catch {
      Alert.alert('Erro', 'Não foi possível obter a localização.');
    } finally {
      setLoadingGPS(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <AIconButton onPress={() => { step === 'form' ? setStep('map') : navigation.goBack(); }} label="Voltar">
          <Ionicons name="arrow-back-outline" size={22} color="#1A1035" />
        </AIconButton>
        <AHeader level={1} style={styles.headerTitle}>Localização</AHeader>
        <View style={{ width: 44 }} />
      </View>

      {step === 'map' ? (
        <MapStep onConfirm={() => setStep('form')} onManual={() => setStep('form')} onUseGPS={handleUseGPS} detectedAddress={detectedAddress} region={region} loadingGPS={loadingGPS} />
      ) : (
        <FormStep onConfirm={(form) => navigation.goBack()} />
      )}
    </SafeAreaView>
  );
}