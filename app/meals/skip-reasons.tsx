import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Skip reasons screen for when user doesn't cook
 * Presents three options with different navigation paths
 */
export default function SkipReasonsScreen() {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, 'authBackground');

  // Options 1 and 2 lead to remind-later screen
  const handleNotDinnerTime = () => {
    console.log('Not dinner time yet');
    router.push('/meals/remind-later');
  };

  const handleOrderedDelivery = () => {
    console.log('Ordered delivery');
    router.push('/meals/remind-later');
  };

  // Option 3 leads to find-recipe screen
  const handleNeedInspiration = () => {
    console.log('Need inspiration');
    router.push('/meals/find-recipe');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>Didn't have time today?</Text>

        {/* Options Container */}
        <View style={styles.optionsContainer}>
          {/* Option 1: Not dinner time yet */}
          <TouchableOpacity
            style={styles.optionCard}
            onPress={handleNotDinnerTime}
            activeOpacity={0.8}
          >
            <Text style={styles.optionLabel}>It's not dinner time yet!</Text>
          </TouchableOpacity>

          {/* Option 2: Ordered delivery */}
          <TouchableOpacity
            style={styles.optionCard}
            onPress={handleOrderedDelivery}
            activeOpacity={0.8}
          >
            <Text style={styles.optionLabel}>
              I ordered delivery.{'\n'}Remind me to cook tomorrow!
            </Text>
          </TouchableOpacity>

          {/* Option 3: Need inspiration */}
          <TouchableOpacity
            style={styles.optionCard}
            onPress={handleNeedInspiration}
            activeOpacity={0.8}
          >
            <Text style={styles.optionLabel}>
              I need some inspiration.{'\n'}Suggest some recipes!
            </Text>
          </TouchableOpacity>
        </View>
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
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  optionsContainer: {
    width: '100%',
    gap: 20,
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#789F80',
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  optionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#11181C',
    textAlign: 'center',
    lineHeight: 26,
  },
});
