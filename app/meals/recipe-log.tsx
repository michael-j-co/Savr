import { useThemeColor } from '@/hooks/use-theme-color';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ImageSourcePropType, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Recipe thumbnail assets
const RECIPE_IMAGES = {
  veggieLasagna: require('@/assets/images/veggielasagna.jpg'),
  bahnMi: require('@/assets/images/bahnmi.jpg'),
  salsachicken: require('@/assets/images/salsachicken.jpg'),
  fishfilet: require('@/assets/images/fishfilet.jpeg'),
  lambchops: require('@/assets/images/lambchops.jpeg'),
};

// Mocked recipe data with thumbnails
const MOCK_RECIPES = [
  { id: '1', title: 'Veggie Lasagna', isFavorite: false, image: RECIPE_IMAGES.veggieLasagna },
  { id: '2', title: 'Bahn Mi', isFavorite: false, image: RECIPE_IMAGES.bahnMi },
  { id: '3', title: 'Salsa Chicken', isFavorite: false, image: RECIPE_IMAGES.salsachicken },
  { id: '4', title: 'Fish Filet', isFavorite: false, image: RECIPE_IMAGES.fishfilet },
  { id: '5', title: 'Lambchops', isFavorite: false, image: RECIPE_IMAGES.lambchops },
];

interface Recipe {
  id: string;
  title: string;
  isFavorite: boolean;
  image: ImageSourcePropType;
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

  // Handle selecting an existing recipe; show Pantry Points reward then user can go home or redeem
  const handleSelectRecipe = (recipe: Recipe) => {
    console.log('Selected recipe:', recipe.title);
    router.replace('/meals/pantry-points-reward');
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
            <View style={styles.addNewPlusContainer}>
              <FontAwesome5 name="plus" size={72} color="rgba(255,255,255,0.3)" />
            </View>
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
              
              {/* Card: thumbnail top, title bottom */}
              <Image source={recipe.image} style={styles.cardThumbnail} resizeMode="cover" />
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
  addNewPlusContainer: {
    position: 'absolute',
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  addNewContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 120,
  },
  addNewText: {
    fontSize: 18,
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
  cardThumbnail: {
    height: '50%',
    width: '100%',
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
