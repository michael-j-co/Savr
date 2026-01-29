/**
 * Savr app theme colors and design tokens
 */

import { Platform } from 'react-native';

// Savr brand colors
const primaryGreen = '#789F80';
const sageGreenBg = 'rgba(120, 159, 128, 0.28)';
const white = '#FFFFFF';
const textDark = '#11181C';
const textLight = '#ECEDEE';
const infoGreen = '#789F80';

export const Colors = {
  light: {
    text: textDark,
    background: white,
    tint: primaryGreen,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: primaryGreen,
    // Auth screen specific colors
    authBackground: sageGreenBg,
    formBackground: white,
    buttonPrimary: primaryGreen,
    buttonText: white,
    inputBorder: '#E0E0E0',
    inputBackground: white,
    infoText: infoGreen,
    placeholderText: '#999999',
  },
  dark: {
    text: textLight,
    background: '#151718',
    tint: primaryGreen,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: primaryGreen,
    // Auth screen specific colors
    authBackground: '#1a2e1f',
    formBackground: '#2a2a2a',
    buttonPrimary: primaryGreen,
    buttonText: white,
    inputBorder: '#404040',
    inputBackground: '#2a2a2a',
    infoText: infoGreen,
    placeholderText: '#666666',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
