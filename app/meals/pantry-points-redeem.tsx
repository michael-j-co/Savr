import { FontAwesome5 } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Modal,
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
type SelectedOffer = { label: string; points: number } | null;

export default function PantryPointsRedeemScreen() {
  const router = useRouter();
  const { store: storeParam } = useLocalSearchParams<{ store?: string }>();
  const storeKey = storeParam ?? 'wholefoods';
  const Logo = getStoreLogo(storeKey);
  const [selectedOffer, setSelectedOffer] = useState<SelectedOffer>(null);

  const handleHome = () => {
    router.replace('/(tabs)');
  };

  const handleOptionPress = (label: string, points: number) => {
    setSelectedOffer({ label, points });
  };

  const handleConfirmRedemption = () => {
    if (!selectedOffer) return;
    const { label, points } = selectedOffer;
    setSelectedOffer(null);
    router.push({
      pathname: '/meals/pantry-points-redeem-confirm',
      params: { store: storeKey, label, points: String(points) },
    });
  };

  const handleCancelModal = () => {
    setSelectedOffer(null);
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
          <View style={styles.optionsGrid}>
            {REDEMPTION_OPTIONS.map(({ label, points }) => {
              const canAfford = TOTAL_POINTS >= points;
              return (
                <TouchableOpacity
                  key={points}
                  style={[styles.optionCard, canAfford ? styles.optionCardAvailable : styles.optionCardUnavailable]}
                  activeOpacity={0.85}
                  disabled={!canAfford}
                  onPress={() => handleOptionPress(label, points)}
                >
                  <Text style={styles.optionLabel}>{label}</Text>
                  <Text style={styles.optionPoints}>({points} pantry points)</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={selectedOffer !== null}
        transparent
        animationType="fade"
        onRequestClose={handleCancelModal}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={handleCancelModal}
        >
          <TouchableOpacity activeOpacity={1} onPress={() => {}}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Redeem {selectedOffer?.label} for {selectedOffer?.points} pantry points?
              </Text>
              <TouchableOpacity
                style={styles.modalConfirmButton}
                onPress={handleConfirmRedemption}
                activeOpacity={0.85}
              >
                <Text style={styles.modalConfirmText}>Confirm redemption</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={handleCancelModal}
                activeOpacity={0.7}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    minWidth: 280,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalConfirmButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalConfirmText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  modalCancelButton: {
    paddingVertical: 10,
  },
  modalCancelText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#789F80',
  },
});
