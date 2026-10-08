'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import SetupScreen from '@/components/SetupScreen';
import StoryScreen from '@/components/StoryScreen';
import FlashcardScreen from '@/components/FlashcardScreen';
import QuizScreen from '@/components/QuizScreen';
import DashboardScreen from '@/components/DashboardScreen';
import ApiKeyModal from '@/components/ApiKeyModal';
import {
  AppScreen,
  StoryPayload,
  QuizSubmission,
  GenerateStoryRequest,
} from '@/types';
import { Sparkles, Heart } from 'lucide-react';

export default function StoryTeacherApp() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('setup');
  const [storyData, setStoryData] = useState<StoryPayload | null>(null);
  const [quizResult, setQuizResult] = useState<QuizSubmission | null>(null);
  const [flashcardsMasteredCount, setFlashcardsMasteredCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prefillTopic, setPrefillTopic] = useState<string>('');

  // API Key management (session / localStorage)
  const [customApiKey, setCustomApiKey] = useState<string>('');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedKey = localStorage.getItem('story_teacher_gemini_key') || '';
      setCustomApiKey(savedKey);
    }
  }, []);

  const handleSaveApiKey = (key: string) => {
    setCustomApiKey(key);
    if (typeof window !== 'undefined') {
      if (key) {
        localStorage.setItem('story_teacher_gemini_key', key);
      } else {
        localStorage.removeItem('story_teacher_gemini_key');
      }
    }
  };

  const handleGenerateStory = async (reqData: GenerateStoryRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...reqData,
          apiKey: customApiKey || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate story.');
      }

      setStoryData(data);
      setFlashcardsMasteredCount(0);
      setQuizResult(null);
      setCurrentScreen('story');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: unknown) {
      console.error('Error in handleGenerateStory:', err);
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceedToFlashcards = () => {
    setCurrentScreen('flashcards');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToQuiz = (masteredCount: number) => {
    setFlashcardsMasteredCount(masteredCount);
    setCurrentScreen('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteQuiz = (submission: QuizSubmission) => {
    setQuizResult(submission);
    setCurrentScreen('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartNewTopic = (newTopic?: string) => {
    if (newTopic) {
      setPrefillTopic(newTopic);
    }
    setQuizResult(null);
    setCurrentScreen('setup');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetToSetup = () => {
    setCurrentScreen('setup');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Navigation Bar */}
      <Navbar
        currentScreen={currentScreen}
        onReset={handleResetToSetup}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        hasCustomKey={Boolean(customApiKey)}
      />

      {/* Main Screen Router */}
      <main className="flex-1 w-full pb-16">
        {/* Screen 1: Setup & Customization */}
        {currentScreen === 'setup' && (
          <SetupScreen
            onGenerate={handleGenerateStory}
            isLoading={isLoading}
            error={error}
            onClearError={() => setError(null)}
            initialTopic={prefillTopic}
          />
        )}

        {/* Screen 2: E-Comic Story Engine */}
        {currentScreen === 'story' && storyData && (
          <StoryScreen
            storyData={storyData}
            onProceedToFlashcards={handleProceedToFlashcards}
            onBackToSetup={handleResetToSetup}
          />
        )}

        {/* Screen 3: Interactive 3D Flashcards */}
        {currentScreen === 'flashcards' && storyData && (
          <FlashcardScreen
            storyData={storyData}
            onProceedToQuiz={handleProceedToQuiz}
            onReviewStory={() => {
              setCurrentScreen('story');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Screen 4: Comprehension Quiz */}
        {currentScreen === 'quiz' && storyData && (
          <QuizScreen
            quiz={storyData.quiz}
            storyTitle={storyData.storyTitle}
            mascotId={storyData.mascot}
            onCompleteQuiz={handleCompleteQuiz}
            onReviewStory={() => {
              setCurrentScreen('story');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Screen 5: Gamified Parent/Teacher Summary Dashboard */}
        {currentScreen === 'dashboard' && storyData && quizResult && (
          <DashboardScreen
            storyData={storyData}
            quizResult={quizResult}
            flashcardsMasteredCount={flashcardsMasteredCount}
            onStartNewTopic={handleStartNewTopic}
            onReviewStory={() => {
              setCurrentScreen('story');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onReviewFlashcards={() => {
              setCurrentScreen('flashcards');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-[#00E5FF] py-6 text-center text-sm text-black font-bold">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="flex items-center gap-1.5 font-black text-base">
            <span>Built with</span>
            <Heart className="w-5 h-5 text-[#FF6B9D] fill-[#FF6B9D] animate-pulse-gentle" />
            <span>for curious minds!</span>
          </p>
          <div className="flex items-center gap-4 font-black">
            <button
              onClick={() => setIsApiKeyModalOpen(true)}
              className="px-4 py-2 bg-[#FFE156] border-3 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
            >
              ⚙️ Gemini AI Settings
            </button>
            <span className="px-3 py-1.5 bg-white border-3 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-xs font-black">
              ⚡ Google Gemini Flash &amp; Next.js 16
            </span>
          </div>
        </div>
      </footer>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        currentKey={customApiKey}
        onSaveKey={handleSaveApiKey}
      />
    </div>
  );
}
