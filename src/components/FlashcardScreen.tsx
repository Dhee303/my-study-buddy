'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  RotateCw,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Award,
  Layers,
  HelpCircle,
  ThumbsUp,
  RefreshCcw
} from 'lucide-react';
import { Flashcard, StoryPayload } from '@/types';
import { getMascot } from '@/lib/mascots';
import { playSuccessChime } from '@/lib/sound';
import confetti from 'canvas-confetti';

interface FlashcardScreenProps {
  storyData: StoryPayload;
  onProceedToQuiz: (masteredCount: number) => void;
  onReviewStory: () => void;
}

export default function FlashcardScreen({
  storyData,
  onProceedToQuiz,
  onReviewStory,
}: FlashcardScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Set<number>>(new Set());

  const mascot = getMascot(storyData.mascot);

  const flashcards: Flashcard[] = (storyData.flashcards && storyData.flashcards.length > 0)
    ? storyData.flashcards
    : [
        {
          front: `Core Idea of ${storyData.topic || 'the Topic'}`,
          back: storyData.learningKeyTakeaway || 'Key principle learned in this lesson.'
        },
        {
          front: 'How does it work?',
          back: 'Through nature, scientific laws, and logical rules that connect step-by-step!'
        },
        {
          front: 'Why is it important?',
          back: 'It helps us understand the world around us and create amazing new discoveries!'
        }
      ];

  const totalCards = flashcards.length;
  const currentCard = flashcards[currentIndex];
  const isCurrentMastered = masteredCards.has(currentIndex);
  const masteredCount = masteredCards.size;
  const progressPercent = Math.round((masteredCount / totalCards) * 100);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleGotIt = () => {
    if (!masteredCards.has(currentIndex)) {
      const updated = new Set(masteredCards);
      updated.add(currentIndex);
      setMasteredCards(updated);
      playSuccessChime();

      // Confetti burst for mastering
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#FFE156', '#00E5FF', '#FF6B9D', '#7CFF6B']
      });
    }

    // Auto flip and go next after a brief delay if not last card
    setTimeout(() => {
      if (currentIndex + 1 < totalCards) {
        setIsFlipped(false);
        setCurrentIndex(currentIndex + 1);
      }
    }, 300);
  };

  const handleReviewAgain = () => {
    // Keep in queue, move to next card or flip back
    setIsFlipped(false);
    if (currentIndex + 1 < totalCards) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevCard = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextCard = () => {
    if (currentIndex + 1 < totalCards) {
      setIsFlipped(false);
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      
      {/* Header & Progress */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-black text-black uppercase tracking-wider">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#C56CF0] border-3 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <Layers className="w-4 h-4" />
            <span>Interactive 3D Concept Flashcards</span>
          </div>
          <button
            onClick={onReviewStory}
            className="px-3.5 py-2 bg-white border-3 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer text-xs font-black"
          >
            📖 Review Comic
          </button>
        </div>

        {/* Mastery Progress Bar */}
        <div className="bg-white border-3 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-2">
          <div className="flex items-center justify-between text-sm font-black text-black">
            <span className="flex items-center gap-1.5">
              <Award className="w-5 h-5 text-black" />
              <span>Mastery Progress: {masteredCount} of {totalCards} Mastered</span>
            </span>
            <span className="font-black bg-[#7CFF6B] px-3 py-1 rounded-lg text-xs border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              +{masteredCount * 10} XP Earned
            </span>
          </div>

          <div className="w-full h-5 bg-gray-200 rounded-lg overflow-hidden border-3 border-black">
            <div
              className="h-full bg-[#7CFF6B] rounded-sm transition-all duration-500 ease-out relative"
              style={{ width: `${progressPercent}%` }}
            >
              {progressPercent > 10 && (
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-black">
                  {progressPercent}%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3D Flashcard Container */}
      <div className="perspective-1000 w-full min-h-[360px] sm:min-h-[400px]">
        <div
          onClick={handleFlip}
          className={`w-full min-h-[360px] sm:min-h-[400px] rounded-xl transition-transform duration-700 transform-style-3d cursor-pointer relative ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          
          {/* FRONT OF CARD */}
          <div className="absolute inset-0 w-full h-full bg-[#FFE156] rounded-xl border-4 border-black p-8 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] backface-hidden flex flex-col justify-between overflow-hidden">
            
            {/* Top Indicator */}
            <div className="flex items-center justify-between">
              <span className="px-4 py-1.5 rounded-lg bg-black text-[#FFE156] text-xs font-black uppercase tracking-wider">
                Concept Card {currentIndex + 1} of {totalCards}
              </span>
              
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black text-xs font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <span>{mascot.avatar}</span>
                <span>{mascot.name.split(' ')[0]}</span>
              </div>
            </div>

            {/* Front Card Center Content */}
            <div className="my-auto text-center space-y-4 py-6">
              <div className="w-18 h-18 rounded-xl bg-white mx-auto flex items-center justify-center text-4xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-pulse-gentle">
                💡
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-black leading-snug tracking-wide" style={{ fontFamily: "'Bangers', cursive" }}>
                {currentCard.front}
              </h3>
              <p className="text-sm text-black/70 font-black">
                Tap card to reveal the secret explanation! 🔄
              </p>
            </div>

            {/* Front Card Bottom Hint */}
            <div className="flex items-center justify-between pt-4 border-t-3 border-black text-xs font-black text-black">
              <span>{isCurrentMastered ? '⭐ Mastered' : '⏳ In Progress'}</span>
              <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Click to Flip</span>
              </span>
            </div>

          </div>

          {/* BACK OF CARD */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="absolute inset-0 w-full h-full bg-[#00E5FF] text-black rounded-xl border-4 border-black p-8 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] backface-hidden rotate-y-180 flex flex-col justify-between overflow-hidden"
          >
            
            {/* Top Bar */}
            <div className="flex items-center justify-between">
              <span className="px-4 py-1.5 rounded-lg bg-[#7CFF6B] text-black text-xs font-black uppercase tracking-wider border-2 border-black">
                Discovery Revealed ✨
              </span>

              <button
                onClick={handleFlip}
                className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-[#FFE156] text-black text-xs font-black flex items-center gap-1 transition-colors cursor-pointer border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Flip Back</span>
              </button>
            </div>

            {/* Explanation Body & Analogy */}
            <div className="my-auto space-y-4 py-4 text-center">
              <div className="w-14 h-14 rounded-xl bg-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mx-auto flex items-center justify-center text-3xl">
                {mascot.avatar}
              </div>
              <p className="text-lg sm:text-2xl font-black text-black leading-relaxed" style={{ fontFamily: "'Bangers', cursive" }}>
                {currentCard.back}
              </p>
            </div>

            {/* Action Buttons on Back */}
            <div className="pt-4 border-t-3 border-black flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleReviewAgain}
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-white text-black text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none"
              >
                <RefreshCcw className="w-4 h-4" />
                <span>Review Again</span>
              </button>

              <button
                type="button"
                onClick={handleGotIt}
                className={`w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer border-3 border-black ${
                  isCurrentMastered
                    ? 'bg-[#7CFF6B] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-[#FFE156] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-1 active:shadow-none'
                }`}
              >
                <ThumbsUp className="w-5 h-5" />
                <span>{isCurrentMastered ? 'Mastered! (+10 XP)' : 'Got It! (+10 XP)'}</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Card Navigation Controls */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrevCard}
          disabled={currentIndex === 0}
          className={`px-4 py-3 rounded-xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
            currentIndex === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-2 border-gray-300'
              : 'bg-white border-3 border-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-1 active:shadow-none'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Card</span>
        </button>

        {/* Dot Stepper */}
        <div className="flex items-center gap-2">
          {flashcards.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsFlipped(false);
                setCurrentIndex(idx);
              }}
              className={`w-4 h-4 rounded-md transition-all cursor-pointer border-2 border-black ${
                currentIndex === idx
                  ? 'bg-[#FF6B9D] scale-125 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  : masteredCards.has(idx)
                  ? 'bg-[#7CFF6B]'
                  : 'bg-white hover:bg-[#FFE156]'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNextCard}
          disabled={currentIndex + 1 === totalCards}
          className={`px-4 py-3 rounded-xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
            currentIndex + 1 === totalCards
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-2 border-gray-300'
              : 'bg-white border-3 border-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-1 active:shadow-none'
          }`}
        >
          <span>Next Card</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Proceed to Quiz Primary Action */}
      <div className="pt-4 text-center space-y-3">
        <button
          onClick={() => onProceedToQuiz(masteredCount)}
          className="w-full py-6 px-8 rounded-xl font-black text-xl sm:text-2xl text-black bg-[#FF6B9D] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3 cursor-pointer"
          style={{ fontFamily: "'Bangers', cursive", letterSpacing: '0.04em' }}
        >
          <span>Proceed to Comprehension Quiz 🎯</span>
          <ArrowRight className="w-7 h-7" />
        </button>
        <p className="text-sm text-black font-black">
          Ready to test your new superpowers in the story quiz? Let&apos;s go!
        </p>
      </div>

    </div>
  );
}
