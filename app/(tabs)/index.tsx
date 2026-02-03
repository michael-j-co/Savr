import { MetricCard } from '@/components/dashboard/metric-card';
import { StatsRow } from '@/components/dashboard/stats-row';
import { RadialSliderInput } from '@/components/onboarding/radial-slider-input';
import { useThemeColor } from '@/hooks/use-theme-color';
import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Main dashboard/home screen shown after onboarding
 * Displays user stats, savings gauge, and action buttons
 */
export default function HomeScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const buttonColor = useThemeColor({}, 'buttonPrimary');
  const buttonTextColor = useThemeColor({}, 'buttonText');
  
  // Initialize all stats to 0 (will be updated by future features)
  const [savingsAmount, setSavingsAmount] = useState(0);
  const stats = [
    { value: 0, label: 'ingredients left' },
    { value: 0, label: 'skips left' },
    { value: 0, label: 'meals ordered' },
  ];

  const handleLogMeal = () => {
    // TODO: Implement meal logging functionality
    console.log('Log a meal pressed');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <FontAwesome5 name="hat-chef" size={24} color="#789F80" solid />
          <Text style={styles.welcomeText}>Welcome, Aspiring Chef!</Text>
        </View>

        {/* Stats Row */}
        <StatsRow stats={stats} />

        {/* Savings Gauge Section */}
        <View style={styles.gaugeSection}>
          <Text style={styles.sectionTitle}>Your Savings</Text>
          <View style={styles.gaugeContainer}>
            <RadialSliderInput
              min={50}
              max={150}
              value={savingsAmount}
              onChange={setSavingsAmount}
              step={1}
              unit="$"
            />
            <Text style={styles.savedText}>Saved so far!</Text>
          </View>
        </View>

        {/* Meals Cooked Counter */}
        <View style={styles.mealsSection}>
          <MetricCard value={0} label="Meals Cooked" size="large" />
        </View>

        {/* Action Button */}
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: buttonColor }]}
          onPress={handleLogMeal}
          activeOpacity={0.8}
        >
          <Text style={[styles.actionButtonText, { color: buttonTextColor }]}>
            Log a Meal
          </Text>
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    gap: 10,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#11181C',
  },
  gaugeSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#11181C',
    marginBottom: 12,
  },
  gaugeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  savedText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#789F80',
    marginTop: 4,
  },
  mealsSection: {
    marginVertical: 8,
  },
  actionButton: {
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
