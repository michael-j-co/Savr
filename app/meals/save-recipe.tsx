import { useThemeColor } from '@/hooks/use-theme-color';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

/**
 * Save new recipe screen with form fields
 * Allows users to create a new recipe entry
 */
export default function SaveRecipeScreen() {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, 'authBackground');
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Handle saving the recipe (mocked - no actual persistence)
  const handleSave = () => {
    // Basic validation
    if (!title.trim()) {
      alert('Please enter a recipe title');
      return;
    }

    console.log('Saving recipe:', { title, category, description, ingredients, steps });
    
    // Navigate back to home
    router.replace('/(tabs)');
  };

  // Handle photo picker (mocked - no actual implementation)
  const handleAddPhoto = () => {
    console.log('Photo picker would open here');
    alert('Photo picker coming soon!');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header with Title and Save Button */}
        <View style={styles.header}>
          <Text style={styles.title}>Save Your New Recipe!</Text>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>

        {/* Form Container */}
        <View style={styles.formContainer}>
          {/* Title Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>TITLE</Text>
            <TextInput
              style={[
                styles.input,
                focusedField === 'title' && styles.inputFocused,
              ]}
              value={title}
              onChangeText={setTitle}
              onFocus={() => setFocusedField('title')}
              onBlur={() => setFocusedField(null)}
              placeholder=""
              placeholderTextColor="#999"
            />
          </View>

          {/* Category Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>CATEGORY</Text>
            <TextInput
              style={[
                styles.input,
                focusedField === 'category' && styles.inputFocused,
              ]}
              value={category}
              onChangeText={setCategory}
              onFocus={() => setFocusedField('category')}
              onBlur={() => setFocusedField(null)}
              placeholder=""
              placeholderTextColor="#999"
            />
          </View>

          {/* Description Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>DESCRIPTION</Text>
            <TextInput
              style={[
                styles.input,
                focusedField === 'description' && styles.inputFocused,
              ]}
              value={description}
              onChangeText={setDescription}
              onFocus={() => setFocusedField('description')}
              onBlur={() => setFocusedField(null)}
              placeholder=""
              placeholderTextColor="#999"
              multiline
            />
          </View>

          {/* Ingredients Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>INGREDIENTS</Text>
            <TextInput
              style={[
                styles.input,
                focusedField === 'ingredients' && styles.inputFocused,
              ]}
              value={ingredients}
              onChangeText={setIngredients}
              onFocus={() => setFocusedField('ingredients')}
              onBlur={() => setFocusedField(null)}
              placeholder=""
              placeholderTextColor="#999"
              multiline
            />
          </View>

          {/* Steps Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>STEPS</Text>
            <TextInput
              style={[
                styles.input,
                focusedField === 'steps' && styles.inputFocused,
              ]}
              value={steps}
              onChangeText={setSteps}
              onFocus={() => setFocusedField('steps')}
              onBlur={() => setFocusedField(null)}
              placeholder=""
              placeholderTextColor="#999"
              multiline
            />
          </View>

          {/* Photo Section */}
          <View style={styles.photoSection}>
            <View style={styles.photoCircle}>
              <FontAwesome5 name="camera" size={32} color="#999" />
            </View>
            <TouchableOpacity
              style={styles.addPhotoButton}
              onPress={handleAddPhoto}
              activeOpacity={0.8}
            >
              <Text style={styles.addPhotoButtonText}>Add photo</Text>
            </TouchableOpacity>
          </View>
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
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  saveButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#789F80',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#11181C',
    minHeight: 48,
  },
  inputFocused: {
    borderColor: '#4A90E2',
    backgroundColor: '#FFFFFF',
  },
  photoSection: {
    alignItems: 'center',
    paddingTop: 16,
    gap: 16,
  },
  photoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  addPhotoButton: {
    backgroundColor: '#A8D5BA',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 20,
  },
  addPhotoButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
