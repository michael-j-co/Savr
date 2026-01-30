/**
 * Onboarding flow configurations for Cook More and Order Less journeys
 */

export type QuestionType = 'single-choice' | 'multi-choice' | 'slider' | 'text';

export interface QuestionOption {
  id: string;
  label: string;
  subtitle?: string;
  icon?: string;
}

export interface OnboardingQuestion {
  id: string;
  type: QuestionType;
  title: string;
  options?: QuestionOption[];
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: any;
}

/**
 * Cook More Journey Flow
 * Focus on cooking at home more frequently
 */
export const COOK_MORE_FLOW: OnboardingQuestion[] = [
  {
    id: 'cooking-identity',
    type: 'single-choice',
    title: 'Which identity speaks to you most?',
    options: [
      {
        id: 'cereal-burner',
        label: 'Cereal Burner',
        subtitle: "(can't make anything well)",
        icon: 'restaurant',
      },
      {
        id: 'instant-ramen',
        label: 'Instant Ramen Maker',
        subtitle: '(Low effort meals)',
        icon: 'restaurant-menu',
      },
      {
        id: 'bulk-meal-prepper',
        label: 'Bulk Meal Prepper',
        subtitle: '(Low effort, repetitive meals)',
        icon: 'kitchen',
      },
      {
        id: 'aspiring-chef',
        label: 'Aspiring Chef',
        subtitle: '(Medium effort, Medium creativity)',
        icon: 'restaurant',
      },
      {
        id: 'michelin-chef',
        label: 'Michelin Chef',
        subtitle: '(High effort, Complex meals)',
        icon: 'restaurant',
      },
    ],
  },
  // Add more Cook More questions as needed based on Figma
];

/**
 * Order Less Journey Flow
 * Focus on reducing food delivery orders
 */
export const ORDER_LESS_FLOW: OnboardingQuestion[] = [
  {
    id: 'shopping-frequency',
    type: 'single-choice',
    title: 'When do you typically shop for groceries?',
    options: [
      {
        id: 'beginning',
        label: 'Beginning of the Week',
        icon: 'event',
      },
      {
        id: 'weekends',
        label: 'Weekends',
        icon: 'event',
      },
      {
        id: 'monthly',
        label: 'Monthly',
        icon: 'event',
      },
      {
        id: 'whenever',
        label: 'Whenever I can!',
        icon: 'event',
      },
    ],
  },
  {
    id: 'grocery-spend',
    type: 'slider',
    title: 'How much do you spend on groceries every time you shop?',
    min: 50,
    max: 150,
    step: 1,
    defaultValue: 100,
  },
  // Add more Order Less questions as needed based on Figma
];

/**
 * Get the flow configuration for a specific journey type
 */
export function getFlowForJourney(journeyType: 'order-less' | 'cook-more'): OnboardingQuestion[] {
  return journeyType === 'cook-more' ? COOK_MORE_FLOW : ORDER_LESS_FLOW;
}

/**
 * Get total number of steps in a journey
 */
export function getTotalSteps(journeyType: 'order-less' | 'cook-more'): number {
  return getFlowForJourney(journeyType).length;
}

/**
 * Get a specific question by step index
 */
export function getQuestion(
  journeyType: 'order-less' | 'cook-more',
  stepIndex: number
): OnboardingQuestion | null {
  const flow = getFlowForJourney(journeyType);
  return flow[stepIndex] || null;
}
