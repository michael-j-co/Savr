import { OnboardingLayout } from '@/components/onboarding/onboarding-layout';
import { OptionButton } from '@/components/onboarding/option-button';
import { SliderInput } from '@/components/onboarding/slider-input';
import {
    getQuestion,
    getTotalSteps,
    type OnboardingQuestion,
} from '@/constants/onboarding-flows';
import { useThemeColor } from '@/hooks/use-theme-color';
import {
    completeOnboarding,
    getOnboardingData,
    saveOnboardingAnswer,
} from '@/utils/onboarding-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Dynamic journey screen renderer
 * Handles both "Order Less" and "Cook More" journeys with step-by-step navigation
 */
export default function JourneyScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const journeyType = params.type as 'order-less' | 'cook-more';
  const currentStepIndex = parseInt(params.step as string, 10) || 0;

  const [selectedValue, setSelectedValue] = useState<any>(null);
  const [question, setQuestion] = useState<OnboardingQuestion | null>(null);
  const totalSteps = getTotalSteps(journeyType);
  const buttonColor = useThemeColor({}, 'buttonPrimary');
  const buttonTextColor = useThemeColor({}, 'buttonText');

  // Load question and existing answer
  useEffect(() => {
    const loadQuestion = async () => {
      const q = getQuestion(journeyType, currentStepIndex);
      setQuestion(q);

      if (q) {
        // Load existing answer if available
        const data = await getOnboardingData();
        const existingAnswer = data?.answers?.[q.id];
        if (existingAnswer !== undefined) {
          setSelectedValue(existingAnswer);
        } else if (q.type === 'slider' && q.defaultValue !== undefined) {
          setSelectedValue(q.defaultValue);
        }
      }
    };

    loadQuestion();
  }, [journeyType, currentStepIndex]);

  const handleBack = () => {
    if (currentStepIndex > 0) {
      router.setParams({ step: (currentStepIndex - 1).toString() });
    } else {
      router.back();
    }
  };

  const handleNext = async () => {
    if (!question || selectedValue === null) return;

    // Save the answer
    await saveOnboardingAnswer(question.id, selectedValue);

    // Check if this is the last question
    if (currentStepIndex >= totalSteps - 1) {
      // Complete onboarding
      await completeOnboarding();
      router.replace('/(tabs)');
    } else {
      // Go to next question
      router.setParams({ step: (currentStepIndex + 1).toString() });
      setSelectedValue(null);
    }
  };

  if (!question) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const canProceed = selectedValue !== null;

  return (
    <OnboardingLayout
      currentStep={currentStepIndex}
      totalSteps={totalSteps}
      onBack={handleBack}
    >
      {/* Question Title */}
      <Text style={styles.questionTitle}>{question.title}</Text>

      {/* Question Content */}
      <View style={styles.questionContent}>
        {question.type === 'single-choice' && question.options && (
          <View style={styles.optionsContainer}>
            {question.options.map((option) => (
              <OptionButton
                key={option.id}
                label={option.label}
                subtitle={option.subtitle}
                icon={option.icon}
                selected={selectedValue === option.id}
                onPress={() => setSelectedValue(option.id)}
              />
            ))}
          </View>
        )}

        {question.type === 'slider' && (
          <SliderInput
            min={question.min || 0}
            max={question.max || 100}
            value={selectedValue || question.defaultValue || 50}
            onChange={setSelectedValue}
            step={question.step || 1}
          />
        )}
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={[
          styles.nextButton,
          { backgroundColor: buttonColor },
          !canProceed && styles.nextButtonDisabled,
        ]}
        onPress={handleNext}
        disabled={!canProceed}
        activeOpacity={0.8}
      >
        <Text style={[styles.nextButtonText, { color: buttonTextColor }]}>
          {currentStepIndex >= totalSteps - 1 ? 'Finish' : 'Next'}
        </Text>
      </TouchableOpacity>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  questionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 36,
  },
  questionContent: {
    flex: 1,
    width: '100%',
  },
  optionsContainer: {
    width: '100%',
  },
  nextButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
