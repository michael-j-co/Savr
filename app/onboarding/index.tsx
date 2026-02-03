import { TwoOptionLayout } from '@/components/onboarding/two-option-layout';
import { useThemeColor } from '@/hooks/use-theme-color';
import { setJourneyType } from '@/utils/onboarding-storage';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

/**
 * Journey choice screen - first onboarding screen
 * Allows user to choose between "Order Less" and "Cook More" paths
 */
export default function OnboardingIndex() {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, 'authBackground');

  const handleJourneySelect = async (journey: string) => {
    await setJourneyType(journey as 'order-less' | 'cook-more');
    router.push({
      pathname: '/onboarding/journey',
      params: { type: journey, step: '0' },
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {/* Invisible spacer to match the topBar height from journey screens */}
      <View style={styles.topSpacer} />
      
      <TwoOptionLayout
        title="What kind of Savr do you want to be?"
        titleHighlight="Savr"
        subtitle="I want to..."
        option1={{
          id: 'order-less',
          label: 'Order Less',
          icon: 'shopping-bag',
          highlight: 'Less',
        }}
        option2={{
          id: 'cook-more',
          label: 'Cook More',
          icon: 'utensils',
          highlight: 'More',
        }}
        onSelect={handleJourneySelect}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSpacer: {
    height: 60, // Matches topBar padding (8 + 8) + backButton height (44)
  },
});
