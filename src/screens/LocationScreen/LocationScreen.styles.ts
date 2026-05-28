import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const PURPLE = '#5C3D99';
const PURPLE_LIGHT = '#EDE7F6';



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
  formScrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 24 },

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

  footer: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
    gap: 10,
  },
  confirmButton: {
    backgroundColor: PURPLE,
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmButtonText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },

  manualButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 6,
  },
  manualButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: PURPLE,
    textDecorationLine: 'underline',
  },
});