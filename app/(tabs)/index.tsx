import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Logo } from '@/components/ui/logo';
import { StyleSheet } from 'react-native';

/**
 * Home screen shown after successful login
 * Placeholder for future app content
 */
export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <Logo size={150} />
      <ThemedText type="title" style={styles.title}>
        Welcome to Savr!
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        You've successfully logged in.
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        Start building your app content here.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    marginTop: 20,
    marginBottom: 12,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 8,
  },
});
