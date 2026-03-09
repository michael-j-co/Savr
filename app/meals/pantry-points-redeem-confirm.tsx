import { FontAwesome5 } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { PantryPointsTotal } from './PantryPointsTotal';
import { getStoreLogo } from './pantry-stores';

const SCREEN_BG = '#F0F4F0';
const LOGO_SIZE = 120;
const TOTAL_POINTS = 30;
const MOCK_REDEMPTION_CODE = 'XfD-90468393';

/**
 * Confirmation coupon screen shown after user confirms redemption from the redeem modal.
 * Displays the selected offer with a mock redemption code and "Save Code Before Exiting".
 */
export default function PantryPointsRedeemConfirmScreen() {
  const router = useRouter();
  const { store: storeParam, label, points } = useLocalSearchParams<{
    store?: string;
    label?: string;
    points?: string;
  }>();
  const storeKey = storeParam ?? 'wholefoods';
  const offerLabel = label ?? '$2.50 off';
  const Logo = getStoreLogo(storeKey);

  const handleHome = () => {
    router.replace('/(tabs)');
  };

  const handleDone = () => {
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: SCREEN_BG }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={handleHome}
            activeOpacity={0.7}
            accessibilityLabel="Go to home"
          >
            <FontAwesome5 name="home" size={22} color="#789F80" />
          </TouchableOpacity>
        </View>

        <Text style={styles.savrBankTitle}>Savr Bank</Text>
        <PantryPointsTotal value={TOTAL_POINTS} />
        <Text style={styles.totalLabel}>Total Pantry Points</Text>

        <Text style={styles.youSelectedLabel}>You selected:</Text>
        <View style={styles.logoCard}>
          {Logo ? (
            <Logo width={LOGO_SIZE} height={LOGO_SIZE} />
          ) : (
            <Text style={styles.logoPlaceholder}>Store</Text>
          )}
          <View style={styles.couponBlock}>
            <Text style={styles.couponLabel}>{offerLabel}</Text>
            <Text style={styles.couponCode}>{MOCK_REDEMPTION_CODE}</Text>
            <Text style={styles.couponSaveHint}>(Save Code Before Exiting)</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.doneButton}
          onPress={handleDone}
          activeOpacity={0.85}
        >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginBottom: 8,
  },
  homeButton: { padding: 8 },
  savrBankTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#5A7A64',
    textAlign: 'center',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 16,
  },
  youSelectedLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 12,
  },
  logoCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#A8D5BA',
    padding: 24,
    alignItems: 'center',
  },
  logoPlaceholder: {
    fontSize: 18,
    color: '#999',
    marginBottom: 16,
  },
  couponBlock: {
    width: '100%',
    backgroundColor: '#9BF0AA',
    borderWidth: 2,
    borderColor: '#95BE9D',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  couponLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 8,
  },
  couponCode: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 6,
  },
  couponSaveHint: {
    fontSize: 13,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
  },
  doneButton: {
    marginTop: 24,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
