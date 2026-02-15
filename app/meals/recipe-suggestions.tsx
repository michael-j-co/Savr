import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Mocked recipe suggestions data
const MOCK_SUGGESTIONS = [
  { id: '1', name: 'Vegetable Stir Fry', description: 'Quick and healthy' },
  { id: '2', name: 'Pasta Primavera', description: 'Fresh and delicious' },
  { id: '3', name: 'Chicken Salad', description: 'Light and filling' },
  { id: '4', name: 'Omelette', description: 'Protein-packed breakfast' },
];

interface RecipeSuggestion {
  id: string;
  name: string;
  description: string;
}

/**
 * Recipe suggestions screen showing AI-generated recipe ideas
 * Based on mocked fridge inventory analysis
 */
export default function RecipeSuggestionsScreen() {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, 'authBackground');

  // Handle selecting a recipe suggestion
  const handleSelectRecipe = (recipe: RecipeSuggestion) => {
    console.log('Selected recipe:', recipe.name);
    // Navigate back to home
    router.replace('/(tabs)');
  };

  // Handle skipping recipe suggestions
  const handleSkip = () => {
    console.log('Skipped recipe suggestions');
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Title */}
        <Text style={styles.title}>Here are some recipe suggestions!</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>Based on your fridge inventory</Text>

        {/* Recipe Suggestions List */}
        <View style={styles.recipesContainer}>
          {MOCK_SUGGESTIONS.map((recipe) => (
            <TouchableOpacity
              key={recipe.id}
              style={styles.recipeCard}
              onPress={() => handleSelectRecipe(recipe)}
              activeOpacity={0.7}
            >
              <Text style={styles.recipeName}>{recipe.name}</Text>
              <Text style={styles.recipeDescription}>{recipe.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Skip Button */}
        <TouchableOpacity
          style={styles.skipButton}
          onPress={handleSkip}
          activeOpacity={0.8}
        >
          <Text style={styles.skipButtonText}>Skip for now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
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
    marginBottom: 32,
    opacity: 0.9,
  },
  recipesContainer: {
    gap: 16,
    marginBottom: 24,
  },
  recipeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#11181C',
    marginBottom: 6,
  },
  recipeDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  skipButton: {
    backgroundColor: '#C4C4C4',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
