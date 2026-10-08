'use client';

import React, { useState } from 'react';
import {
  CheckCircle,
  XCircle,
  Lightbulb,
  ArrowRight,
  Sparkles,
  Award,
  Zap
} from 'lucide-react';
import { QuizQuestion, QuizSubmission, QuizDetail, MascotId } from '@/types';
import { getMascot } from '@/lib/mascots';
import { playSuccessChime, playHintSound } from '@/lib/sound';
import confetti from 'canvas-confetti';

interface QuizScreenProps {
  quiz: QuizQuestion[];
  storyTitle: string;
  mascotId?: MascotId;
  onCompleteQuiz: (submission: QuizSubmission) => void;
  onReviewStory: () => void;
}

export default function QuizScreen(props: QuizScreenProps) {
  const {
    quiz,
    storyTitle,
    mascotId = 'channie',
    onCompleteQuiz,
    onReviewStory,
  } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attemptsOnCurrent, setAttemptsOnCurrent] = useState(0);

  // Store quiz history
  const [resultsHistory, setResultsHistory] = useState<QuizDetail[]>([]);

  const mascot = getMascot(mascotId);
  const currentQ = quiz[currentIndex];
  const totalQuestions = quiz.length;

  // Helper to determine correct answer index
  const getCorrectIndex = (q: QuizQuestion): number => {
    if (typeof q.correctAnswer === 'number') {
      return q.correctAnswer;
    }
    const letter = (q.correctAnswer || 'A').toString().trim().toUpperCase().charAt(0);
    if (letter === 'A') return 0;
    if (letter === 'B') return 1;
    if (letter === 'C') return 2;
    if (letter === 'D') return 3;
    const parsed = parseInt(letter, 10);
    return isNaN(parsed) ? 0 : parsed;
  };

  const correctIndex = getCorrectIndex(currentQ);

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted && selectedOptionIndex === correctIndex) {
      // Already answered correctly
      return;
    }

    const isCorrect = idx === correctIndex;
    const newAttemptCount = attemptsOnCurrent + 1;
    setAttemptsOnCurrent(newAttemptCount);
    setSelectedOptionIndex(idx);
    setIsAnswerSubmitted(true);

    if (isCorrect) {
      setShowHint(false);
      playSuccessChime();

      // Confetti burst for correct answer
      confetti({
        particleCount: 40,
        spread: 65,
        origin: { y: 0.65 },
        colors: ['#7CFF6B', '#FFE156', '#00E5FF', '#FF6B9D', '#C56CF0']
      });

      // Update quiz details history
      const existingHistoryIndex = resultsHistory.findIndex((h) => h.questionIndex === currentIndex);
      const detailItem: QuizDetail = {
        questionIndex: currentIndex,
        question: currentQ.question,
        selectedOption: currentQ.options[idx],
        selectedOptionIndex: idx,
        correctAnswerIndex: correctIndex,
        isCorrect: true,
        attempts: newAttemptCount,
      };

      if (existingHistoryIndex >= 0) {
        const updated = [...resultsHistory];
        updated[existingHistoryIndex] = detailItem;
        setResultsHistory(updated);
      } else {
        setResultsHistory([...resultsHistory, detailItem]);
      }
    } else {
      setShowHint(true);
      playHintSound();

      // Record incorrect attempt
      const existingHistoryIndex = resultsHistory.findIndex((h) => h.questionIndex === currentIndex);
      const detailItem: QuizDetail = {
        questionIndex: currentIndex,
        question: currentQ.question,
        selectedOption: currentQ.options[idx],
        selectedOptionIndex: idx,
        correctAnswerIndex: correctIndex,
        isCorrect: false,
        attempts: newAttemptCount,
      };

      if (existingHistoryIndex >= 0) {
        const updated = [...resultsHistory];
        updated[existingHistoryIndex] = detailItem;
        setResultsHistory(updated);
      } else {
        setResultsHistory([...resultsHistory, detailItem]);
      }
    }
  };

  const isCurrentCorrect = selectedOptionIndex === correctIndex;

  const handleNext = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOptionIndex(null);
      setIsAnswerSubmitted(false);
      setShowHint(false);
      setAttemptsOnCurrent(0);
    } else {
      // Finalize submission
      const totalCorrect = resultsHistory.filter((item) => item.isCorrect).length;

      onCompleteQuiz({
        score: totalCorrect,
        total: totalQuestions,
        percentage: Math.round((totalCorrect / totalQuestions) * 100),
        details: resultsHistory,
      });
    }
  };

  const optionColors = ['bg-[#FFE156]', 'bg-[#00E5FF]', 'bg-[#FF6B9D]', 'bg-[#C56CF0]'];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      
      {/* Progress Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-black text-black uppercase tracking-wider">
          <div className="flex items-center gap-1.5 px-4 py-2 bg-[#FFE156] border-3 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <Award className="w-4 h-4" />
            <span>Comprehension Quiz (+20 XP per question)</span>
          </div>
          <button
            onClick={onReviewStory}
            className="px-3.5 py-2 bg-white border-3 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer text-xs font-black"
          >
            📖 Check Comic Story
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div>
          <div className="flex justify-between text-sm font-black text-black mb-2">
            <span>Challenge {currentIndex + 1} of {totalQuestions}</span>
            <span className="px-3 py-1 bg-[#00E5FF] rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              {Math.round(((currentIndex + 1) / totalQuestions) * 100)}% Complete
            </span>
          </div>
          <div className="w-full h-5 bg-gray-200 rounded-lg overflow-hidden border-3 border-black">
            <div
              className="h-full bg-[#FF9F43] rounded-sm transition-all duration-500 ease-out relative"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-black">
                {Math.round(((currentIndex + 1) / totalQuestions) * 100)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-10 space-y-8">
        
        {/* Question Header & Mascot Badge */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <span className="px-4 py-1.5 rounded-lg bg-[#FFE156] text-black font-black text-xs uppercase tracking-wider inline-flex items-center gap-1.5 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Zap className="w-4 h-4" />
              <span>Challenge #{currentIndex + 1}</span>
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-black leading-snug" style={{ fontFamily: "'Bangers', cursive", letterSpacing: '0.03em' }}>
              {currentQ.question}
            </h2>
          </div>

          <div className="w-14 h-14 rounded-xl bg-[#FFE156] border-3 border-black flex items-center justify-center text-3xl shrink-0 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] animate-float">
            {mascot.avatar}
          </div>
        </div>

        {/* Options Grid */}
        <div className="space-y-3">
          {currentQ.options.map((optionText, idx) => {
            const letters = ['A', 'B', 'C', 'D'];
            const letter = letters[idx] || `${idx + 1}`;
            const cleanText = optionText.replace(/^[A-D]\)\s*/, '');
            const isSelected = selectedOptionIndex === idx;
            const isCorrectChoice = idx === correctIndex;

            let cardStyles = `${optionColors[idx]} border-black text-black hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`;
            let badgeStyles = 'bg-white text-black border-black';

            if (isSelected) {
              if (isCorrectChoice) {
                cardStyles = 'bg-[#7CFF6B] border-black text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] scale-[1.02] -translate-y-1';
                badgeStyles = 'bg-black text-[#7CFF6B] border-black';
              } else {
                cardStyles = 'bg-[#FF6B6B] border-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-comic-shake';
                badgeStyles = 'bg-black text-[#FF6B6B] border-black';
              }
            } else if (isAnswerSubmitted && isCurrentCorrect && isCorrectChoice) {
              cardStyles = 'bg-[#7CFF6B] border-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]';
              badgeStyles = 'bg-black text-[#7CFF6B] border-black';
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-4 sm:p-5 rounded-xl border-3 text-left font-black text-sm sm:text-base transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer active:translate-y-1 active:shadow-none ${cardStyles}`}
              >
                <div className="flex items-center gap-3.5">
                  <span className={`w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm shrink-0 border-2 transition-colors ${badgeStyles}`}>
                    {letter}
                  </span>
                  <span>{cleanText}</span>
                </div>

                {isSelected && (
                  <div>
                    {isCorrectChoice ? (
                      <CheckCircle className="w-7 h-7 text-black shrink-0" />
                    ) : (
                      <XCircle className="w-7 h-7 text-black shrink-0" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Mascot Feedback Banner */}
        {isAnswerSubmitted && (
          <div className="animate-bounce-in">
            {isCurrentCorrect ? (
              <div className="p-5 rounded-xl bg-[#7CFF6B] border-3 border-black text-black flex items-start gap-3.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-4xl shrink-0">{mascot.avatar}</span>
                <div className="space-y-1">
                  <p className="font-black text-base sm:text-lg text-black" style={{ fontFamily: "'Bangers', cursive" }}>
                    💥 {mascot.name} cheering: &ldquo;{mascot.correctReaction}&rdquo;
                  </p>
                  <p className="text-sm text-black font-black bg-white inline-block px-3 py-1 rounded-lg border-2 border-black">
                    ⭐ +20 XP awarded! Spot-on comprehension!
                  </p>
                </div>
              </div>
            ) : showHint ? (
              <div className="p-5 rounded-xl bg-[#FFE156] border-3 border-black text-black flex items-start gap-3.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-4xl shrink-0">{mascot.avatar}</span>
                <div className="space-y-1.5">
                  <p className="font-black text-base sm:text-lg text-black" style={{ fontFamily: "'Bangers', cursive" }}>
                    🤔 {mascot.name}&apos;s Clue:
                  </p>
                  <p className="text-sm text-black font-bold leading-relaxed bg-white p-3 rounded-lg border-2 border-black">
                    {currentQ.hintForWrongAnswer}
                  </p>
                  <p className="text-xs text-black font-black">
                    👉 Click another option above to try again without penalty!
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* Action Controls Footer */}
        <div className="pt-4 flex items-center justify-between gap-3 border-t-3 border-black">
          <button
            type="button"
            onClick={onReviewStory}
            className="px-4 py-3 rounded-xl text-xs font-black text-black bg-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
          >
            📖 Review Comic
          </button>

          <button
            type="button"
            disabled={!isCurrentCorrect}
            onClick={handleNext}
            className={`px-6 sm:px-8 py-4 rounded-xl font-black text-sm sm:text-base text-black transition-all flex items-center gap-2 cursor-pointer border-3 border-black ${
              isCurrentCorrect
                ? 'bg-[#7CFF6B] shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-1 active:shadow-none'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none border-gray-300'
            }`}
            style={isCurrentCorrect ? { fontFamily: "'Bangers', cursive", letterSpacing: '0.03em' } : {}}
          >
            <span>
              {currentIndex + 1 === totalQuestions ? 'Finish & See Dashboard 🏆' : 'Next Question →'}
            </span>
          </button>
        </div>

      </div>

    </div>
  );
}
