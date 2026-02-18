import { useThemeColor } from '@/hooks/use-theme-color';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const LOADING_DURATION_MS = 2500;

/**
 * AI loading screen shown between fridge photo upload and recipe suggestions.
 * Displays AI-themed copy and sparkle visuals, then navigates to recipe-suggestions.
 */
export default function AiLoadingScreen() {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, 'authBackground');
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.replace('/meals/recipe-suggestions');
    }, LOADING_DURATION_MS);

    return () => clearTimeout(timeoutId);
  }, [router]);

  // Gentle pulse on main icon to suggest "AI working"
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        {/* Sparkle cluster around main icon */}
        <View style={styles.iconWrapper}>
          <FontAwesome5 name="star" size={20} color="#A8D5BA" style={styles.sparkleLeft} />
          <FontAwesome5 name="star" size={14} color="#789F80" style={styles.sparkleTop} />
          <Animated.View style={[styles.mainIconWrap, { transform: [{ scale: pulseAnim }] }]}>
            <FontAwesome5 name="magic" size={56} color="#FFFFFF" solid />
          </Animated.View>
          <FontAwesome5 name="star" size={16} color="#A8D5BA" style={styles.sparkleRight} />
          <FontAwesome5 name="star" size={14} color="#789F80" style={styles.sparkleBottom} />
        </View>

        <Text style={styles.title}>AI is analyzing your ingredients…</Text>
        <Text style={styles.subtitle}>Generating recipes just for you.</Text>
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
    paddingHorizontal: 24,
    paddingTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    width: 140,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  mainIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkleLeft: {
    position: 'absolute',
    left: 0,
    top: 20,
  },
  sparkleTop: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
  },
  sparkleRight: {
    position: 'absolute',
    right: 0,
    top: 24,
  },
  sparkleBottom: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
});
