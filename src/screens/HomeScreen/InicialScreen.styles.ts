import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');


const PURPLE = '#5C3D99';
const PURPLE_LIGHT = '#EDE7F6';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  flatList: {
    flex: 1,
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  illustration: {
    width: width * 0.85,
    height: height * 0.42,
  },
  bottomContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1A1035',
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 36,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: PURPLE_LIGHT,
  },
  dotActive: {
    backgroundColor: PURPLE,
    width: 20, // dot ativo fica maior — efeito pill
  },
  buttonPrimary: {
    width: '100%',
    backgroundColor: PURPLE,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    // Sombra sutil
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonPrimaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  buttonSecondary: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: PURPLE,
  },
  buttonSecondaryText: {
    color: PURPLE,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});