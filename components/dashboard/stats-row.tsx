import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MetricCard } from './metric-card';

interface Stat {
  value: number;
  label: string;
}

interface StatsRowProps {
  stats: Stat[];
}

/**
 * Displays three stats in a horizontal row
 * Used at the top of the dashboard for quick metrics
 */
export function StatsRow({ stats }: StatsRowProps) {
  return (
    <View style={styles.container}>
      {stats.map((stat, index) => (
        <View key={index} style={styles.statContainer}>
          <MetricCard value={stat.value} label={stat.label} size="small" />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  statContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
