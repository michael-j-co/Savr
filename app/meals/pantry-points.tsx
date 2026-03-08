import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { STORE_LOGOS } from './pantry-stores';

const SCREEN_BG = '#F0F4F0';
const LOGO_SIZE = 88;

/**
 * Savr Bank / Pantry Points screen.
 * Reached from "Redeem" on the pantry-points-reward screen.
 * Shows total points and a grid of redeemable store logos.
 */
export default function PantryPointsScreen() {
  const router = useRouter();

  const handleHome = () => {
    router.replace('/(tabs)');
  };

  const handleStorePress = (storeKey: string) => {
    router.push({ pathname: '/meals/pantry-points-redeem', params: { store: storeKey } });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: SCREEN_BG }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header: home icon top right */}
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

        {/* Points section */}
        <Text style={styles.savrBankTitle}>Savr Bank</Text>
        <View style={styles.pointsValueWrap}>
          {/* Black outline layer (offset) */}
          <Text style={[styles.pointsValueLayer, styles.pointsValueOutline]}>30</Text>
          <Text style={[styles.pointsValueLayer, styles.pointsValueFill]}>30</Text>
        </View>
        <Text style={styles.totalLabel}>Total Pantry Points</Text>
        <Text style={styles.redeemableIntro}>Redeemable at stores below:</Text>

        {/* Store logos card: 2 columns x 4 rows */}
        <View style={styles.card}>
          <View style={styles.logoGrid}>
            {STORE_LOGOS.map(({ key, Logo }) => (
              <TouchableOpacity
                key={key}
                style={styles.logoCell}
                onPress={() => handleStorePress(key)}
                activeOpacity={0.7}
                accessibilityLabel={`Select ${key} to redeem`}
              >
                <Logo width={LOGO_SIZE} height={LOGO_SIZE} />
              </TouchableOpacity>
            ))}
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
  scroll: {
    flex: 1,
  },
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
  homeButton: {
    padding: 8,
  },
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
  redeemableIntro: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#A8D5BA',
    padding: 24,
    minHeight: 320,
  },
  logoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  logoCell: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
});
