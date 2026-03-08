import DollarIcon from '@/assets/icons/dollar.svg';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const CARD_ENTER_DURATION = 400;
const STAGGER_MS = 100;
const NOTE_SIZE = 88;

/**
 * Reward screen shown after completing the log-a-meal flow (cooked with or without recipe).
 * Shows "You just earned Pantry Points!" with dollar illustration and celebratory animation.
 * Redeem -> pantry points screen; Save for Later -> home.
 */
export default function PantryPointsRewardScreen() {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, 'authBackground');
  const cardScale = useRef(new Animated.Value(0.85)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const note1 = useRef(new Animated.Value(0)).current;
  const note2 = useRef(new Animated.Value(0)).current;
  const note3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const enterCard = Animated.parallel([
      Animated.timing(cardScale, {
        toValue: 1,
        duration: CARD_ENTER_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: CARD_ENTER_DURATION,
        useNativeDriver: true,
      }),
    ]);
    const staggerNotes = Animated.stagger(STAGGER_MS, [
      Animated.timing(note1, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(note2, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(note3, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
    ]);
    Animated.sequence([
      enterCard,
      Animated.delay(80),
      staggerNotes,
    ]).start();
  }, [cardScale, cardOpacity, note1, note2, note3]);

  const handleRedeem = () => {
    router.push('/meals/pantry-points');
  };

  const handleSaveForLater = () => {
    router.replace('/(tabs)');
  };

  const note1Translate = note1.interpolate({
    inputRange: [0, 1],
    outputRange: [30, 0],
  });
  const note2Translate = note2.interpolate({
    inputRange: [0, 1],
    outputRange: [30, 0],
  });
  const note3Translate = note3.interpolate({
    inputRange: [0, 1],
    outputRange: [30, 0],
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        <View style={styles.centeredBlock}>
          <Animated.View
            style={[
              styles.card,
              {
                opacity: cardOpacity,
                transform: [{ scale: cardScale }],
              },
            ]}
          >
            <Text style={styles.cardLine1}>You just earned</Text>
            <Text style={styles.cardLine2}>Pantry Points!</Text>
          </Animated.View>

          {/* Stacked banknotes overlapping bottom of card; staggered enter animation */}
          <View style={styles.notesContainer}>
          <Animated.View
            style={[
              styles.noteWrap,
              {
                opacity: note1,
                transform: [{ rotate: '-12deg' }, { translateY: note1Translate }],
              },
            ]}
          >
            <DollarIcon width={NOTE_SIZE} height={NOTE_SIZE} />
          </Animated.View>
          <Animated.View
            style={[
              styles.noteWrap,
              styles.noteCenter,
              {
                opacity: note2,
                transform: [{ translateY: note2Translate }],
              },
            ]}
          >
            <DollarIcon width={NOTE_SIZE} height={NOTE_SIZE} />
          </Animated.View>
          <Animated.View
            style={[
              styles.noteWrap,
              {
                opacity: note3,
                transform: [{ rotate: '12deg' }, { translateY: note3Translate }],
              },
            ]}
          >
            <DollarIcon width={NOTE_SIZE} height={NOTE_SIZE} />
          </Animated.View>
        </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.redeemButton}
            onPress={handleRedeem}
            activeOpacity={0.85}
          >
            <Text style={styles.redeemButtonText}>Redeem</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveLinkWrap}
            onPress={handleSaveForLater}
            activeOpacity={0.7}
          >
            <Text style={styles.saveLinkText}>Save for Later</Text>
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
    paddingTop: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  /** Wraps card + dollar notes so they sit centered vertically above the actions */
  centeredBlock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#A8D5BA',
    paddingVertical: 28,
    paddingHorizontal: 32,
    alignItems: 'center',
    minWidth: 260,
    // Allow notes to overlap bottom
    marginBottom: -24,
  },
  cardLine1: {
    fontSize: 26,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  cardLine2: {
    fontSize: 34,
    fontWeight: '800',
    color: '#4CAF50',
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: NOTE_SIZE + 24,
    marginBottom: 0,
  },
  noteWrap: {
    marginHorizontal: -8,
  },
  noteCenter: {
    zIndex: 1,
  },
  actions: {
    width: '100%',
    alignItems: 'center',
  },
  redeemButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 28,
    marginBottom: 20,
    minWidth: 200,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  redeemButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  saveLinkWrap: {
    paddingVertical: 8,
  },
  saveLinkText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    textDecorationLine: 'underline',
  },
});
