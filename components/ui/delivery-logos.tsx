import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

/**
 * Food delivery logos component showing integration partners
 * Based on the Figma design
 */
export function DeliveryLogos() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Integrates with your favorite food delivery apps</Text>
      
      <View style={styles.logosContainer}>
        {/* Uber Eats Logo */}
        <View style={styles.logoItem}>
          <Text style={styles.uberText}>
            Uber <Text style={styles.uberEatsGreen}>Eats</Text>
          </Text>
        </View>
        
        {/* DoorDash Logo */}
        <View style={styles.logoItem}>
          <Text style={styles.doordashText}>DOORDASH</Text>
        </View>
        
        {/* Postmates Logo */}
        <View style={styles.logoItem}>
          <View style={styles.postmatesContainer}>
            <Svg width="40" height="40" viewBox="0 0 40 40">
              {/* Bicycle icon simplified */}
              <G>
                <Path
                  d="M 15 25 A 4 4 0 1 1 15 24.99"
                  stroke="#000"
                  strokeWidth="1.5"
                  fill="none"
                />
                <Path
                  d="M 25 25 A 4 4 0 1 1 25 24.99"
                  stroke="#000"
                  strokeWidth="1.5"
                  fill="none"
                />
                <Path
                  d="M 15 25 L 18 20 L 22 20 L 25 25"
                  stroke="#000"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M 18 20 L 20 16 L 24 18"
                  stroke="#000"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Stars */}
                <Path d="M 10 15 L 11 17 L 9 17 Z" fill="#000" />
                <Path d="M 12 12 L 13 14 L 11 14 Z" fill="#000" />
                <Path d="M 8 18 L 9 20 L 7 20 Z" fill="#000" />
              </G>
            </Svg>
            <Text style={styles.postmatesText}>POSTMATES</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  logosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  logoItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  uberText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    letterSpacing: -0.5,
  },
  uberEatsGreen: {
    color: '#06C167',
    fontWeight: 'bold',
  },
  doordashText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF3008',
    letterSpacing: 0.5,
  },
  postmatesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  postmatesText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    letterSpacing: 0.5,
  },
});
