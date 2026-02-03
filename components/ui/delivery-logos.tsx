import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

/**
 * Food delivery logos component showing integration partners
 * Uses actual logo assets for delivery apps
 */
export function DeliveryLogos() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Integrates with your favorite food delivery apps</Text>
      
      <View style={styles.logosContainer}>
        {/* Uber Eats Logo */}
        <View style={styles.logoItem}>
          <Image
            source={require('../../assets/images/ubereats.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        
        {/* DoorDash Logo */}
        <View style={styles.logoItem}>
          <Image
            source={require('../../assets/images/doordash.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        
        {/* Postmates Logo */}
        <View style={styles.logoItem}>
          <Image
            source={require('../../assets/images/postmates.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  logosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  logoItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 60,
  },
});
