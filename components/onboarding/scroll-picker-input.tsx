import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import WheelPicker from 'react-native-wheely';

interface ScrollPickerOption {
  id: string;
  label: string;
}

interface ScrollPickerInputProps {
  options: ScrollPickerOption[];
  value: string | null;
  onChange: (value: string) => void;
}

/**
 * Vertical scroll picker for selecting commitment frequency
 * Uses react-native-wheely for smooth iOS-style wheel picker
 * Features:
 * - Selected item: full opacity, larger scale
 * - Non-selected items: reduced opacity (40%), smaller scale (80%)
 * - Smooth scroll snap to center
 * - No dividers between options
 */
export function ScrollPickerInput({
  options,
  value,
  onChange,
}: ScrollPickerInputProps) {
  const [selectedIndex, setSelectedIndex] = useState(() => {
    const index = options.findIndex((opt) => opt.id === value);
    return index >= 0 ? index : 0;
  });

  const handleChange = (index: number) => {
    setSelectedIndex(index);
    onChange(options[index].id);
  };

  return (
    <View style={styles.container}>
      <WheelPicker
        selectedIndex={selectedIndex}
        options={options.map(opt => opt.label)}
        onChange={handleChange}
        itemHeight={60}
        itemTextStyle={styles.itemText}
        containerStyle={styles.pickerContainer}
        selectedIndicatorStyle={styles.selectedIndicator}
        visibleRest={2}
        decelerationRate="fast"
        // Custom opacity function: selected = 1.0, others = 0.4
        opacityFunction={(x: number) => {
          if (x === 0) return 1.0;
          return 0.4;
        }}
        // Custom scale function: selected = 1.0, others = 0.8
        scaleFunction={(x: number) => {
          if (x === 0) return 1.0;
          return 0.8;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  pickerContainer: {
    width: '100%',
    height: 300,
  },
  itemText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#789F80',
  },
  selectedIndicator: {
    backgroundColor: 'rgba(120, 159, 128, 0.1)',
    borderRadius: 12,
  },
});
