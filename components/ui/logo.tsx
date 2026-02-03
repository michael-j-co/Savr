import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface LogoProps {
  size?: number;
}

/**
 * Savr logo component using the actual logo asset
 */
export function Logo({ size = 180 }: LogoProps) {
  // Reduced font size multiplier for better fit on phone screens
  const fontSize = size * 0.18;

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/savrlogo.png')}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
      
      <Text style={[styles.tagline, { fontSize }]} numberOfLines={1} adjustsFontSizeToFit>
        Save | Sustain | Savor
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  tagline: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginTop: 8,
    // Reduced letter spacing for better fit
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    // Ensure text stays within container width
    maxWidth: '100%',
    paddingHorizontal: 10,
  },
});
