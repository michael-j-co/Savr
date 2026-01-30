/**
 * Always return 'light' to force light mode throughout the app
 * To re-enable automatic theme detection, replace with:
 * export { useColorScheme } from 'react-native';
 */
export function useColorScheme() {
  return 'light' as const;
}
