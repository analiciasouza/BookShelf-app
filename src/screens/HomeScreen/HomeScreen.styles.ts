import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 56) / 2;
const FEATURED_WIDTH = width - 40;

const PURPLE      = '#5C3D99';
const PURPLE_MID  = '#7B5BC4';
const PURPLE_SOFT = '#EDE8F7';
const PURPLE_DARK = '#2E1A6E';
const CREAM       = '#FAF8F4';
const INK         = '#1A1035';


export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CREAM },

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 14,
    backgroundColor: CREAM,
  },
  headerGreeting: { fontSize: 20, fontWeight: '700', color: INK, letterSpacing: -0.3 },
  headerSub: { fontSize: 13, color: '#9E9E9E', marginTop: 1 },
  cartButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: { fontSize: 9, color: '#fff', fontWeight: '700' },

  // ── Search ──
  searchWrapper: { paddingHorizontal: 20, marginBottom: 16 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 11,
    gap: 10,
    borderWidth: 1.5,
    borderColor: '#ECECEC',
  },
  searchBarFocused: { borderColor: PURPLE_MID },
  searchInput: { flex: 1, fontSize: 14, color: INK, padding: 0 },

  // ── Scroll ──
  scroll: { paddingHorizontal: 20, paddingBottom: 24 },

  // ── Featured ──
  featured: {
    width: FEATURED_WIDTH,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
    backgroundColor: PURPLE_DARK,
  },
  featuredBg: { position: 'absolute', width: '100%', height: '100%' },
  featuredOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(30, 15, 70, 0.72)',
  },
  featuredContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
  },
  featuredBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
  },
  featuredBadgeText: { fontSize: 11, color: '#fff', fontWeight: '600' },
  featuredTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 26,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  featuredAuthor: { fontSize: 12, color: 'rgba(255,255,255,0.65)', marginBottom: 14 },
  featuredFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  featuredPrice: { fontSize: 18, fontWeight: '800', color: '#FFFFFF' },
  featuredBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: PURPLE_MID,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  featuredBtnText: { fontSize: 13, color: '#fff', fontWeight: '600' },

  // ── Section header ──
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: INK, letterSpacing: -0.2 },
  sectionCount: { fontSize: 12, color: '#BBBBBB' },

  // ── Grid ──
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  gridLeft:  { width: CARD_WIDTH },
  gridRight: { width: CARD_WIDTH },

  // ── Card ──
  card: { width: '100%' },
  coverWrapper: {
    width: '100%',
    height: CARD_WIDTH * 1.45,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#E8E4F0',
    marginBottom: 10,
  },
  cover: { width: '100%', height: '100%' },
  priceTag: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: PURPLE,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  priceTagText: { fontSize: 11, color: '#fff', fontWeight: '700' },
  bookTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: INK,
    lineHeight: 18,
    marginBottom: 3,
  },
  bookAuthor: { fontSize: 11, color: '#9E9E9E' },

  // ── Tab Bar ──
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  tabItem: { flex: 1, alignItems: 'center', position: 'relative' },
  tabActiveIndicator: {
    position: 'absolute',
    top: -10,
    width: 24,
    height: 3,
    borderRadius: 2,
    backgroundColor: PURPLE,
  },
  tabLabel:       { fontSize: 10, color: '#BBBBBB', marginTop: 3 },
  tabLabelActive: { fontSize: 10, color: PURPLE, fontWeight: '700', marginTop: 3 },
  tabBadge: {
    position: 'absolute',
    top: -4,
    right: -8,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBadgeText: { fontSize: 8, color: '#fff', fontWeight: '700' },
});