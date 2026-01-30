import { IconSymbol } from '@/components/ui/icon-symbol';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface OptionButtonProps {
  label: string;
  subtitle?: string;
  icon?: string;
  selected?: boolean;
  onPress: () => void;
}

/**
 * Reusable button component for multiple choice questions in onboarding
 * White rounded background with icon, text, and optional subtitle
 */
export function OptionButton({
  label,
  subtitle,
  icon,
  selected = false,
  onPress,
}: OptionButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, selected && styles.buttonSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon && (
        <View style={styles.iconContainer}>
          <IconSymbol
            name={icon as any}
            size={24}
            color={selected ? '#789F80' : '#666666'}
          />
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={[styles.label, selected && styles.labelSelected]}>
          {label}
        </Text>
        {subtitle && (
          <Text style={[styles.subtitle, selected && styles.subtitleSelected]}>
            {subtitle}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    // Shadow for elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonSelected: {
    borderColor: '#789F80',
    backgroundColor: '#F0F7F2',
  },
  iconContainer: {
    marginRight: 12,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  labelSelected: {
    color: '#789F80',
  },
  subtitle: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  subtitleSelected: {
    color: '#5A7A64',
  },
});
