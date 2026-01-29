import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path, Text as SvgText } from 'react-native-svg';

interface LogoProps {
  size?: number;
}

/**
 * Savr logo component with pot icon and down arrow
 * Based on the Figma design
 */
export function Logo({ size = 180 }: LogoProps) {
  const iconSize = size * 0.6;
  const fontSize = size * 0.22;

  return (
    <View style={styles.container}>
      <Svg width={iconSize} height={iconSize} viewBox="0 0 120 120">
        {/* Pot lid handle */}
        <Path
          d="M 50 20 Q 60 15 70 20"
          stroke="#789F80"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Pot lid */}
        <Path
          d="M 30 30 L 90 30 L 85 40 L 35 40 Z"
          fill="#789F80"
          stroke="#789F80"
          strokeWidth="2"
        />
        
        {/* Pot body */}
        <Path
          d="M 35 40 L 40 75 Q 40 80 45 80 L 75 80 Q 80 80 80 75 L 85 40 Z"
          fill="none"
          stroke="#789F80"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Text "Savr" inside pot */}
        <SvgText
          x="60"
          y="62"
          fontSize="18"
          fontWeight="bold"
          fill="#789F80"
          textAnchor="middle"
        >
          Savr
        </SvgText>
        
        {/* Down arrow */}
        <Path
          d="M 60 85 L 60 105"
          stroke="#789F80"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <Path
          d="M 50 95 L 60 105 L 70 95"
          stroke="#789F80"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
      
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
