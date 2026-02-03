/**
 * Onboarding flow configurations for Cook More and Order Less journeys
 */

export type QuestionType = 'single-choice' | 'multi-choice' | 'slider' | 'text' | 'logo-choice' | 'scroll-picker';

export interface QuestionOption {
  id: string;
  label: string;
  subtitle?: string;
  icon?: string;
  logo?: any; // For logo-based options (image source)
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
  unit?: string; // Unit for slider values (e.g., '$', 'min')
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
        icon: 'fire',
      },
      {
        id: 'instant-ramen',
        label: 'Instant Ramen Maker',
        subtitle: '(Low effort meals)',
        icon: 'bowl-rice',
      },
      {
        id: 'bulk-meal-prepper',
        label: 'Bulk Meal Prepper',
        subtitle: '(Low effort, repetitive meals)',
        icon: 'box',
      },
      {
        id: 'aspiring-chef',
        label: 'Aspiring Chef',
        subtitle: '(Medium effort, Medium creativity)',
        icon: 'user-chef',
      },
      {
        id: 'michelin-chef',
        label: 'Michelin Chef',
        subtitle: '(High effort, Complex meals)',
        icon: 'award',
      },
    ],
  },
  {
    id: 'shopping-frequency',
    type: 'single-choice',
    title: 'When do you typically shop for groceries?',
    options: [
      {
        id: 'beginning',
        label: 'Beginning of the Week',
        icon: 'calendar-week',
      },
      {
        id: 'weekends',
        label: 'Weekends',
        icon: 'calendar-day',
      },
      {
        id: 'monthly',
        label: 'Monthly',
        icon: 'calendar-alt',
      },
      {
        id: 'whenever',
        label: 'Whenever I can!',
        icon: 'calendar-check',
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
    unit: '$',
  },
  {
    id: 'cooking-commitment',
    type: 'scroll-picker',
    title: 'How many times do you want to commit to cooking this week?',
    options: [
      {
        id: '1',
        label: '1x',
      },
      {
        id: '2',
        label: '2x',
      },
      {
        id: '3',
        label: '3x',
      },
      {
        id: '4',
        label: '4x',
      },
      {
        id: '5',
        label: '5x',
      },
    ],
  },
];

/**
 * Order Less Journey Flow
 * Focus on reducing food delivery orders
 */
export const ORDER_LESS_FLOW: OnboardingQuestion[] = [
  {
    id: 'order-type',
    type: 'single-choice',
    title: 'Do you order more...',
    options: [
      {
        id: 'late-night',
        label: 'Late Night Delivery',
        icon: 'moon',
      },
      {
        id: 'weekly-meals',
        label: 'Weekly Meals',
        icon: 'calendar-week',
      },
    ],
  },
  {
    id: 'delivery-app',
    type: 'logo-choice',
    title: 'Which app do you use most often?',
    options: [
      {
        id: 'ubereats',
        label: 'Uber Eats',
        logo: require('../assets/images/ubereats.png'),
      },
      {
        id: 'doordash',
        label: 'DoorDash',
        logo: require('../assets/images/doordash.png'),
      },
      {
        id: 'postmates',
        label: 'Postmates',
        logo: require('../assets/images/postmates.png'),
      },
      {
        id: 'grubhub',
        label: 'GrubHub',
        logo: require('../assets/images/grubhub.png'),
      },
    ],
  },
  {
    id: 'app-spend',
    type: 'slider',
    title: 'How much do you spend on that app every week?',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    unit: '$',
  },
  {
    id: 'delivery-wait-time',
    type: 'slider',
    title: 'How long do you usually wait for your delivery?',
    min: 15,
    max: 120,
    step: 5,
    defaultValue: 60,
    unit: 'min',
  },
  {
    id: 'cooking-identity',
    type: 'single-choice',
    title: 'Which identity speaks to you most?',
    options: [
      {
        id: 'cereal-burner',
        label: 'Cereal Burner',
        subtitle: "(can't make anything well)",
        icon: 'fire',
      },
      {
        id: 'instant-ramen',
        label: 'Instant Ramen Maker',
        subtitle: '(Low effort meals)',
        icon: 'bowl-rice',
      },
      {
        id: 'bulk-meal-prepper',
        label: 'Bulk Meal Prepper',
        subtitle: '(Low effort, repetitive meals)',
        icon: 'box',
      },
      {
        id: 'aspiring-chef',
        label: 'Aspiring Chef',
        subtitle: '(Medium effort, Medium creativity)',
        icon: 'user-chef',
      },
      {
        id: 'michelin-chef',
        label: 'Michelin Chef',
        subtitle: '(High effort, Complex meals)',
        icon: 'award',
      },
    ],
  },
  {
    id: 'ordering-commitment',
    type: 'scroll-picker',
    title: 'How many times do you want to commit to ordering this week?',
    options: [
      {
        id: '1',
        label: '1x',
      },
      {
        id: '2',
        label: '2x',
      },
      {
        id: '3',
        label: '3x',
      },
      {
        id: '4',
        label: '4x',
      },
      {
        id: '5',
        label: '5x',
      },
    ],
  },
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
