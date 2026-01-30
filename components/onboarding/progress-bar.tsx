import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  color?: string;
}

/**
 * Progress bar component showing current step out of total steps
 * Displays as a series of dots or a progress bar
 */
export function ProgressBar({ currentStep, totalSteps, color = '#789F80' }: ProgressBarProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor: index <= currentStep ? color : 'rgba(255, 255, 255, 0.3)',
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
