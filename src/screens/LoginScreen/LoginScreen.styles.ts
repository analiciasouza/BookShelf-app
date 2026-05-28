
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');


const PURPLE_LIGHT = '#EDE7F6';
const PURPLE = '#5C3D99';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  backButton: {
    marginBottom: 24,
    width: 36,
    height: 36,
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 22,
    color: '#1A1035',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1A1035',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#9E9E9E',
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1035',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#1A1035',
    marginBottom: 20,
  },
  inputWrapper: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  inputInner: {
    flex: 1,
    fontSize: 14,
    color: '#1A1035',
  },
  inputActive: {
    borderColor: PURPLE,
  },
  eyeIcon: {
    fontSize: 16,
  },
  forgotWrapper: {
    alignSelf: 'flex-start',
    marginBottom: 32,
  },
  forgotText: {
    color: PURPLE,
    fontSize: 13,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: PURPLE,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#9E9E9E',
    fontSize: 14,
  },
  signupLink: {
    color: PURPLE,
    fontSize: 14,
    fontWeight: '600',
  },
});