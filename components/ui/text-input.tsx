import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';
import React from 'react';
import { TextInput as RNTextInput, StyleSheet, Text, View, type TextInputProps } from 'react-native';

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  icon?: 'envelope.fill' | 'lock.fill';
  errorMessage?: string;
  warningMessage?: string;
};

/**
 * Themed text input component with optional icon and error/warning messages
 */
export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  icon,
  errorMessage,
  warningMessage,
  ...rest
}: ThemedTextInputProps) {
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const backgroundColor = useThemeColor({}, 'inputBackground');
  const borderColor = useThemeColor({}, 'inputBorder');
  const placeholderColor = useThemeColor({}, 'placeholderText');
  const infoTextColor = useThemeColor({}, 'infoText');

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, { backgroundColor, borderColor }]}>
        {icon && (
          <View style={styles.iconContainer}>
            <IconSymbol name={icon} size={20} color={placeholderColor} />
          </View>
        )}
        <RNTextInput
          style={[
            styles.input,
            { color: textColor },
            icon && styles.inputWithIcon,
            style,
          ]}
          placeholderTextColor={placeholderColor}
          {...rest}
        />
      </View>
      {(errorMessage || warningMessage) && (
        <View style={styles.messageContainer}>
          {warningMessage && (
            <View style={styles.warningContainer}>
              <IconSymbol name="exclamationmark.triangle.fill" size={12} color={infoTextColor} />
              <Text style={[styles.warningText, { color: infoTextColor }]}>{warningMessage}</Text>
            </View>
          )}
          {errorMessage && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 2,
    // Subtle shadow for elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconContainer: {
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
  },
  inputWithIcon: {
    paddingLeft: 0,
  },
  messageContainer: {
    marginTop: 6,
    paddingHorizontal: 4,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  warningText: {
    fontSize: 12,
    lineHeight: 16,
  },
  errorText: {
    fontSize: 12,
    color: '#D32F2F',
    lineHeight: 16,
  },
});
