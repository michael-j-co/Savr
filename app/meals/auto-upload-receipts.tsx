import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import CostcoLogo from '@/assets/icons/costco.svg';
import GmailLogo from '@/assets/icons/gmail.svg';
import InstacartLogo from '@/assets/icons/instacart.svg';

const LOGO_ITEMS: Array<{ key: string; Logo: React.FC<{ width?: number; height?: number }> }> = [
  { key: 'gmail', Logo: GmailLogo },
  { key: 'instacart', Logo: InstacartLogo },
  { key: 'costco', Logo: CostcoLogo },
];

/**
 * Auto-upload receipts screen
 * Shown when user chooses "Auto-upload receipts" on Add Ingredients.
 * Placeholder area for Gmail, Instacart, Costco logos; two actions: Upload manually, Skip for now.
 */
export default function AutoUploadReceiptsScreen() {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, 'authBackground');

  const handleUploadManually = () => {
    console.log('Auto-upload screen: Upload manually');
    router.replace('/meals/ingredient-inventory');
  };

  const handleSkip = () => {
    console.log('Auto-upload screen: Skip for now');
    router.replace('/meals/ingredient-inventory');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.titleLine1}>Auto-upload</Text>
          <Text style={styles.titleLine2}>receipts</Text>
          <Text style={styles.subtitle}>
            Weekly. Automatic.{' '}
            <Text style={styles.subtitleHighlight}>No effort.</Text>
          </Text>
        </View>

        <View style={styles.logoRow}>
          {LOGO_ITEMS.map(({ key, Logo }) => (
            <Logo key={key} width={80} height={80} />
          ))}
        </View>

        <Text style={styles.bodyCopy}>
          We&apos;ll scan for receipts weekly. You can turn this off anytime.
        </Text>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.optionCard, styles.optionManual]}
            onPress={handleUploadManually}
            activeOpacity={0.85}
          >
            <Text style={[styles.optionTitle, styles.optionManualTitle]}>Upload manually</Text>
            <Text style={styles.optionSubtitle}>Snap or upload anytime</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionCard, styles.optionSkip]}
            onPress={handleSkip}
            activeOpacity={0.85}
          >
            <Text style={[styles.optionTitle, styles.optionSkipTitle]}>Skip for now</Text>
            <Text style={[styles.optionSubtitle, styles.optionSkipSubtitle]}>Setup later</Text>
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
    alignItems: 'center',
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  titleLine1: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  titleLine2: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '500',
    color: '#11181C',
    textAlign: 'center',
  },
  subtitleHighlight: {
    color: '#789F80',
  },
  logoRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  bodyCopy: {
    fontSize: 16,
    fontWeight: '400',
    color: '#11181C',
    textAlign: 'center',
    marginBottom: 28,
    paddingHorizontal: 8,
  },
  buttons: {
    width: '100%',
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
  optionManual: {
    backgroundColor: '#FFFFFF',
  },
  optionSkip: {
    backgroundColor: '#FCE4E4',
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  optionSubtitle: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '500',
    color: '#7A8A92',
    textAlign: 'center',
  },
  optionManualTitle: {
    color: '#3E6A4F',
  },
  optionSkipTitle: {
    color: '#B05858',
  },
  optionSkipSubtitle: {
    color: '#C07A7A',
  },
});
