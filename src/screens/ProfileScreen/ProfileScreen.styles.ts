
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');


const PURPLE      = '#5C3D99';
const PURPLE_MID  = '#7B5BC4';
const PURPLE_SOFT = '#EDE8F7';
const PURPLE_DARK = '#2E1A6E';
const CREAM       = '#FAF8F4';
const INK         = '#1A1035';



export const styles = StyleSheet.create({
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