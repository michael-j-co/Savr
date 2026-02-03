import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TwoOptionLayoutProps {
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  option1: {
    id: string;
    label: string;
    icon: string;
    highlight?: string;
  };
  option2: {
    id: string;
    label: string;
    icon: string;
    highlight?: string;
  };
  onSelect: (optionId: string) => void;
}

/**
 * Reusable two-option layout component for onboarding screens
 * Displays two large prominent buttons with icons, separated by "or"
 * Used for journey selection and any question with exactly 2 options
 */
export function TwoOptionLayout({
  title,
  titleHighlight,
  subtitle,
  option1,
  option2,
  onSelect,
}: TwoOptionLayoutProps) {
  return (
    <View style={styles.content}>
      {/* Title */}
      <Text style={styles.title}>
        {titleHighlight ? (
          <>
            {title.split(titleHighlight)[0]}
            <Text style={styles.titleHighlight}>{titleHighlight}</Text>
            {title.split(titleHighlight)[1]}
          </>
        ) : (
          title
        )}
      </Text>

      {/* Subtitle - always takes up space for consistent layout */}
      <Text style={[styles.subtitle, !subtitle && styles.subtitleHidden]}>
        {subtitle || ' '}
      </Text>

      {/* Options Container */}
      <View style={styles.optionsContainer}>
        {/* Option 1 Button */}
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => onSelect(option1.id)}
          activeOpacity={0.8}
        >
          <View style={styles.iconContainer}>
            <FontAwesome5 name={option1.icon} size={32} color="#789F80" solid />
          </View>
          <Text style={styles.optionLabel}>
            {option1.highlight ? (
              <>
                {option1.label.split(option1.highlight)[0]}
                <Text style={styles.optionHighlight}>{option1.highlight}</Text>
                {option1.label.split(option1.highlight)[1]}
              </>
            ) : (
              option1.label
            )}
          </Text>
        </TouchableOpacity>

        {/* Or Text */}
        <Text style={styles.orText}>or</Text>

        {/* Option 2 Button */}
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => onSelect(option2.id)}
          activeOpacity={0.8}
        >
          <View style={styles.iconContainer}>
            <FontAwesome5 name={option2.icon} size={32} color="#789F80" solid />
          </View>
          <Text style={styles.optionLabel}>
            {option2.highlight ? (
              <>
                {option2.label.split(option2.highlight)[0]}
                <Text style={styles.optionHighlight}>{option2.highlight}</Text>
                {option2.label.split(option2.highlight)[1]}
              </>
            ) : (
              option2.label
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 40,
  },
  titleHighlight: {
    color: '#789F80',
  },
  subtitle: {
    fontSize: 18,
    color: '#789F80',
    marginTop: 32,
    marginBottom: 24,
  },
  subtitleHidden: {
    opacity: 0,
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 24,
    width: '90%',
    maxWidth: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    marginRight: 16,
  },
  optionLabel: {
    fontSize: 24,
    fontWeight: '600',
    color: '#666666',
  },
  optionHighlight: {
    color: '#789F80',
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginVertical: 16,
    fontWeight: '500',
  },
});
