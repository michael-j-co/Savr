import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RadialSlider } from 'react-native-radial-slider';

interface RadialSliderInputProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  unit?: string;
}

/**
 * Radial slider for money and time inputs
 * Uses react-native-radial-slider for smooth, reliable interaction
 * Displays values with proper units ($, min, etc.)
 */
export function RadialSliderInput({
  min,
  max,
  value,
  onChange,
  step = 1,
  unit = '',
}: RadialSliderInputProps) {
  return (
    <View style={styles.container}>
      <RadialSlider
        variant="default"
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        step={step}
        unit={unit}
        radius={120}
        thumbRadius={16}
        thumbColor="#789F80"
        thumbBorderColor="#FFFFFF"
        thumbBorderWidth={4}
        linearGradient={[
          { offset: '0%', color: '#A8D5BA' },
          { offset: '100%', color: '#789F80' }
        ]}
        sliderTrackColor="#E5E5E5"
        sliderWidth={12}
        isHideTitle={true}
        isHideSubtitle={true}
        isHideButtons={true}
        isHideTailText={false}
        valueStyle={styles.valueText}
        unitStyle={styles.unitText}
        contentStyle={styles.content}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    width: '100%',
  },
  content: {
    alignItems: 'center',
  },
  valueText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#789F80',
  },
  unitText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#789F80',
    marginLeft: 8,
  },
});
