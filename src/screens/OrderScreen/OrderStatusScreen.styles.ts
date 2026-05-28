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
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { paddingBottom: 24 },

  thankSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 20,
  },
  thankEmoji: { fontSize: 15, color: '#9E9E9E', marginBottom: 8 },
  thankTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: PURPLE,
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 8,
  },
  orderId: { fontSize: 13, color: '#9E9E9E', marginBottom: 10 },
  cancelHint: { fontSize: 12, color: '#9E9E9E' },
  cancelLink: { color: PURPLE, fontWeight: '600', textDecorationLine: 'underline' },

  card: {
    marginHorizontal: 20,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#1A1035', marginBottom: 12 },

  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  itemQty: { fontSize: 13, color: '#9E9E9E', width: 28 },
  itemName: { flex: 1, fontSize: 13, color: '#1A1035' },
  itemPrice: { fontSize: 13, fontWeight: '500', color: '#1A1035' },

  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 12 },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: { fontSize: 13, color: '#9E9E9E' },
  summaryValue: { fontSize: 13, color: '#1A1035', fontWeight: '500' },
  totalLabel: { fontSize: 14, fontWeight: '700', color: '#1A1035' },
  totalValue: { fontSize: 14, fontWeight: '700', color: PURPLE },

  footer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  statusButton: {
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: PURPLE,
    backgroundColor: '#FFFFFF',
  },
  statusButtonText: { fontSize: 15, fontWeight: '700', color: PURPLE },
});