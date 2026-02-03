import { LogoOptionButton } from '@/components/onboarding/logo-option-button';
import { OnboardingLayout } from '@/components/onboarding/onboarding-layout';
import { OptionButton } from '@/components/onboarding/option-button';
import { PermissionModal } from '@/components/onboarding/permission-modal';
import { RadialSliderInput } from '@/components/onboarding/radial-slider-input';
import { ScrollPickerInput } from '@/components/onboarding/scroll-picker-input';
import { TwoOptionLayout } from '@/components/onboarding/two-option-layout';
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
import { FontAwesome5 } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [selectedAppName, setSelectedAppName] = useState('');
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
        } else if (q.type === 'scroll-picker' && !existingAnswer) {
          // Initialize scroll picker with first option if no answer
          setSelectedValue(null);
        } else {
          // For other question types, reset to null
          setSelectedValue(null);
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

    // Check if this is the delivery app question - show permission modal first
    if (question.id === 'delivery-app') {
      // Find the selected app name
      const selectedOption = question.options?.find(opt => opt.id === selectedValue);
      if (selectedOption) {
        setSelectedAppName(selectedOption.label);
        setShowPermissionModal(true);
        return; // Don't proceed yet, wait for modal response
      }
    }

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

  const handlePermissionResponse = async (granted: boolean) => {
    setShowPermissionModal(false);
    
    // Save the permission response along with the app selection
    await saveOnboardingAnswer(question!.id, selectedValue);
    await saveOnboardingAnswer('app-permission-granted', granted);

    // Proceed to next question
    if (currentStepIndex >= totalSteps - 1) {
      await completeOnboarding();
      router.replace('/(tabs)');
    } else {
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

  // Check if this is a two-option question (use special layout)
  const isTwoOptionQuestion =
    question.type === 'single-choice' &&
    question.options &&
    question.options.length === 2;

  // For two-option questions, use the special layout without OnboardingLayout wrapper
  if (isTwoOptionQuestion && question.options) {
    const backgroundColor = useThemeColor({}, 'authBackground');
    return (
      <SafeAreaView style={[styles.fullScreenContainer, { backgroundColor }]}>
        {/* Back button at top */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <FontAwesome5 name="chevron-left" size={24} color="#FFFFFF" solid />
          </TouchableOpacity>
        </View>

        <TwoOptionLayout
          title={question.title}
          option1={{
            id: question.options[0].id,
            label: question.options[0].label,
            icon: question.options[0].icon || 'circle',
          }}
          option2={{
            id: question.options[1].id,
            label: question.options[1].label,
            icon: question.options[1].icon || 'circle',
          }}
          onSelect={async (optionId) => {
            setSelectedValue(optionId);
            // Auto-advance after selection
            await saveOnboardingAnswer(question.id, optionId);
            if (currentStepIndex >= totalSteps - 1) {
              await completeOnboarding();
              router.replace('/(tabs)');
            } else {
              router.setParams({ step: (currentStepIndex + 1).toString() });
              setSelectedValue(null);
            }
          }}
        />
      </SafeAreaView>
    );
  }

  // For all other questions, use the standard OnboardingLayout
  return (
    <OnboardingLayout
      currentStep={currentStepIndex}
      totalSteps={totalSteps}
      onBack={handleBack}
      scrollEnabled={question.type !== 'slider' && question.type !== 'scroll-picker'}
    >
      <View style={styles.contentWrapper}>
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

          {question.type === 'logo-choice' && question.options && (
            <View style={styles.optionsContainer}>
              {question.options.map((option) => (
                <LogoOptionButton
                  key={option.id}
                  logoSource={option.logo}
                  selected={selectedValue === option.id}
                  onPress={() => setSelectedValue(option.id)}
                />
              ))}
            </View>
          )}

          {question.type === 'slider' && selectedValue !== null && (
            <RadialSliderInput
              key={question.id}
              min={question.min || 0}
              max={question.max || 100}
              value={selectedValue}
              onChange={setSelectedValue}
              step={question.step || 1}
              unit={question.unit || ''}
            />
          )}

          {question.type === 'scroll-picker' && question.options && (
            <ScrollPickerInput
              options={question.options}
              value={selectedValue}
              onChange={setSelectedValue}
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
      </View>

      {/* Permission Modal */}
      <PermissionModal
        visible={showPermissionModal}
        appName={selectedAppName}
        onYes={() => handlePermissionResponse(true)}
        onNo={() => handlePermissionResponse(false)}
      />
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
  fullScreenContainer: {
    flex: 1,
  },
  topBar: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 40,
  },
  questionContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  nextButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    width: '100%',
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
