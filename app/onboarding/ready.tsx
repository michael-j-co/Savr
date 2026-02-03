import { Logo } from '@/components/ui/logo';
import { useThemeColor } from '@/hooks/use-theme-color';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Transition screen shown after completing onboarding
 * Displays "You're ready to Savr!" message before entering main app
 */
export default function ReadyScreen() {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, 'authBackground');

  const handleGetStarted = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        {/* Logo with downward arrow */}
        <View style={styles.logoContainer}>
          <Logo size={180} />
          <FontAwesome5 
            name="arrow-down" 
            size={48} 
            color="#789F80" 
            solid 
            style={styles.arrow}
          />
        </View>

        {/* Main message */}
        <Text style={styles.title}>You're ready{'\n'}to Savr!</Text>

        {/* Get Started button */}
        <TouchableOpacity 
          style={styles.button}
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  arrow: {
    marginTop: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 60,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    lineHeight: 50,
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderColor: '#789F80',
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 48,
    minWidth: 200,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#11181C',
  },
});
