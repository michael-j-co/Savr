/**
 * Always return 'light' to force light mode throughout the app (web version)
 * To re-enable automatic theme detection, restore the original implementation
 */
export function useColorScheme() {
  return 'light' as const;
}
