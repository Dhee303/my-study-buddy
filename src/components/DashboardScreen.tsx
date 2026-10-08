'use client';

import React, { useEffect, useState } from 'react';
import {
  Trophy,
  Award,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Printer,
  Layers,
  Flame,
  Brain,
  Zap,
  Star,
  Target
} from 'lucide-react';
import { StoryPayload, QuizSubmission, GamificationState } from '@/types';
import { triggerCelebrationConfetti } from '@/lib/sound';
import { getMascot } from '@/lib/mascots';
import {
  loadGamificationState,
  addGamificationActivity,
  getXPProgressToNextLevel,
  getBadgesWithStatus,
  calculateLevel
} from '@/lib/gamification';
import CertificateModal from '@/components/CertificateModal';

interface DashboardScreenProps {
  storyData: StoryPayload;
  quizResult: QuizSubmission;
  flashcardsMasteredCount: number;
  onStartNewTopic: (prefillTopic?: string) => void;
  onReviewStory: () => void;
  onReviewFlashcards: () => void;
}

export default function DashboardScreen({
  storyData,
  quizResult,
  flashcardsMasteredCount,
  onStartNewTopic,
  onReviewStory,
  onReviewFlashcards,
}: DashboardScreenProps) {
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [gamificationState, setGamificationState] = useState<GamificationState>(() => loadGamificationState());
  const [xpGainedThisSession, setXpGainedThisSession] = useState<number>(0);
  const [newlyUnlockedBadgeList, setNewlyUnlockedBadgeList] = useState<string[]>([]);
  const [hasUpdatedState, setHasUpdatedState] = useState(false);

  const mascot = getMascot(storyData.mascot);

  useEffect(() => {
    if (!hasUpdatedState) {
      triggerCelebrationConfetti();

      const currentState = loadGamificationState();
      const result = addGamificationActivity(currentState, {
        storyFinished: true,
        flashcardsMasteredCount,
        quizResult,
      });

      setGamificationState(result.newState);
      setXpGainedThisSession(result.xpGained);
      setNewlyUnlockedBadgeList(result.newBadges.map(b => b.id));
      setHasUpdatedState(true);
    }
  }, [hasUpdatedState, flashcardsMasteredCount, quizResult]);

  const childAge = storyData.age || 8;
  const isPerfectScore = quizResult.score === quizResult.total;
  const nextTopic = storyData.recommendedNextTopic || 'The Solar System & Beyond';

  const defaultConcepts = [
    `Mastered the core mechanism of ${storyData.topic || 'the topic'}`,
    'Practiced reading comprehension & contextual reasoning',
    'Applied scientific and academic vocabulary accurately'
  ];

  const masteredList = storyData.conceptsMastered && storyData.conceptsMastered.length > 0
    ? storyData.conceptsMastered
    : defaultConcepts;

  const keyTakeaway = storyData.learningKeyTakeaway ||
    `Mastered the essential fundamentals of ${storyData.topic || 'the lesson'} through interactive comic storytelling and hands-on reasoning!`;

  const badges = getBadgesWithStatus(gamificationState.badges);
  const { currentLevelXP, requiredLevelXP, progressPercent } = getXPProgressToNextLevel(gamificationState.xp);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      
      {/* Celebration Hero Banner */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-[#FFE156] text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-4 border-black hover:-translate-y-1 transition-transform">
          <Trophy className="w-12 h-12 text-black" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00E5FF] text-black border-3 border-black text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <Sparkles className="w-4 h-4 text-black fill-black" />
            <span>{isPerfectScore ? '🌟 100% Perfect Comprehension!' : '🎉 Adventure Completed!'}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-black tracking-tight font-comic uppercase drop-shadow-sm">
            Mastery &amp; Parent Report
          </h1>
          
          <p className="text-slate-900 font-bold text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Sensational job! Here is your child&apos;s gamified progress and core learning breakdown for{' '}
            <span className="bg-[#FF6B9D] text-black px-2 py-0.5 rounded-lg border-2 border-black underline decoration-wavy">
              &ldquo;{storyData.storyTitle}&rdquo;
            </span>
          </p>
        </div>
      </div>

      {/* GAMIFICATION STATS BAR (XP, Level, Streak) */}
      <div className="bg-[#FF9F43] rounded-3xl p-6 sm:p-8 text-black border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
        
        {/* Top Stat Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          {/* Stat 1: Total XP & Gained */}
          <div className="bg-white p-4 rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-black flex items-center gap-1.5">
              <Zap className="w-4 h-4 fill-[#FFE156] text-black" />
              <span>Total Explorer XP</span>
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-black font-mono">
                {gamificationState.xp} XP
              </span>
              {xpGainedThisSession > 0 && (
                <span className="text-xs font-black text-black bg-[#7CFF6B] px-2 py-0.5 rounded-md border-2 border-black animate-bounce">
                  +{xpGainedThisSession} XP!
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-800 font-bold">
              Story (+50), Flashcards (+{flashcardsMasteredCount * 10}), Quiz (+{quizResult.score * 20})
            </p>
          </div>

          {/* Stat 2: Current Level */}
          <div className="bg-white p-4 rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-black flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-[#00E5FF] text-black" />
              <span>Current Level</span>
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-black font-mono">
                Level {gamificationState.level}
              </span>
              <span className="text-xs font-black text-black bg-[#FF6B9D] px-2 py-0.5 rounded-md border-2 border-black">
                {gamificationState.level <= 1 ? 'Curious Explorer' : gamificationState.level === 2 ? 'Story Adventurer' : 'Master Scholar'}
              </span>
            </div>
            <p className="text-[11px] text-slate-800 font-bold">
              {100 - currentLevelXP} XP needed for Level {gamificationState.level + 1}
            </p>
          </div>

          {/* Stat 3: Streak Counter */}
          <div className="bg-white p-4 rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-black flex items-center gap-1.5">
              <Flame className="w-4 h-4 fill-[#FF6B6B] text-black" />
              <span>Active Daily Streak</span>
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-black font-mono">
                🔥 {gamificationState.streak} Day{gamificationState.streak !== 1 ? 's' : ''}
              </span>
            </div>
            <p className="text-[11px] text-slate-800 font-bold">
              Streak active! Keep it blazing tomorrow!
            </p>
          </div>

        </div>

        {/* Level XP Progress Bar */}
        <div className="bg-white p-4 rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-2">
          <div className="flex justify-between text-xs font-black text-black">
            <span>Level {gamificationState.level} Progress</span>
            <span className="bg-[#FFE156] px-2 py-0.5 rounded border-2 border-black">{currentLevelXP} / {requiredLevelXP} XP ({progressPercent}%)</span>
          </div>
          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden border-3 border-black p-0.5">
            <div
              className="h-full bg-[#7CFF6B] rounded-full transition-all duration-700 ease-out border-r-2 border-black"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

      </div>

      {/* CORE LEARNING KEY TAKEAWAY CARD */}
      <div className="bg-[#FFE156] rounded-3xl border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-3">
        <div className="flex items-center gap-2 text-black font-black text-xs sm:text-sm uppercase tracking-wider">
          <div className="w-8 h-8 rounded-xl bg-[#00E5FF] text-black border-2 border-black flex items-center justify-center font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            💡
          </div>
          <span>Core Educational Key Takeaway:</span>
        </div>

        <p className="text-xl sm:text-2xl font-black text-black leading-snug">
          &ldquo;{keyTakeaway}&rdquo;
        </p>

        <div className="flex items-center gap-2 pt-1 text-xs text-black font-black">
          <span>Host Educator:</span>
          <span className="bg-[#FF6B9D] px-2 py-0.5 rounded-lg border-2 border-black">{mascot.name} ({mascot.specialty})</span>
        </div>
      </div>

      {/* Analytics Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Score & Accuracy */}
        <div className="bg-white rounded-3xl border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase tracking-wider text-black">Quiz Comprehension</span>
              <div className="w-9 h-9 rounded-xl bg-[#C56CF0] text-black border-2 border-black flex items-center justify-center font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Brain className="w-5 h-5 text-black" />
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-4xl font-black text-black font-mono">
                {quizResult.score} / {quizResult.total}
              </div>
              <p className="text-xs font-black text-black bg-[#7CFF6B] px-2.5 py-1 rounded-lg border-2 border-black inline-flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <CheckCircle2 className="w-4 h-4 text-black" />
                <span>{quizResult.percentage}% Score</span>
              </p>
            </div>
          </div>

          <p className="text-xs font-bold text-slate-800 mt-4 pt-3 border-t-2 border-black">
            {isPerfectScore
              ? 'Flawless comprehension across every challenge on first try!'
              : 'Great perseverance! Solved all questions using teacher hints.'}
          </p>
        </div>

        {/* Card 2: Flashcards Mastered */}
        <div className="bg-white rounded-3xl border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase tracking-wider text-black">3D Flashcards</span>
              <div className="w-9 h-9 rounded-xl bg-[#00E5FF] text-black border-2 border-black flex items-center justify-center font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Layers className="w-5 h-5 text-black" />
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-4xl font-black text-black font-mono">
                {flashcardsMasteredCount} Cards
              </div>
              <p className="text-xs font-black text-black bg-[#FFE156] px-2.5 py-1 rounded-lg border-2 border-black inline-flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <CheckCircle2 className="w-4 h-4 text-black" />
                <span>Active 3D Review Done</span>
              </p>
            </div>
          </div>

          <p className="text-xs font-bold text-slate-800 mt-4 pt-3 border-t-2 border-black">
            Key terminology and visual analogies locked into memory.
          </p>
        </div>

        {/* Card 3: Award Certificate Quick Action */}
        <div className="bg-[#FF6B9D] rounded-3xl border-4 border-black p-6 text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-white border-2 border-black flex items-center justify-center mb-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Award className="w-6 h-6 text-black" />
            </div>
            <h3 className="font-black text-xl text-black leading-tight font-comic">Student Certificate</h3>
            <p className="text-xs text-black mt-1 leading-relaxed font-bold">
              Print an official Certificate of Mastery for your child&apos;s wall!
            </p>
          </div>

          <button
            onClick={() => setIsCertificateOpen(true)}
            className="mt-4 w-full py-3 px-4 rounded-2xl font-black text-xs bg-black text-white hover:bg-slate-900 flex items-center justify-center gap-1.5 border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-0.5 active:translate-y-0.5 transition-transform cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Award Certificate</span>
          </button>
        </div>

      </div>

      {/* UNLOCKED BADGES SECTION */}
      <div className="bg-white rounded-3xl border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🏆</span>
            <h3 className="text-2xl font-black text-black font-comic">
              Achievement Badges
            </h3>
          </div>
          <span className="text-xs font-black text-black bg-[#FFE156] px-3 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            {badges.filter(b => b.unlocked).length} of {badges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          {badges.map((badge) => {
            const isNew = newlyUnlockedBadgeList.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border-3 text-center transition-all flex flex-col items-center justify-between ${
                  badge.unlocked
                    ? 'bg-[#7CFF6B] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1'
                    : 'bg-slate-100 border-slate-300 opacity-60'
                } ${isNew ? 'ring-4 ring-[#FF6B9D] animate-bounce' : ''}`}
              >
                <div className="text-4xl mb-1.5">{badge.icon}</div>
                <h4 className="font-black text-xs text-black leading-tight">
                  {badge.title}
                </h4>
                <p className="text-[10px] text-black font-bold mt-1 line-clamp-2">
                  {badge.description}
                </p>
                <span className={`mt-2 text-[9px] font-black uppercase px-2 py-0.5 rounded-full border border-black ${
                  badge.unlocked ? 'bg-black text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {badge.unlocked ? 'Unlocked ✨' : 'Locked'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Concepts Mastered Breakdown */}
      <div className="bg-[#00E5FF] rounded-3xl border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-white text-black border-2 border-black flex items-center justify-center font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-black text-black font-comic">
            Specific Concepts Mastered in this Lesson
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {masteredList.map((concept, index) => (
            <div
              key={index}
              className="p-4 rounded-2xl bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-start gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-black shrink-0 mt-0.5 fill-[#7CFF6B]" />
              <p className="text-xs sm:text-sm font-black text-black leading-relaxed">
                {concept}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Next Topic Card */}
      <div className="bg-[#FFE156] rounded-3xl border-4 border-black p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="space-y-2 text-center sm:text-left">
          <span className="px-3.5 py-1 rounded-full bg-[#FF6B9D] text-black font-black text-xs uppercase tracking-wider inline-block border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            Recommended Next Topic
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-black font-comic">
            {nextTopic}
          </h3>
          <p className="text-xs sm:text-sm text-black max-w-lg font-bold">
            Build on what was just mastered! Continue your learning streak with this companion adventure.
          </p>
        </div>

        <button
          onClick={() => onStartNewTopic(nextTopic)}
          className="px-6 py-4 rounded-2xl font-black text-sm sm:text-base text-black bg-[#7CFF6B] hover:bg-[#68e058] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-1 flex items-center gap-2 shrink-0 transition-transform cursor-pointer border-3 border-black"
        >
          <span>Start Next Lesson</span>
          <ArrowRight className="w-5 h-5 text-black" />
        </button>
      </div>

      {/* Action Buttons Footer */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <button
          onClick={onReviewStory}
          className="px-5 py-3 rounded-2xl font-black text-xs sm:text-sm text-black bg-white border-3 border-black hover:-translate-y-1 active:translate-y-1 transition-transform flex items-center gap-2 cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <BookOpen className="w-4 h-4 text-black" />
          <span>Review Comic Story</span>
        </button>

        <button
          onClick={onReviewFlashcards}
          className="px-5 py-3 rounded-2xl font-black text-xs sm:text-sm text-black bg-white border-3 border-black hover:-translate-y-1 active:translate-y-1 transition-transform flex items-center gap-2 cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <Layers className="w-4 h-4 text-black" />
          <span>Practice 3D Flashcards</span>
        </button>

        <button
          onClick={() => onStartNewTopic()}
          className="px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm text-black bg-[#C56CF0] hover:bg-[#b257dc] transition-transform hover:-translate-y-1 active:translate-y-1 flex items-center gap-2 cursor-pointer border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <RotateCcw className="w-4 h-4 text-black" />
          <span>Try Another Topic 🚀</span>
        </button>
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        storyData={storyData}
        quizResult={quizResult}
        childAge={childAge}
      />

    </div>
  );
}
