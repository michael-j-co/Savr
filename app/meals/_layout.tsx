import { Stack } from 'expo-router';

/**
 * Stack navigator for meals section
 */
export default function MealsLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="check-in" 
        options={{ 
          headerShown: false,
          presentation: 'card',
        }} 
      />
    </Stack>
  );
}
