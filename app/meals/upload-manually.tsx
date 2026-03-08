import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const SCREEN_BG = '#F5F5F5';

/**
 * Upload Manually screen: user can add a receipt photo, switch to auto-upload, or skip.
 * Reached from "Upload manually" on the auto-upload-receipts screen.
 */
export default function UploadManuallyScreen() {
  const router = useRouter();
  const [receiptUri, setReceiptUri] = useState<string | null>(null);

  const handleAddPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please allow access to your photos to upload a receipt.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.[0]) {
      setReceiptUri(result.assets[0].uri);
      // Optionally navigate after selection; for now just show the image.
      // router.replace('/meals/ingredient-inventory');
    }
  };

  const handleAutoUpload = () => {
    router.replace('/meals/auto-upload-receipts');
  };

  const handleSkip = () => {
    router.replace('/meals/ingredient-inventory');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: SCREEN_BG }]}>
      <View style={styles.content}>
        <Text style={styles.title}>Upload Manually</Text>
        <Text style={styles.instruction}>Upload a Photo of your receipt</Text>

        <TouchableOpacity
          style={styles.photoCircle}
          onPress={handleAddPhoto}
          activeOpacity={0.9}
          accessibilityLabel="Tap to add receipt photo"
        >
          {receiptUri ? (
            <Image source={{ uri: receiptUri }} style={styles.photoImage} />
          ) : (
            <FontAwesome5 name="camera" size={60} color="#808080" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addPhotoButton}
          onPress={handleAddPhoto}
          activeOpacity={0.85}
        >
          <Text style={styles.addPhotoButtonText}>Add photo</Text>
        </TouchableOpacity>

        <View style={styles.spacer} />

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.optionCard, styles.optionAutoUpload]}
            onPress={handleAutoUpload}
            activeOpacity={0.85}
          >
            <Text style={[styles.optionTitle, styles.optionAutoUploadTitle]}>
              Auto-upload receipts
            </Text>
          </TouchableOpacity>
          <Text style={styles.optionSubtitle}>Recommended</Text>

          <TouchableOpacity
            style={[styles.optionCard, styles.optionSkip]}
            onPress={handleSkip}
            activeOpacity={0.85}
          >
            <Text style={[styles.optionTitle, styles.optionSkipTitle]}>Skip for now</Text>
          </TouchableOpacity>
          <Text style={styles.optionSubtitle}>Setup later</Text>
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
    paddingTop: 48,
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#11181C',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.08)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    marginBottom: 16,
  },
  instruction: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 32,
  },
  photoCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#B0B0B0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 24,
  },
  photoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  addPhotoButton: {
    backgroundColor: '#81C784',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 32,
  },
  addPhotoButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  spacer: {
    flex: 1,
    minHeight: 24,
  },
  actions: {
    width: '100%',
    alignItems: 'center',
  },
  optionCard: {
    borderRadius: 32,
    paddingVertical: 18,
    paddingHorizontal: 28,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  optionAutoUpload: {
    backgroundColor: '#E8F5E9',
    marginBottom: 6,
  },
  optionAutoUploadTitle: {
    color: '#4CAF50',
  },
  optionSkip: {
    backgroundColor: '#FFEBEE',
    marginTop: 16,
    marginBottom: 6,
  },
  optionSkipTitle: {
    color: '#808080',
  },
  optionSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#000000',
  },
});
