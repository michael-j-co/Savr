import { useThemeColor } from '@/hooks/use-theme-color';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Update fridge screen for uploading fridge inventory photo.
 * Uses the device photo library to select an image, shows it in the circle,
 * then navigates to recipe suggestions after a successful selection.
 */
export default function UpdateFridgeScreen() {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, 'authBackground');
  const [imageUri, setImageUri] = useState<string | null>(null);

  // Handle photo upload using the system image library.
  // Note: This is frontend-only – image is not persisted.
  const handleAddPhoto = async () => {
    // Ask for media library permissions.
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission Required', 'Please allow access to your photos to continue.');
      return;
    }

    // Open the image library so the user can pick a photo.
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      const uri = result.assets[0].uri;
      setImageUri(uri);

      // Show AI loading screen, then it will replace with recipe suggestions.
      console.log('Selected fridge photo URI:', uri);
      router.push('/meals/ai-loading');
    }
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
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.photoImage} />
          ) : (
            <FontAwesome5 name="camera" size={48} color="#999" />
          )}
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
  photoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
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
