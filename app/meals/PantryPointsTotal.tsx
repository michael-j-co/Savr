import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

type PantryPointsTotalProps = {
  value: number | string;
  containerStyle?: StyleProp<ViewStyle>;
};

/**
 * Displays the total pantry points value with a bold fill
 * and crisp black outline using layered text.
 */
export function PantryPointsTotal({ value, containerStyle }: PantryPointsTotalProps) {
  return (
    <View style={[styles.wrapper, containerStyle]}>
      {/* Outline layers */}
      <Text style={[styles.textBase, styles.outline, { top: -1, left: -1 }]}>{value}</Text>
      <Text style={[styles.textBase, styles.outline, { top: -1, left: 1 }]}>{value}</Text>
      <Text style={[styles.textBase, styles.outline, { top: 1, left: -1 }]}>{value}</Text>
      <Text style={[styles.textBase, styles.outline, { top: 1, left: 1 }]}>{value}</Text>

      {/* Fill */}
      <Text style={[styles.textBase, styles.fill]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    width: '100%',
    height: 82,
    marginBottom: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textBase: {
    position: 'absolute',
    fontSize: 68,
    fontWeight: '800',
    textAlign: 'center',
    width: '100%',
  },

  outline: {
    color: '#000000',
  },

  fill: {
    color: '#88CC94',
  },
});