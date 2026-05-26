import { StyleSheet } from 'react-native';


const PURPLE = '#5C3D99';
const PURPLE_LIGHT = '#EDE8F7';
const SHIPPING_FEE = 2.0;


export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },

  // Header
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
  headerBadgeWrapper: { position: 'relative' },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: { fontSize: 9, color: '#FFFFFF', fontWeight: '700' },

  // Lista
  listContent: { padding: 20 },
  separator: { height: 12 },

  // Card item
  card: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    alignItems: 'center',
  },
  cover: {
    width: 64,
    height: 88,
    borderRadius: 6,
    backgroundColor: '#F0F0F0',
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  bookTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1035',
    marginBottom: 4,
    lineHeight: 18,
  },
  bookAuthor: { fontSize: 12, color: '#9E9E9E', marginBottom: 8 },
  bookPrice: { fontSize: 14, fontWeight: '700', color: PURPLE },

  // Contador
  qtyBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    gap: 6,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: PURPLE_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1035',
    minWidth: 16,
    textAlign: 'center',
  },

  // Vazio
  emptyContainer: { flex: 1 },
  emptyBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1035',
    marginTop: 16,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#9E9E9E',
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: PURPLE,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 24,
  },
  emptyButtonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 14 },

  // Footer
  footer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: { fontSize: 13, color: '#9E9E9E' },
  summaryValue: { fontSize: 13, color: '#1A1035', fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 10 },
  totalLabel: { fontSize: 15, fontWeight: '700', color: '#1A1035' },
  totalValue: { fontSize: 15, fontWeight: '700', color: PURPLE },

  checkoutButton: {
    marginTop: 16,
    backgroundColor: PURPLE,
    borderRadius: 30,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  checkoutButtonText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
});