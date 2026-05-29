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

  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  backButton: {
    marginTop: 8,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },

  // Cabeçalho
  headerSection: {
    alignItems: 'center',
    marginBottom: 28,
  },
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: PURPLE_SOFT,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: INK,
    letterSpacing: -0.4,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#9E9E9E',
    textAlign: 'center',
  },

  // Formulário
  form: { marginBottom: 8 },

  row: { flexDirection: 'row' },
  rowField: { flex: 1 },
  rowSpacer: { width: 12 },

  eyeBtn: {
    position: 'absolute',
    right: 10,
    top: 28,
    height: 44,
    justifyContent: 'center',
  },

  registerButton: {
    marginTop: 8,
    borderRadius: 30,
    paddingVertical: 16,
  },

  // Rodapé
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: { fontSize: 14, color: '#9E9E9E' },
  loginLink: { fontSize: 14, color: PURPLE, fontWeight: '700' },
});