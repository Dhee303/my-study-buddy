/**
 * Core type definitions for Story Teacher E-Comic & Gamified Learning Platform
 */

export type MascotId = 'channie' | 'lee' | 'minnie' | 'felix';

export interface Mascot {
  id: MascotId;
  name: string;
  avatar: string; // Emoji
  title: string;
  specialty: string;
  colorScheme: {
    bg: string;
    border: string;
    text: string;
    gradient: string;
    badgeBg: string;
    bubbleBg: string;
  };
  greeting: string;
  catchphrase: string;
  correctReaction: string;
  hintReaction: string;
}

export interface Flashcard {
  front: string;
  back: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number | string; // 0, 1, 2, 3 or "A", "B", "C", "D"
  hintForWrongAnswer: string;
}

export interface StoryPayload {
  mascotIntro?: string;
  storyTitle: string;
  storyText: string[];
  flashcards?: Flashcard[];
  quiz: QuizQuestion[];
  learningKeyTakeaway?: string;
  conceptsMastered?: string[];
  recommendedNextTopic?: string;
  topic?: string;
  age?: number;
  mascot?: MascotId;
  isDemo?: boolean;
}

export interface GenerateStoryRequest {
  topic: string;
  age: number;
  mascot: MascotId;
  tone?: string;
  apiKey?: string;
}

export interface QuizDetail {
  questionIndex: number;
  question: string;
  selectedOption: string;
  selectedOptionIndex: number;
  correctAnswerIndex: number;
  isCorrect: boolean;
  attempts: number;
}

export interface QuizSubmission {
  score: number;
  total: number;
  percentage: number;
  details: QuizDetail[];
}

export interface GamificationState {
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  badges: string[]; // Unlocked Badge IDs
  storiesCompleted: number;
  flashcardsMastered: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  category: 'story' | 'quiz' | 'flashcard' | 'streak' | 'level';
}

export type AppScreen = 'setup' | 'story' | 'flashcards' | 'quiz' | 'dashboard';
