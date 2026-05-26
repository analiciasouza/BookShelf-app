
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const PURPLE      = '#5C3D99';


export const styles = StyleSheet.create({
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

  section: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#1A1035', marginBottom: 14 },

  // Address
  addressRow: { flexDirection: 'row', alignItems: 'flex-start' },
  addressIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0EBF8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  addressInfo: { flex: 1 },
  addressTitle: { fontSize: 14, fontWeight: '600', color: '#1A1035', marginBottom: 4 },
  addressSubtitle: { fontSize: 12, color: '#9E9E9E', lineHeight: 18 },
  changeButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: PURPLE,
  },
  changeText: { fontSize: 13, color: PURPLE, fontWeight: '500' },

  // Book row
  bookRow: { flexDirection: 'row', marginBottom: 12 },
  bookCover: { width: 72, height: 100, borderRadius: 6, backgroundColor: '#F0F0F0' },
  bookInfo: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  bookTitle: { fontSize: 14, fontWeight: '600', color: '#1A1035', marginBottom: 4 },
  bookAuthor: { fontSize: 12, color: '#9E9E9E', marginBottom: 4 },
  bookQty: { fontSize: 12, color: PURPLE, fontWeight: '500' },

  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 12 },

  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  priceLabel: { fontSize: 13, color: '#9E9E9E' },
  priceValue: { fontSize: 13, color: '#1A1035', fontWeight: '500' },
  totalLabel: { fontSize: 14, fontWeight: '700', color: '#1A1035' },
  totalValue: { fontSize: 14, fontWeight: '700', color: PURPLE },

  seeDetails: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  seeDetailsText: { fontSize: 13, color: PURPLE, fontWeight: '500', marginRight: 2 },

  paymentRow: { flexDirection: 'row', alignItems: 'center' },
  paymentIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0EBF8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentInfo: { flex: 1 },
  paymentTitle: { fontSize: 14, fontWeight: '600', color: '#1A1035' },
  paymentSubtitle: { fontSize: 12, color: '#9E9E9E', marginTop: 2 },

  footer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  orderButton: {
    backgroundColor: PURPLE,
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  orderButtonText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
});


export const sheetStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 36,
    paddingTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E0E0E0',
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1035',
    marginBottom: 20,
  },

  // Payment Details
  detailBlock: { marginBottom: 4 },
  detailHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailHeaderLabel: { fontSize: 14, fontWeight: '600', color: '#1A1035' },
  detailHeaderValue: { fontSize: 14, fontWeight: '600', color: '#1A1035' },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailName: { fontSize: 13, color: '#9E9E9E', flex: 1, marginRight: 8 },
  detailItemValue: { fontSize: 13, color: '#9E9E9E' },
  separator: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 12 },
  detailTotalLabel: { fontSize: 14, fontWeight: '700', color: '#1A1035' },
  detailTotalValue: { fontSize: 14, fontWeight: '700', color: PURPLE },

  // Your Payments
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  paymentOptionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  paymentOptionLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1035',
  },
});