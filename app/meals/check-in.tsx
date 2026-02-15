import { useThemeColor } from '@/hooks/use-theme-color';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Check-in screen for logging meals
 * Presents three options: cooked with recipe, cooked without recipe, or skip
 */
export default function CheckInScreen() {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, 'authBackground');

  const handleCookedWithRecipe = () => {
    console.log('Cooked with recipe');
    // Navigate to recipe log screen
    router.push('/meals/recipe-log');
  };

  const handleCookedWithoutRecipe = () => {
    console.log('Cooked without recipe');
    // Navigate to update fridge screen
    router.push('/meals/update-fridge');
  };

  const handleSkip = () => {
    console.log('Skip');
    // TODO: Implement skip tracking logic
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>Let's Check in, Aspiring Chef!</Text>
        
        {/* Subtitle */}
        <Text style={styles.subtitle}>Have you:</Text>
        
        {/* Options Container */}
        <View style={styles.optionsContainer}>
          {/* Option 1: Cooked with recipe */}
          <TouchableOpacity
            style={styles.optionCard}
            onPress={handleCookedWithRecipe}
            activeOpacity={0.8}
          >
            <View style={styles.iconContainer}>
              <FontAwesome5 name="utensils" size={48} color="#789F80" solid />
            </View>
            <Text style={styles.optionLabel}>
              Cooked A{'\n'}Recipe Today!
            </Text>
          </TouchableOpacity>

          {/* Option 2: Cooked without recipe */}
          <TouchableOpacity
            style={styles.optionCard}
            onPress={handleCookedWithoutRecipe}
            activeOpacity={0.8}
          >
            <View style={styles.iconContainer}>
              <FontAwesome5 name="shopping-basket" size={48} color="#789F80" solid />
            </View>
            <Text style={styles.optionLabel}>
              Cooked Without A{'\n'}Recipe!
            </Text>
          </TouchableOpacity>

          {/* Option 3: Skip */}
          <TouchableOpacity
            style={styles.optionCard}
            onPress={handleSkip}
            activeOpacity={0.8}
          >
            <View style={styles.iconContainer}>
              <FontAwesome5 name="truck" size={48} color="#789F80" solid />
            </View>
            <Text style={styles.optionLabel}>Skip</Text>
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
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.9,
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
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  iconContainer: {
    marginBottom: 12,
  },
  optionLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#11181C',
    textAlign: 'center',
    lineHeight: 28,
  },
});
