import { useThemeColor } from '@/hooks/use-theme-color';
import { setJourneyType } from '@/utils/onboarding-storage';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

/**
 * Journey choice screen - first onboarding screen
 * Allows user to choose between "Order Less" and "Cook More" paths
 */
export default function OnboardingIndex() {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, 'authBackground');

  const handleJourneySelect = async (journey: 'order-less' | 'cook-more') => {
    await setJourneyType(journey);
    router.push({
      pathname: '/onboarding/journey',
      params: { type: journey, step: '0' },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>
          What kind of <Text style={styles.titleHighlight}>Savr</Text>
        </Text>
        <Text style={styles.title}>do you want to be?</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>I want to...</Text>

        {/* Journey Options */}
        <View style={styles.optionsContainer}>
          {/* Order Less Button */}
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => handleJourneySelect('order-less')}
            activeOpacity={0.8}
          >
            <View style={styles.iconContainer}>
              <Svg width="40" height="40" viewBox="0 0 40 40">
                <G>
                  {/* Shopping bag icon */}
                  <Path
                    d="M 12 14 L 12 12 Q 12 8 16 8 L 24 8 Q 28 8 28 12 L 28 14"
                    stroke="#789F80"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <Path
                    d="M 10 14 L 12 32 L 28 32 L 30 14 Z"
                    stroke="#789F80"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </G>
              </Svg>
            </View>
            <Text style={styles.optionLabel}>
              Order <Text style={styles.optionHighlight}>Less</Text>
            </Text>
          </TouchableOpacity>

          {/* Or Text */}
          <Text style={styles.orText}>or</Text>

          {/* Cook More Button */}
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => handleJourneySelect('cook-more')}
            activeOpacity={0.8}
          >
            <View style={styles.iconContainer}>
              <Svg width="40" height="40" viewBox="0 0 40 40">
                <G>
                  {/* Cooking pot icon */}
                  <Path
                    d="M 15 18 L 15 28 Q 15 30 17 30 L 23 30 Q 25 30 25 28 L 25 18"
                    stroke="#789F80"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    d="M 13 18 L 27 18"
                    stroke="#789F80"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <Path
                    d="M 17 14 Q 20 12 23 14"
                    stroke="#789F80"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </G>
              </Svg>
            </View>
            <Text style={styles.optionLabel}>
              Cook <Text style={styles.optionHighlight}>More</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 40,
  },
  titleHighlight: {
    color: '#789F80',
  },
  subtitle: {
    fontSize: 18,
    color: '#789F80',
    marginTop: 32,
    marginBottom: 24,
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 24,
    width: '90%',
    maxWidth: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    marginRight: 16,
  },
  optionLabel: {
    fontSize: 24,
    fontWeight: '600',
    color: '#666666',
  },
  optionHighlight: {
    color: '#789F80',
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginVertical: 16,
    fontWeight: '500',
  },
});
