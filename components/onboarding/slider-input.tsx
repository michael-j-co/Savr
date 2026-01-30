import React, { useState } from 'react';
import { PanResponder, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

interface SliderInputProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  step?: number;
}

/**
 * Semicircular slider for numeric inputs
 * Features a green gradient arc with draggable indicator and center value display
 */
export function SliderInput({
  min,
  max,
  value,
  onChange,
  step = 1,
}: SliderInputProps) {
  const [localValue, setLocalValue] = useState(value);

  // Slider dimensions
  const width = 280;
  const height = 180;
  const radius = 120;
  const centerX = width / 2;
  const centerY = height - 20;
  const startAngle = Math.PI; // 180 degrees (left)
  const endAngle = 0; // 0 degrees (right)
  const angleRange = startAngle - endAngle;

  // Calculate angle from value
  const valueToAngle = (val: number): number => {
    const normalized = (val - min) / (max - min);
    return startAngle - normalized * angleRange;
  };

  // Calculate value from angle
  const angleToValue = (angle: number): number => {
    const normalized = (startAngle - angle) / angleRange;
    const rawValue = min + normalized * (max - min);
    return Math.round(rawValue / step) * step;
  };

  // Current angle
  const currentAngle = valueToAngle(localValue);

  // Indicator position
  const indicatorX = centerX + radius * Math.cos(currentAngle);
  const indicatorY = centerY - radius * Math.sin(currentAngle);

  // Pan responder for dragging
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const dx = gestureState.moveX - centerX;
      const dy = centerY - gestureState.moveY;
      let angle = Math.atan2(dy, dx);
      
      // Constrain angle to valid range
      if (angle < 0) angle = 0;
      if (angle > Math.PI) angle = Math.PI;
      
      const newValue = angleToValue(angle);
      const clampedValue = Math.max(min, Math.min(max, newValue));
      
      setLocalValue(clampedValue);
      onChange(clampedValue);
    },
  });

  // Create arc path
  const createArcPath = (): string => {
    const startX = centerX + radius * Math.cos(startAngle);
    const startY = centerY - radius * Math.sin(startAngle);
    const endX = centerX + radius * Math.cos(currentAngle);
    const endY = centerY - radius * Math.sin(currentAngle);
    
    const largeArcFlag = currentAngle < Math.PI / 2 ? 1 : 0;
    
    return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer} {...panResponder.panHandlers}>
        <Svg width={width} height={height}>
          {/* Background arc */}
          <Path
            d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`}
            stroke="#E0E0E0"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Filled arc */}
          <Path
            d={createArcPath()}
            stroke="#789F80"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Indicator */}
          <Circle
            cx={indicatorX}
            cy={indicatorY}
            r="10"
            fill="#FFFFFF"
            stroke="#789F80"
            strokeWidth="3"
          />
        </Svg>
        
        {/* Value display */}
        <View style={styles.valueContainer}>
          <Text style={styles.valueText}>${localValue}</Text>
        </View>
      </View>
      
      {/* Min/Max labels */}
      <View style={styles.labelsContainer}>
        <Text style={styles.labelText}>${min}</Text>
        <Text style={styles.labelText}>${max}+</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 32,
  },
  sliderContainer: {
    position: 'relative',
  },
  valueContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  valueText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 260,
    marginTop: 8,
  },
  labelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
});
