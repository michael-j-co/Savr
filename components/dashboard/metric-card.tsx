import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MetricCardProps {
  value: number;
  label: string;
  size?: 'small' | 'large';
}

/**
 * Individual metric display card
 * Shows a numeric value with a label below
 * Used for stats like "ingredients left", "skips left", "meals cooked"
 */
export function MetricCard({ value, label, size = 'small' }: MetricCardProps) {
  return (
    <View style={[styles.container, size === 'large' && styles.containerLarge]}>
      <Text style={[styles.value, size === 'large' && styles.valueLarge]}>
        {value}
      </Text>
      <Text style={[styles.label, size === 'large' && styles.labelLarge]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  containerLarge: {
    paddingVertical: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  value: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#789F80',
    marginBottom: 2,
  },
  valueLarge: {
    fontSize: 56,
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666666',
    textAlign: 'center',
  },
  labelLarge: {
    fontSize: 15,
    fontWeight: '600',
  },
});
