import { MetricCard } from '@/components/dashboard/metric-card';
import { NavigationSidebar } from '@/components/dashboard/navigation-sidebar';
import { StatsRow } from '@/components/dashboard/stats-row';
import { RadialSliderInput } from '@/components/onboarding/radial-slider-input';
import { useThemeColor } from '@/hooks/use-theme-color';
import { clearOnboardingData } from '@/utils/onboarding-storage';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Main dashboard/home screen shown after onboarding
 * Displays user stats, savings gauge, and action buttons
 */
export default function HomeScreen() {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, 'background');
  const buttonColor = useThemeColor({}, 'buttonPrimary');
  const buttonTextColor = useThemeColor({}, 'buttonText');
  
  // Temporary hard-coded stats; will be wired to real data later
  const [savingsAmount, setSavingsAmount] = useState(0);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  
  const stats = [
    { value: 10, label: 'ingredients left' },
    { value: 2, label: 'skips left' },
    { value: 2, label: 'meals ordered' },
  ];

  const handleLogMeal = () => {
    router.push('/meals/check-in' as any);
  };

  const handleMenuNavigation = (itemId: string) => {
    switch (itemId) {
      case 'ingredients':
        router.push('/meals/ingredient-inventory');
        break;
      case 'rewards':
      case 'profile-rewards':
        router.push('/meals/pantry-points');
        break;
      case 'logout':
        // Clear onboarding data and navigate to login
        clearOnboardingData();
        router.replace('/');
        break;
      default:
        // TODO: Navigate to placeholder screens
        console.log('Navigate to:', itemId);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome, Aspiring Chef!</Text>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setSidebarVisible(true)}
            activeOpacity={0.7}
          >
            <FontAwesome5 name="bars" size={24} color="#789F80" solid />
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View style={styles.statsSection}>
          <StatsRow stats={stats} />
        </View>

        {/* Savings Gauge Section */}
        <View style={styles.gaugeSection}>
          <Text style={styles.sectionTitle}>Your Savings</Text>
          <View style={styles.gaugeContainer}>
            <RadialSliderInput
              min={0}
              max={150}
              value={savingsAmount}
              onChange={setSavingsAmount}
              step={1}
              unit="$"
            />
          </View>
        </View>

        {/* Meals Cooked Counter */}
        <View style={styles.mealsSection}>
          <MetricCard value={3} label="Meals Cooked" size="large" />
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

      {/* Navigation Sidebar */}
      <NavigationSidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        onMenuItemPress={(itemId) => {
          setSidebarVisible(false);
          handleMenuNavigation(itemId);
        }}
      />
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
  statsSection: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 10,
    paddingHorizontal: 8,
  },
  menuButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
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
