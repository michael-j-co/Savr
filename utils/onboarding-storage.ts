import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_KEY = '@savr_onboarding_data';

export interface OnboardingData {
  completed: boolean;
  journeyType: 'order-less' | 'cook-more';
  answers: {
    [key: string]: any;
  };
  completedAt?: string;
}

/**
 * Retrieve onboarding data from AsyncStorage
 */
export async function getOnboardingData(): Promise<OnboardingData | null> {
  try {
    const jsonValue = await AsyncStorage.getItem(ONBOARDING_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error loading onboarding data:', error);
    return null;
  }
}

/**
 * Save a single onboarding answer
 */
export async function saveOnboardingAnswer(key: string, value: any): Promise<void> {
  try {
    const existingData = await getOnboardingData();
    const updatedData: OnboardingData = {
      completed: false,
      journeyType: existingData?.journeyType || 'order-less',
      answers: {
        ...(existingData?.answers || {}),
        [key]: value,
      },
    };
    
    const jsonValue = JSON.stringify(updatedData);
    await AsyncStorage.setItem(ONBOARDING_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving onboarding answer:', error);
  }
}

/**
 * Set the journey type (order-less or cook-more)
 */
export async function setJourneyType(journeyType: 'order-less' | 'cook-more'): Promise<void> {
  try {
    const existingData = await getOnboardingData();
    const updatedData: OnboardingData = {
      completed: false,
      journeyType,
      answers: existingData?.answers || {},
    };
    
    const jsonValue = JSON.stringify(updatedData);
    await AsyncStorage.setItem(ONBOARDING_KEY, jsonValue);
  } catch (error) {
    console.error('Error setting journey type:', error);
  }
}

/**
 * Mark onboarding as complete
 */
export async function completeOnboarding(): Promise<void> {
  try {
    const existingData = await getOnboardingData();
    if (!existingData) {
      console.error('No onboarding data to complete');
      return;
    }
    
    const completedData: OnboardingData = {
      ...existingData,
      completed: true,
      completedAt: new Date().toISOString(),
    };
    
    const jsonValue = JSON.stringify(completedData);
    await AsyncStorage.setItem(ONBOARDING_KEY, jsonValue);
  } catch (error) {
    console.error('Error completing onboarding:', error);
  }
}

/**
 * Clear all onboarding data (useful for testing)
 */
export async function clearOnboardingData(): Promise<void> {
  try {
    await AsyncStorage.removeItem(ONBOARDING_KEY);
  } catch (error) {
    console.error('Error clearing onboarding data:', error);
  }
}

/**
 * Check if onboarding is completed
 */
export async function isOnboardingCompleted(): Promise<boolean> {
  const data = await getOnboardingData();
  return data?.completed || false;
}
