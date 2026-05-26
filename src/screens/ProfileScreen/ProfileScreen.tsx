import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../../context/CartContext';
import { styles } from './ProfileScreen.styles';

const PURPLE      = '#5C3D99';
const PURPLE_SOFT = '#EDE8F7';
const CREAM       = '#FAF8F4';
const INK         = '#1A1035';

interface Props {
  navigation: any;
}

// ─── Dados mockados 
const USER = {
  name: 'Ana Beatriz',
  email: 'ana.beatriz@email.com',
  memberSince: 'Janeiro 2024',
  totalOrders: 8,
  totalSpent: 247.92,
};


function MenuSection({
  title,
  items,
}: {
  title: string;
  items: { icon: string; label: string; onPress: () => void; danger?: boolean }[];
}) {
  return (
    <View style={styles.menuSection}>
      <Text style={styles.menuSectionTitle}>{title}</Text>
      <View style={styles.menuCard}>
        {items.map((item, index) => (
          <React.Fragment key={item.label}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={[
                styles.menuItemIcon,
                item.danger && { backgroundColor: '#FADFDD' },
              ]}>
                <Ionicons
                  name={item.icon as any}
                  size={18}
                  color={item.danger ? '#C7524A' : PURPLE}
                />
              </View>
              <Text style={[
                styles.menuItemLabel,
                item.danger && { color: '#C7524A' },
              ]}>
                {item.label}
              </Text>
              <Ionicons name="chevron-forward-outline" size={16} color="#CCCCCC" />
            </TouchableOpacity>
            {index < items.length - 1 && <View style={styles.menuDivider} />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

// ─── Tela principal ──────────────────────────────────────────────
export function ProfileScreen({ navigation }: Props) {
  const { cart, handleClearCart } = useCart();
  const cartCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);

  function handleLogout() {
    Alert.alert(
      'Sair da conta',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => {
            handleClearCart();
            navigation.navigate('Login');
          },
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={CREAM} />

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meu Perfil</Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Ionicons name="bag-outline" size={22} color={INK} />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* ── Avatar + Nome ── */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <Text style={styles.avatarInitials}>
                {USER.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </Text>
            </View>
            <TouchableOpacity style={styles.avatarEditBtn}>
              <Ionicons name="camera-outline" size={14} color={PURPLE} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{USER.name}</Text>
          <Text style={styles.userEmail}>{USER.email}</Text>
          <View style={styles.memberBadge}>
            <Ionicons name="star" size={12} color={PURPLE} />
            <Text style={styles.memberBadgeText}>Membro desde {USER.memberSince}</Text>
          </View>
        </View>

        {/* ── Stats ── */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{USER.totalOrders}</Text>
            <Text style={styles.statLabel}>Pedidos</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{cart.items.length}</Text>
            <Text style={styles.statLabel}>No carrinho</Text>
          </View>
        </View>

        {/* ── Menus ── */}
        <MenuSection
          title="Conta"
          items={[
            {
              icon: 'person-outline',
              label: 'Editar dados pessoais',
              onPress: () => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento.'),
            },
            {
              icon: 'location-outline',
              label: 'Meus endereços',
              onPress: () => navigation.navigate('Location'),
            },
            {
              icon: 'card-outline',
              label: 'Métodos de pagamento',
              onPress: () => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento.'),
            },
          ]}
        />

        <MenuSection
          title="Pedidos"
          items={[
            {
              icon: 'receipt-outline',
              label: 'Histórico de pedidos',
              onPress: () => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento.'),
            },
            {
              icon: 'bag-outline',
              label: 'Ver carrinho',
              onPress: () => navigation.navigate('Cart'),
            },
          ]}
        />

        <MenuSection
          title="Preferências"
          items={[
            {
              icon: 'notifications-outline',
              label: 'Notificações',
              onPress: () => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento.'),
            },
            {
              icon: 'help-circle-outline',
              label: 'Ajuda e suporte',
              onPress: () => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento.'),
            },
            {
              icon: 'shield-checkmark-outline',
              label: 'Privacidade',
              onPress: () => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento.'),
            },
          ]}
        />

        <MenuSection
          title=""
          items={[
            {
              icon: 'log-out-outline',
              label: 'Sair da conta',
              onPress: handleLogout,
              danger: true,
            },
          ]}
        />

        <Text style={styles.version}>Versão 1.0.0</Text>

      </ScrollView>

      {/* ── Tab Bar ── */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={22} color="#BBBBBB" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Cart')}>
          <View>
            <Ionicons name="bag-outline" size={22} color="#BBBBBB" />
            {cartCount > 0 && (
              <View style={styles.tabBadge}>
                <Text style={styles.tabBadgeText}>{cartCount}</Text>
              </View>
            )}
          </View>
          <Text style={styles.tabLabel}>Carrinho</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Profile')}>
          <View style={styles.tabActiveIndicator} />
          <Ionicons name="person" size={22} color={PURPLE} />
          <Text style={styles.tabLabelActive}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

