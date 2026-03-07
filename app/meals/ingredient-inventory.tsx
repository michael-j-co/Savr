import { useThemeColor } from '@/hooks/use-theme-color';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Ingredient {
  id: string;
  name: string;
  isFavorite: boolean;
}

const MOCK_INGREDIENTS: Ingredient[] = [
  { id: 'upload-new', name: 'Upload New', isFavorite: false },
  { id: 'lasagna-noodles', name: 'Lasagna Noodles', isFavorite: false },
  { id: 'broccoli', name: 'Broccoli', isFavorite: false },
  { id: 'tomatoes', name: 'Tomatoes', isFavorite: false },
  { id: 'salmon', name: 'Salmon', isFavorite: false },
  { id: 'chicken-breast', name: 'Chicken Breast', isFavorite: false },
];

/**
 * Ingredient inventory screen
 * Mirrors recipe log UI but with ingredients instead of recipes
 */
export default function IngredientInventoryScreen() {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, 'authBackground');

  const [ingredients, setIngredients] = useState<Ingredient[]>(MOCK_INGREDIENTS);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIngredients = ingredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleFavorite = (ingredientId: string) => {
    setIngredients(prev =>
      prev.map(ingredient =>
        ingredient.id === ingredientId
          ? { ...ingredient, isFavorite: !ingredient.isFavorite }
          : ingredient
      )
    );
  };

  const handleSelectIngredient = (ingredient: Ingredient) => {
    if (ingredient.id === 'upload-new') {
      router.push('/meals/add-ingredients');
      return;
    }
    console.log('Selected ingredient:', ingredient.name);
    router.replace('/(tabs)');
  };

  const handleAddNew = () => {
    router.push('/meals/add-ingredients');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Ingredient Inventory</Text>

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

        <View style={styles.grid}>
          {/* Upload New card */}
          <TouchableOpacity
            style={[styles.card, styles.addNewCard]}
            onPress={handleAddNew}
            activeOpacity={0.7}
          >
            <View style={styles.addNewContent}>
              <Text style={styles.addNewText}>Upload New</Text>
            </View>
          </TouchableOpacity>

          {filteredIngredients
            .filter(ingredient => ingredient.id !== 'upload-new')
            .map(ingredient => (
              <TouchableOpacity
                key={ingredient.id}
                style={styles.card}
                onPress={() => handleSelectIngredient(ingredient)}
                activeOpacity={0.7}
              >
                <TouchableOpacity
                  style={styles.heartIconContainer}
                  onPress={() => handleToggleFavorite(ingredient.id)}
                  activeOpacity={0.7}
                >
                  <FontAwesome5
                    name="heart"
                    size={20}
                    color={ingredient.isFavorite ? '#FF6B6B' : '#FFF'}
                    solid={ingredient.isFavorite}
                  />
                </TouchableOpacity>

                <View style={styles.cardTop} />
                <View style={styles.cardBottom}>
                  <Text style={styles.cardTitle}>{ingredient.name}</Text>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  card: {
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
  addNewBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5A6A7A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  addNewBadgeText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  addNewContent: {
    alignItems: 'center',
    justifyContent: 'center',
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
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTop: {
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
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

