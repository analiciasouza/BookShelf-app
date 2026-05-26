

import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');


const PURPLE      = '#5C3D99';
const PURPLE_LIGHT = '#EDE8F7';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
  },

  illustrationBox: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  illustrationEmoji: { fontSize: 72 },
  sparkles: { position: 'absolute', width: '100%', height: '100%' },
  sparkle: { position: 'absolute', fontSize: 18, color: PURPLE },

  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1035',
    textAlign: 'center',
    marginBottom: 6,
  },
  orderId: { fontSize: 13, color: '#9E9E9E', marginBottom: 28 },

  feedbackCard: {
    width: '100%',
    backgroundColor: PURPLE_LIGHT,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  feedbackTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: PURPLE,
    marginBottom: 6,
    textAlign: 'center',
  },
  feedbackSubtitle: {
    fontSize: 12,
    color: '#7B61B0',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 18,
  },
  starsRow: { flexDirection: 'row', marginBottom: 16 },
  feedbackInput: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    fontSize: 13,
    color: '#1A1035',
    minHeight: 80,
    borderWidth: 1,
    borderColor: '#E8E0F0',
  },

  footer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  doneButton: {
    backgroundColor: PURPLE,
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  doneButtonText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
});