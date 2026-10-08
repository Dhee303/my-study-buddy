import { GamificationState, Badge, QuizSubmission } from '@/types';

const STORAGE_KEY = 'story_teacher_gamification_v2';

export const ALL_BADGES: Badge[] = [
  {
    id: 'first_adventure',
    title: 'Curious Explorer',
    description: 'Completed your very first learning adventure!',
    icon: '🚀',
    unlocked: false,
    category: 'story',
  },
  {
    id: 'quick_learner',
    title: 'Quick Learner',
    description: 'Mastered 3 or more educational story adventures!',
    icon: '🧠',
    unlocked: false,
    category: 'story',
  },
  {
    id: 'perfect_score',
    title: 'Perfect Score',
    description: 'Answered 100% of quiz questions correctly on the first try!',
    icon: '🎯',
    unlocked: false,
    category: 'quiz',
  },
  {
    id: 'flashcard_master',
    title: 'Flashcard Master',
    description: 'Mastered all interactive 3D concept flashcards in a lesson!',
    icon: '🃏',
    unlocked: false,
    category: 'flashcard',
  },
  {
    id: 'streak_keeper',
    title: 'Daily Fire Streak',
    description: 'Kept your learning flame burning with a daily learning streak!',
    icon: '🔥',
    unlocked: false,
    category: 'streak',
  },
  {
    id: 'level_3_scholar',
    title: 'Master Scholar',
    description: 'Climbed all the way to Level 3 through dedication & XP!',
    icon: '👑',
    unlocked: false,
    category: 'level',
  },
];

export function getDefaultGamificationState(): GamificationState {
  const today = new Date().toISOString().split('T')[0];
  return {
    xp: 0,
    level: 1,
    streak: 1,
    lastActiveDate: today,
    badges: [],
    storiesCompleted: 0,
    flashcardsMastered: 0,
  };
}

export function loadGamificationState(): GamificationState {
  if (typeof window === 'undefined') return getDefaultGamificationState();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultGamificationState();

    const parsed: GamificationState = JSON.parse(raw);
    const today = new Date().toISOString().split('T')[0];

    // Compute active streak
    let currentStreak = parsed.streak || 1;
    if (parsed.lastActiveDate) {
      const lastDate = new Date(parsed.lastActiveDate);
      const currentDate = new Date(today);
      const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // Next consecutive day
        currentStreak += 1;
      } else if (diffDays > 1) {
        // Missed a day
        currentStreak = 1;
      }
    }

    const updatedState: GamificationState = {
      ...parsed,
      xp: parsed.xp || 0,
      level: Math.floor((parsed.xp || 0) / 100) + 1,
      streak: currentStreak,
      lastActiveDate: today,
      badges: Array.isArray(parsed.badges) ? parsed.badges : [],
      storiesCompleted: parsed.storiesCompleted || 0,
      flashcardsMastered: parsed.flashcardsMastered || 0,
    };

    saveGamificationState(updatedState);
    return updatedState;
  } catch (e) {
    console.error('Failed to load gamification state:', e);
    return getDefaultGamificationState();
  }
}

export function saveGamificationState(state: GamificationState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save gamification state:', e);
  }
}

export function calculateLevel(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

export function getXPProgressToNextLevel(xp: number): { currentLevelXP: number; requiredLevelXP: number; progressPercent: number } {
  const currentLevelXP = xp % 100;
  const requiredLevelXP = 100;
  const progressPercent = Math.min(100, Math.round((currentLevelXP / requiredLevelXP) * 100));
  return { currentLevelXP, requiredLevelXP, progressPercent };
}

export interface GamificationUpdateResult {
  newState: GamificationState;
  xpGained: number;
  leveledUp: boolean;
  newBadges: Badge[];
}

export function addGamificationActivity(
  currentState: GamificationState,
  activity: {
    storyFinished?: boolean;
    flashcardsMasteredCount?: number;
    quizResult?: QuizSubmission;
  }
): GamificationUpdateResult {
  let xpToAdd = 0;
  let storiesCompleted = currentState.storiesCompleted;
  let flashcardsMastered = currentState.flashcardsMastered;

  // XP rules:
  // +50 XP for finishing story
  if (activity.storyFinished) {
    xpToAdd += 50;
    storiesCompleted += 1;
  }

  // +10 XP per flashcard reviewed / mastered
  if (activity.flashcardsMasteredCount && activity.flashcardsMasteredCount > 0) {
    xpToAdd += activity.flashcardsMasteredCount * 10;
    flashcardsMastered += activity.flashcardsMasteredCount;
  }

  // +20 XP per correct quiz answer
  if (activity.quizResult) {
    xpToAdd += activity.quizResult.score * 20;
  }

  const newTotalXP = currentState.xp + xpToAdd;
  const oldLevel = currentState.level;
  const newLevel = calculateLevel(newTotalXP);
  const leveledUp = newLevel > oldLevel;

  // Evaluate new badges
  const unlockedBadgeIds = new Set(currentState.badges);
  const newlyUnlockedBadges: Badge[] = [];

  // Badge 1: Curious Explorer (first story)
  if (storiesCompleted >= 1 && !unlockedBadgeIds.has('first_adventure')) {
    unlockedBadgeIds.add('first_adventure');
  }

  // Badge 2: Quick Learner (3 stories)
  if (storiesCompleted >= 3 && !unlockedBadgeIds.has('quick_learner')) {
    unlockedBadgeIds.add('quick_learner');
  }

  // Badge 3: Perfect Score (100% on quiz on first attempt)
  if (activity.quizResult && activity.quizResult.score === activity.quizResult.total && activity.quizResult.total > 0) {
    const isAllFirstTry = activity.quizResult.details.every(d => d.isCorrect && d.attempts === 1);
    if (isAllFirstTry && !unlockedBadgeIds.has('perfect_score')) {
      unlockedBadgeIds.add('perfect_score');
    }
  }

  // Badge 4: Flashcard Master
  if (activity.flashcardsMasteredCount && activity.flashcardsMasteredCount >= 3 && !unlockedBadgeIds.has('flashcard_master')) {
    unlockedBadgeIds.add('flashcard_master');
  }

  // Badge 5: Daily Fire Streak
  if (currentState.streak >= 1 && !unlockedBadgeIds.has('streak_keeper')) {
    unlockedBadgeIds.add('streak_keeper');
  }

  // Badge 6: Level 3 Scholar
  if (newLevel >= 3 && !unlockedBadgeIds.has('level_3_scholar')) {
    unlockedBadgeIds.add('level_3_scholar');
  }

  // Identify the newly unlocked ones
  ALL_BADGES.forEach(badge => {
    if (unlockedBadgeIds.has(badge.id) && !currentState.badges.includes(badge.id)) {
      newlyUnlockedBadges.push({ ...badge, unlocked: true });
    }
  });

  const newState: GamificationState = {
    ...currentState,
    xp: newTotalXP,
    level: newLevel,
    storiesCompleted,
    flashcardsMastered,
    badges: Array.from(unlockedBadgeIds),
    lastActiveDate: new Date().toISOString().split('T')[0],
  };

  saveGamificationState(newState);

  return {
    newState,
    xpGained: xpToAdd,
    leveledUp,
    newBadges: newlyUnlockedBadges,
  };
}

export function getBadgesWithStatus(unlockedBadgeIds: string[]): Badge[] {
  const set = new Set(unlockedBadgeIds);
  return ALL_BADGES.map(b => ({
    ...b,
    unlocked: set.has(b.id),
  }));
}
