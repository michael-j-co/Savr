import { useThemeColor } from '@/hooks/use-theme-color';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Mocked recipe data
const MOCK_RECIPES = [
  { id: '1', title: 'Veggie Lasagna', isFavorite: false },
  { id: '2', title: 'Bahn Mi', isFavorite: false },
  { id: '3', title: 'Salsa Chicken', isFavorite: false },
  { id: '4', title: 'Fish Filet', isFavorite: false },
  { id: '5', title: 'Lambchops', isFavorite: false },
];

interface Recipe {
  id: string;
  title: string;
  isFavorite: boolean;
}

/**
 * Recipe log screen for selecting or adding recipes
 * Shows grid of existing recipes plus "Add New" option
 */
export default function RecipeLogScreen() {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, 'authBackground');
  
  const [recipes, setRecipes] = useState<Recipe[]>(MOCK_RECIPES);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter recipes based on search query
  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle favorite status for a recipe
  const handleToggleFavorite = (recipeId: string) => {
    setRecipes(prev =>
      prev.map(recipe =>
        recipe.id === recipeId
          ? { ...recipe, isFavorite: !recipe.isFavorite }
          : recipe
      )
    );
  };

  // Handle selecting an existing recipe
  const handleSelectRecipe = (recipe: Recipe) => {
    console.log('Selected recipe:', recipe.title);
    // Navigate back to home after selecting recipe
    router.replace('/(tabs)');
  };

  // Handle adding a new recipe
  const handleAddNew = () => {
    router.push('/meals/save-recipe');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Title */}
        <Text style={styles.title}>Update Your Recipe Log</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <FontAwesome5 name="search" size={18} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search here"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Recipe Grid */}
        <View style={styles.recipeGrid}>
          {/* Add New Card */}
          <TouchableOpacity
            style={[styles.recipeCard, styles.addNewCard]}
            onPress={handleAddNew}
            activeOpacity={0.7}
          >
            <FontAwesome5 name="heart" size={24} color="#999" style={styles.heartIcon} />
            <View style={styles.addNewContent}>
              <Text style={styles.addNewText}>Add New</Text>
            </View>
          </TouchableOpacity>

          {/* Recipe Cards */}
          {filteredRecipes.map(recipe => (
            <TouchableOpacity
              key={recipe.id}
              style={styles.recipeCard}
              onPress={() => handleSelectRecipe(recipe)}
              activeOpacity={0.7}
            >
              <TouchableOpacity
                style={styles.heartIconContainer}
                onPress={() => handleToggleFavorite(recipe.id)}
                activeOpacity={0.7}
              >
                <FontAwesome5
                  name="heart"
                  size={24}
                  color={recipe.isFavorite ? '#FF6B6B' : '#FFF'}
                  solid={recipe.isFavorite}
                />
              </TouchableOpacity>
              
              {/* Card split design: gray top, green bottom */}
              <View style={styles.cardTop} />
              <View style={styles.cardBottom}>
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
    marginBottom: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#11181C',
  },
  recipeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  recipeCard: {
    width: '47%',
    aspectRatio: 1,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  addNewCard: {
    backgroundColor: '#C4C4C4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addNewContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addNewText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  heartIconContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 10,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 10,
  },
  cardTop: {
    height: '50%',
    backgroundColor: '#C4C4C4',
  },
  cardBottom: {
    height: '50%',
    backgroundColor: '#A8D5BA',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
