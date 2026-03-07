import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Add Ingredients choice screen
 * Shows three options: auto-upload receipts, upload manually, or skip for now
 */
export default function AddIngredientsScreen() {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, 'authBackground');

  const handleSelect = (option: 'auto' | 'manual' | 'skip') => {
    console.log('Selected add-ingredients option:', option);
    router.replace('/meals/ingredient-inventory');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.heading}>
            Let&apos;s Savr your meals fresh,{' '}
            <Text style={styles.headingHighlight}>[name]</Text>
          </Text>
          <Text style={styles.subheading}>We&apos;ll track groceries so you cook fresh</Text>
        </View>

        <View style={styles.body}>
          <Text style={styles.sectionLabel}>Choose how to add groceries</Text>

          <TouchableOpacity
            style={[styles.optionCard, styles.optionPrimary]}
            onPress={() => handleSelect('auto')}
            activeOpacity={0.85}
          >
            <Text style={[styles.optionTitle, styles.optionPrimaryTitle]}>Auto-upload receipts</Text>
            <Text style={[styles.optionSubtitle, styles.optionPrimarySubtitle]}>Recommended</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionCard, styles.optionSecondary]}
            onPress={() => handleSelect('manual')}
            activeOpacity={0.85}
          >
            <Text style={styles.optionTitle}>Upload manually</Text>
            <Text style={styles.optionSubtitle}>Snap or upload anytime</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionCard, styles.optionTertiary]}
            onPress={() => handleSelect('skip')}
            activeOpacity={0.85}
          >
            <Text style={[styles.optionTitle, styles.optionTertiaryTitle]}>Skip for now</Text>
            <Text style={[styles.optionSubtitle, styles.optionTertiarySubtitle]}>Setup later</Text>
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
    paddingTop: 48,
    paddingBottom: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    marginBottom: 24,
    width: '100%',
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 34,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  headingHighlight: {
    color: '#789F80',
  },
  subheading: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#11181C',
    opacity: 0.9,
    textAlign: 'center',
  },
  body: {
    marginTop: 24,
    width: '100%',
    alignItems: 'center',
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#11181C',
    marginBottom: 16,
    textAlign: 'center',
  },
  optionCard: {
    borderRadius: 28,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 14,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  optionPrimary: {
    backgroundColor: '#CDEFD8',
  },
  optionSecondary: {
    backgroundColor: '#FFFFFF',
  },
  optionTertiary: {
    backgroundColor: '#FCE4E4',
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4B5B63',
    textAlign: 'center',
  },
  optionSubtitle: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '500',
    color: '#7A8A92',
    textAlign: 'center',
  },
  optionPrimaryTitle: {
    color: '#3E6A4F',
  },
  optionPrimarySubtitle: {
    color: '#567B5E',
  },
  optionTertiaryTitle: {
    color: '#B05858',
  },
  optionTertiarySubtitle: {
    color: '#C07A7A',
  },
});

