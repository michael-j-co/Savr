import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

interface LogoOptionButtonProps {
  logoSource: any;
  selected?: boolean;
  onPress: () => void;
}

/**
 * Option button that displays a logo image instead of text
 * Used for delivery app selection
 */
export function LogoOptionButton({
  logoSource,
  selected = false,
  onPress,
}: LogoOptionButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, selected && styles.buttonSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.logoContainer}>
        <Image
          source={logoSource}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    width: '90%',
    maxWidth: 320,
    alignSelf: 'center',
    minHeight: 80,
    // Shadow for elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonSelected: {
    backgroundColor: '#F0F7F2',
  },
  logoContainer: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '80%',
    height: '100%',
  },
});
