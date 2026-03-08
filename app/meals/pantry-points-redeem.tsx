import { FontAwesome5 } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getStoreLogo } from './pantry-stores';

const SCREEN_BG = '#F0F4F0';
const LOGO_SIZE = 120;
const TOTAL_POINTS = 30;

const REDEMPTION_OPTIONS = [
  { label: '$2.50 off', points: 15 },
  { label: '$5 off', points: 30 },
  { label: '$10 off', points: 60 },
  { label: '$20 off', points: 120 },
] as const;

/**
 * Redeem screen after selecting a store on the pantry-points screen.
 * Shows "You selected:" with the store logo and redemption options (points required).
 */
export default function PantryPointsRedeemScreen() {
  const router = useRouter();
  const { store: storeParam } = useLocalSearchParams<{ store?: string }>();
  const storeKey = storeParam ?? 'wholefoods';
  const Logo = getStoreLogo(storeKey);

  const handleHome = () => {
    router.replace('/(tabs)');
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
        <View style={styles.pointsValueWrap}>
          <Text style={[styles.pointsValueLayer, styles.pointsValueOutline]}>{TOTAL_POINTS}</Text>
          <Text style={[styles.pointsValueLayer, styles.pointsValueFill]}>{TOTAL_POINTS}</Text>
        </View>
        <Text style={styles.totalLabel}>Total Pantry Points</Text>

        <Text style={styles.youSelectedLabel}>You selected:</Text>
        <View style={styles.logoCard}>
          {Logo ? (
            <Logo width={LOGO_SIZE} height={LOGO_SIZE} />
          ) : (
            <Text style={styles.logoPlaceholder}>Store</Text>
          )}
          <View style={styles.optionsGrid}>
            {REDEMPTION_OPTIONS.map(({ label, points }) => {
              const canAfford = TOTAL_POINTS >= points;
              return (
                <TouchableOpacity
                  key={points}
                  style={[styles.optionCard, canAfford ? styles.optionCardAvailable : styles.optionCardUnavailable]}
                  activeOpacity={0.85}
                  disabled={!canAfford}
                >
                  <Text style={styles.optionLabel}>{label}</Text>
                  <Text style={styles.optionPoints}>({points} pantry points)</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
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
  pointsValueWrap: {
    position: 'relative',
    width: '100%',
    marginBottom: 4,
    height: 82,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointsValueLayer: {
    position: 'absolute',
    width: '100%',
    fontSize: 68,
    fontWeight: '800',
    textAlign: 'center',
  },
  pointsValueOutline: {
    color: '#000000',
    top: 0,
    left: 0,
    transform: [{ translateX: 1 }, { translateY: 1 }],
  },
  pointsValueFill: {
    color: '#4CAF50',
    top: 0,
    left: 0,
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
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  optionCard: {
    width: '48%',
    aspectRatio: 1,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#95BE9D',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  optionCardAvailable: {
    backgroundColor: '#9BF0AA',
  },
  optionCardUnavailable: {
    backgroundColor: '#E8E8E8',
  },
  optionLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
    textAlign: 'center',
  },
  optionPoints: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
  },
});
