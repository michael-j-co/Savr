import { DeliveryLogos } from '@/components/ui/delivery-logos';
import { Logo } from '@/components/ui/logo';
import { ThemedTextInput } from '@/components/ui/text-input';
import { useThemeColor } from '@/hooks/use-theme-color';
import { isOnboardingCompleted } from '@/utils/onboarding-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type AuthMode = 'login' | 'signup';

/**
 * Authentication screen with login/signup toggle
 * UI-only implementation with client-side validation
 */
export default function AuthScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  // Theme colors
  const backgroundColor = useThemeColor({}, 'authBackground');
  const formBackground = useThemeColor({}, 'formBackground');
  const buttonColor = useThemeColor({}, 'buttonPrimary');
  const buttonTextColor = useThemeColor({}, 'buttonText');
  const linkColor = useThemeColor({}, 'tint');

  /**
   * Validate email format
   */
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Validate password (minimum 6 characters)
   */
  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async () => {
    const newErrors: typeof errors = {};

    // Validate email
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate password
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Validate confirm password in signup mode
    if (mode === 'signup') {
      if (!confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);

    // If no errors, navigate appropriately
    if (Object.keys(newErrors).length === 0) {
      if (mode === 'signup') {
        // After signup, go to onboarding
        router.replace('/onboarding');
      } else {
        // After login, check if onboarding is completed
        const completed = await isOnboardingCompleted();
        if (completed) {
          router.replace('/(tabs)');
        } else {
          router.replace('/onboarding');
        }
      }
    }
  };

  /**
   * Toggle between login and signup modes
   */
  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setErrors({});
    setConfirmPassword('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor }]}
    >
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Logo size={140} />
        </View>

        {/* Form Card */}
        <View style={[styles.formCard, { backgroundColor: formBackground }]}>
          <Text style={styles.formTitle}>Email</Text>
          <ThemedTextInput
            icon="envelope"
            placeholder="your@email.com"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            errorMessage={errors.email}
            warningMessage="Login with the same email as your food delivery apps"
          />

          <Text style={styles.formTitle}>Password</Text>
          <ThemedTextInput
            icon="lock"
            placeholder="••••••••••••"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password) setErrors({ ...errors, password: undefined });
            }}
            secureTextEntry
            autoCapitalize="none"
            errorMessage={errors.password}
          />

          {/* Confirm Password (only in signup mode) */}
          {mode === 'signup' && (
            <>
              <Text style={styles.formTitle}>Confirm Password</Text>
              <ThemedTextInput
                icon="lock"
                placeholder="••••••••••••"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (errors.confirmPassword) {
                    setErrors({ ...errors, confirmPassword: undefined });
                  }
                }}
                secureTextEntry
                autoCapitalize="none"
                errorMessage={errors.confirmPassword}
              />
            </>
          )}

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: buttonColor }]}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, { color: buttonTextColor }]}>
              {mode === 'login' ? 'Login' : 'Sign Up'}
            </Text>
          </TouchableOpacity>

          {/* Toggle Mode Link */}
          <TouchableOpacity onPress={toggleMode} activeOpacity={0.7}>
            <Text style={[styles.linkText, { color: linkColor }]}>
              {mode === 'login'
                ? "Don't have an account? Sign up."
                : 'Already have an account? Login.'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Delivery Logos Section */}
        <View style={styles.deliverySection}>
          <DeliveryLogos />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  logoSection: {
    alignItems: 'center',
    paddingTop: 20,
  },
  formCard: {
    borderRadius: 24,
    padding: 20,
    // Shadow for elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  formTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    fontSize: 14,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  deliverySection: {
    paddingBottom: 10,
  },
});
