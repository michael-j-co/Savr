import type { IdentityIconSvg } from '@/constants/onboarding-flows';
import { getIdentityIconComponent } from '@/components/onboarding/identity-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface OptionButtonProps {
  label: string;
  subtitle?: string;
  icon?: string;
  /** Custom SVG for identity question; when set, used instead of icon */
  iconSvg?: IdentityIconSvg;
  selected?: boolean;
  onPress: () => void;
}

/**
 * Reusable button component for multiple choice questions in onboarding
 * White rounded background with icon, text, and optional subtitle
 * Matches styling of "What kind of Savr" screen
 */
const ICON_COLOR = '#789F80';

export function OptionButton({
  label,
  subtitle,
  icon,
  iconSvg,
  selected = false,
  onPress,
}: OptionButtonProps) {
  const IconComponent = iconSvg ? getIdentityIconComponent(iconSvg) : null;

  return (
    <TouchableOpacity
      style={[styles.button, selected && styles.buttonSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {(icon || iconSvg) && (
        <View style={styles.iconContainer}>
          {IconComponent ? (
            <IconComponent size={32} color={ICON_COLOR} />
          ) : (
            icon && (
              <FontAwesome5
                name={icon}
                size={32}
                color={ICON_COLOR}
                solid
              />
            )
          )}
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
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    width: '90%',
    maxWidth: 320,
    alignSelf: 'center',
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
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666666',
  },
  labelSelected: {
    color: '#789F80',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  subtitleSelected: {
    color: '#5A7A64',
  },
});
