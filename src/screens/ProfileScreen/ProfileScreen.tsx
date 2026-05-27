import React from 'react';
import { View, Text, StatusBar, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useCart } from '../../context/CartContext';
import { styles } from './ProfileScreen.styles';
import { AHeader, AIconButton, ACard } from '../../components/accessible';

const PURPLE = '#5C3D99';
const CREAM = '#FAF8F4';
const INK = '#1A1035';

interface Props { navigation: any; }

const USER = { name: 'Ana Beatriz', email: 'ana.beatriz@email.com', memberSince: 'Janeiro 2024', totalOrders: 8 };

function MenuSection({ title, items }: { title: string; items: { icon: string; label: string; onPress: () => void; danger?: boolean }[] }) {
  return (
    <View style={styles.menuSection}>
      {title ? <AHeader level={3} style={styles.menuSectionTitle}>{title}</AHeader> : null}
      <View style={styles.menuCard}>
        {items.map((item, index) => (
          <React.Fragment key={item.label}>
            <ACard style={styles.menuItem} label={`${item.label}`} hint="Toque duas vezes para acessar esta opção" onPress={item.onPress}>
              <View style={[styles.menuItemIcon, item.danger && { backgroundColor: '#FADFDD' }]}>
                <Ionicons name={item.icon as any} size={18} color={item.danger ? '#C7524A' : PURPLE} />
              </View>
              <Text style={[styles.menuItemLabel, item.danger && { color: '#C7524A' }]}>{item.label}</Text>
              <Ionicons name="chevron-forward-outline" size={16} color="#CCCCCC" />
            </ACard>
            {index < items.length - 1 && <View style={styles.menuDivider} />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

export function ProfileScreen({ navigation }: Props) {
  const { cart, handleClearCart } = useCart();
  const cartCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);

  function handleLogout() {
    Alert.alert('Sair da conta', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: () => { handleClearCart(); navigation.navigate('Login'); } },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={CREAM} />

      <View style={styles.header}>
        <AHeader level={1} style={styles.headerTitle}>Meu Perfil</AHeader>
        <AIconButton style={styles.cartButton} onPress={() => navigation.navigate('Cart')} label="Ir para o carrinho">
          <Ionicons name="bag-outline" size={22} color={INK} />
        </AIconButton>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.avatarSection} accessible accessibilityLabel={`Perfil de ${USER.name}, e-mail ${USER.email}.`}>
          <View style={styles.avatar}><Text style={styles.avatarInitials}>AB</Text></View>
          <Text style={styles.userName}>{USER.name}</Text>
          <Text style={styles.userEmail}>{USER.email}</Text>
        </View>

        <MenuSection title="Conta" items={[
          { icon: 'person-outline', label: 'Editar dados pessoais', onPress: () => {} },
          { icon: 'location-outline', label: 'Meus endereços', onPress: () => navigation.navigate('Location') },
        ]} />

        <MenuSection title="" items={[
          { icon: 'log-out-outline', label: 'Sair da conta', onPress: handleLogout, danger: true },
        ]} />
      </ScrollView>

      {/* Tab Bar */}
      <View style={styles.tabBar} accessibilityRole="tablist">
        <AIconButton style={styles.tabItem} onPress={() => navigation.navigate('Home')} label="Home, aba 1 de 3" accessibilityState={{ selected: false }}>
          <Ionicons name="home-outline" size={22} color="#BBBBBB" />
          <Text style={styles.tabLabel}>Home</Text>
        </AIconButton>
        <AIconButton style={styles.tabItem} onPress={() => navigation.navigate('Cart')} label="Carrinho, aba 2 de 3" accessibilityState={{ selected: false }}>
          <Ionicons name="bag-outline" size={22} color="#BBBBBB" />
          <Text style={styles.tabLabel}>Carrinho</Text>
        </AIconButton>
        <AIconButton style={styles.tabItem} onPress={() => navigation.navigate('Profile')} label="Perfil, aba 3 de 3" accessibilityState={{ selected: true }}>
          <Ionicons name="person" size={22} color={PURPLE} />
          <Text style={styles.tabLabelActive}>Perfil</Text>
        </AIconButton>
      </View>
    </SafeAreaView>
  );
}