import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';

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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CREAM },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 14,
  },
  headerTitle: { fontSize: 22, fontWeight: '800', color: INK, letterSpacing: -0.4 },
  cartButton: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: '#ECECEC',
  },
  cartBadge: {
    position: 'absolute', top: -2, right: -2,
    width: 16, height: 16, borderRadius: 8,
    backgroundColor: PURPLE,
    justifyContent: 'center', alignItems: 'center',
  },
  cartBadgeText: { fontSize: 9, color: '#fff', fontWeight: '700' },

  scroll: { paddingBottom: 24 },

  // Avatar
  avatarSection: { alignItems: 'center', paddingVertical: 24 },
  avatarWrapper: { position: 'relative', marginBottom: 14 },
  avatar: {
    width: 88, height: 88, borderRadius: 44,
    backgroundColor: PURPLE,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 3, borderColor: '#FFFFFF',
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3, shadowRadius: 12,
    elevation: 6,
  },
  avatarInitials: { fontSize: 30, fontWeight: '800', color: '#FFFFFF' },
  avatarEditBtn: {
    position: 'absolute', bottom: 0, right: 0,
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1.5, borderColor: PURPLE_SOFT,
  },
  userName: { fontSize: 20, fontWeight: '800', color: INK, letterSpacing: -0.3, marginBottom: 4 },
  userEmail: { fontSize: 13, color: '#9E9E9E', marginBottom: 10 },
  memberBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: PURPLE_SOFT,
    paddingHorizontal: 12, paddingVertical: 5,
    borderRadius: 20,
  },
  memberBadgeText: { fontSize: 11, color: PURPLE, fontWeight: '600' },

  // Stats
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 20, marginBottom: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16, padding: 20,
    borderWidth: 1, borderColor: '#ECECEC',
  },
  statCard: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '800', color: PURPLE, marginBottom: 4 },
  statLabel: { fontSize: 11, color: '#9E9E9E' },
  statDivider: { width: 1, backgroundColor: '#F0F0F0' },

  // Menu
  menuSection: { marginHorizontal: 20, marginBottom: 16 },
  menuSectionTitle: {
    fontSize: 11, fontWeight: '700', color: '#BBBBBB',
    textTransform: 'uppercase', letterSpacing: 0.8,
    marginBottom: 8, marginLeft: 4,
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1, borderColor: '#ECECEC',
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14, gap: 14,
  },
  menuItemIcon: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: PURPLE_SOFT,
    justifyContent: 'center', alignItems: 'center',
  },
  menuItemLabel: { flex: 1, fontSize: 14, fontWeight: '500', color: INK },
  menuDivider: { height: 1, backgroundColor: '#F5F5F5', marginLeft: 66 },

  version: {
    textAlign: 'center', fontSize: 11,
    color: '#CCCCCC', marginTop: 8, marginBottom: 4,
  },

  // Tab Bar
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1, borderTopColor: '#F0F0F0',
    paddingVertical: 10, paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  tabItem: { flex: 1, alignItems: 'center', position: 'relative' },
  tabActiveIndicator: {
    position: 'absolute', top: -10,
    width: 24, height: 3, borderRadius: 2,
    backgroundColor: PURPLE,
  },
  tabLabel:       { fontSize: 10, color: '#BBBBBB', marginTop: 3 },
  tabLabelActive: { fontSize: 10, color: PURPLE, fontWeight: '700', marginTop: 3 },
  tabBadge: {
    position: 'absolute', top: -4, right: -8,
    width: 14, height: 14, borderRadius: 7,
    backgroundColor: PURPLE,
    justifyContent: 'center', alignItems: 'center',
  },
  tabBadgeText: { fontSize: 8, color: '#fff', fontWeight: '700' },
});