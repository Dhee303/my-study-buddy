'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, Key, RotateCcw, Zap } from 'lucide-react';
import { AppScreen } from '@/types';
import { loadGamificationState } from '@/lib/gamification';

interface NavbarProps {
  currentScreen: AppScreen;
  onReset: () => void;
  onOpenApiKeyModal: () => void;
  hasCustomKey: boolean;
}

export default function Navbar({
  currentScreen,
  onReset,
  onOpenApiKeyModal,
  hasCustomKey,
}: NavbarProps) {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    const syncState = () => {
      const state = loadGamificationState();
      setXp(state.xp);
      setLevel(state.level);
    };
    syncState();
    const interval = setInterval(syncState, 2000);
    return () => clearInterval(interval);
  }, []);

  const steps: { id: AppScreen; label: string; number: string }[] = [
    { id: 'setup', label: '1. Setup', number: '1' },
    { id: 'story', label: '2. E-Comic', number: '2' },
    { id: 'flashcards', label: '3. 3D Cards', number: '3' },
    { id: 'quiz', label: '4. Quiz', number: '4' },
    { id: 'dashboard', label: '5. Report', number: '5' },
  ];

  const getStepIndex = (s: AppScreen) => {
    switch (s) {
      case 'setup': return 0;
      case 'story': return 1;
      case 'flashcards': return 2;
      case 'quiz': return 3;
      case 'dashboard': return 4;
    }
  };

  const currentIndex = getStepIndex(currentScreen);

  const stepColors = [
    'bg-[#FFE156]',
    'bg-[#00E5FF]',
    'bg-[#FF6B9D]',
    'bg-[#7CFF6B]',
    'bg-[#C56CF0]',
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FF6B9D] border-b-4 border-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 min-h-[4.75rem] py-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-4 flex-wrap">
        
        {/* Logo & Brand */}
        <div 
          onClick={onReset}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group transition-all hover:-translate-y-0.5 active:translate-y-1 shrink-0"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#FFE156] flex items-center justify-center text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-3 border-black group-hover:rotate-6 transition-transform shrink-0">
            <BookOpen className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl sm:text-2xl md:text-3xl tracking-wide text-black drop-shadow-[2px_2px_0px_rgba(255,225,86,1)] whitespace-nowrap leading-none" style={{ fontFamily: "'Bangers', cursive" }}>
                [MY STUDY BUDDY]
              </span>
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFE156] fill-[#FFE156] animate-wiggle shrink-0" />
            </div>
            <p className="text-[10px] sm:text-[11px] font-black text-black/80 tracking-wider uppercase whitespace-nowrap mt-1 leading-none">
              Interactive E-Comic &amp; 3D Learning
            </p>
          </div>
        </div>

        {/* Step Progress Pills (Desktop) */}
        <nav aria-label="Learning adventure steps" className="hidden xl:flex items-center gap-1.5 bg-white p-1.5 sm:p-2 rounded-xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] shrink-0">
          {steps.map((step, idx) => {
            const isActive = idx === currentIndex;
            const isCompleted = idx < currentIndex;
            return (
              <div
                key={step.id}
                className={`flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs font-black transition-all border-2 ${
                  isActive
                    ? `${stepColors[idx]} border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] -translate-y-0.5`
                    : isCompleted
                    ? 'bg-[#7CFF6B] border-black text-black'
                    : 'bg-gray-100 border-gray-300 text-gray-500'
                }`}
              >
                <span
                  className={`w-4 h-4 sm:w-5 sm:h-5 rounded-md flex items-center justify-center text-[10px] font-black border-2 border-black ${
                    isActive
                      ? 'bg-black text-white'
                      : isCompleted
                      ? 'bg-black text-[#7CFF6B]'
                      : 'bg-gray-200 text-gray-600 border-gray-400'
                  }`}
                >
                  {isCompleted ? '✓' : step.number}
                </span>
                <span>{step.label}</span>
              </div>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 ml-auto xl:ml-0">
          {/* Level & XP Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-[#FFE156] border-3 border-black text-black text-xs font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black fill-black" />
            <span>Lvl {level}</span>
            <span className="text-black/40 font-black">|</span>
            <span>{xp} XP</span>
          </div>

          {currentScreen !== 'setup' && (
            <button
              onClick={onReset}
              title="Start New Story"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs font-black text-black bg-white border-3 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>New Topic</span>
            </button>
          )}

          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-black transition-all cursor-pointer border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-1 active:shadow-none ${
              hasCustomKey
                ? 'bg-[#7CFF6B] text-black'
                : 'bg-white text-black'
            }`}
          >
            <Key className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden md:inline">
              {hasCustomKey ? 'Gemini AI Active' : 'API Key / Demo'}
            </span>
            <span
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-2 border-black ${
                hasCustomKey ? 'bg-[#7CFF6B] animate-pulse' : 'bg-[#FFE156]'
              }`}
            />
          </button>
        </div>

      </div>
    </header>
  );
}
