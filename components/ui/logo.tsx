import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface LogoProps {
  size?: number;
}

/**
 * Savr logo component using the actual logo asset
 */
export function Logo({ size = 180 }: LogoProps) {
  const fontSize = size * 0.22;

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/savrlogo.png')}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
      
      <Text style={[styles.tagline, { fontSize }]}>
        Save | Sustain | Savor
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tagline: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginTop: 8,
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
