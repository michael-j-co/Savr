import { useThemeColor } from '@/hooks/use-theme-color';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Update fridge screen for uploading fridge inventory photo
 * Mocked photo upload - navigates to recipe suggestions after alert
 */
export default function UpdateFridgeScreen() {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, 'authBackground');

  // Handle photo upload (mocked - shows alert then navigates)
  const handleAddPhoto = () => {
    Alert.alert(
      'Photo Upload',
      'Photo upload coming soon!',
      [
        {
          text: 'OK',
          onPress: () => {
            console.log('Navigating to recipe suggestions');
            router.push('/meals/recipe-suggestions');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>Let's Update your Fridge</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>Upload a Photo of Your Fridge Inventory</Text>

        {/* Photo Upload Circle */}
        <View style={styles.photoCircle}>
          <FontAwesome5 name="camera" size={48} color="#999" />
        </View>

        {/* Add Photo Button */}
        <TouchableOpacity
          style={styles.addPhotoButton}
          onPress={handleAddPhoto}
          activeOpacity={0.8}
        >
          <Text style={styles.addPhotoButtonText}>Add photo</Text>
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
    marginBottom: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#11181C',
    textAlign: 'center',
    marginBottom: 48,
  },
  photoCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginBottom: 32,
  },
  addPhotoButton: {
    backgroundColor: '#A8D5BA',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addPhotoButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
