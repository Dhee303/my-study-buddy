'use client';

import React from 'react';
import {
  ArrowRight,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Layers,
  Clapperboard,
  Zap
} from 'lucide-react';
import { StoryPayload } from '@/types';
import { getMascot } from '@/lib/mascots';

interface StoryScreenProps {
  storyData: StoryPayload;
  onProceedToFlashcards: () => void;
  onBackToSetup: () => void;
}

export default function StoryScreen({
  storyData,
  onProceedToFlashcards,
  onBackToSetup,
}: StoryScreenProps) {
  const mascot = getMascot(storyData.mascot);

  // Helper to parse comic paragraph for [SCENE: ...] and *SOUNDS*
  const parseComicParagraph = (rawText: string) => {
    let sceneDescription: string | null = null;
    let mainText = rawText;

    const sceneMatch = rawText.match(/\[SCENE:\s*([^\]]+)\]/i) || rawText.match(/\[SCENE\s*([^\]]+)\]/i);
    if (sceneMatch) {
      sceneDescription = sceneMatch[1].trim();
      mainText = rawText.replace(sceneMatch[0], '').trim();
    }

    // Split text by *SOUND* tags
    const soundParts = mainText.split(/(\*[^*]+\*)/g);

    return {
      sceneDescription,
      soundParts,
    };
  };

  const wordCount = storyData.storyText.join(' ').split(/\s+/).length;
  const estimatedMinutes = Math.max(1, Math.round(wordCount / 110));

  const panelColors = ['bg-[#FFE156]', 'bg-[#00E5FF]', 'bg-[#FF6B9D]', 'bg-[#7CFF6B]', 'bg-[#C56CF0]', 'bg-[#FF9F43]'];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      
      {/* Top Bar Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBackToSetup}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black text-black bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Change Topic / Mascot</span>
        </button>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <span className="text-xl">{mascot.avatar}</span>
          <span className="text-xs font-black text-black">{mascot.name}</span>
        </div>
      </div>

      {/* Main Comic Book Container */}
      <article className="bg-white rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative">
        
        {/* Comic Header Banner */}
        <header className="bg-black p-6 sm:p-10 text-white border-b-4 border-black relative">
          
          {/* Top Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-4 py-1.5 rounded-lg bg-[#FFE156] text-black text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] flex items-center gap-1.5 border-2 border-black">
              <Zap className="w-4 h-4 fill-black" />
              <span>Issue #1 • E-Comic Adventure</span>
            </span>
            {storyData.age && (
              <span className="px-3.5 py-1.5 rounded-lg bg-[#00E5FF] text-black text-xs font-black border-2 border-black">
                Age {storyData.age}
              </span>
            )}
            <span className="px-3.5 py-1.5 rounded-lg bg-[#FF6B9D] text-black text-xs font-black border-2 border-black">
              ⏱️ {estimatedMinutes} Min Read
            </span>
            <span className="px-3.5 py-1.5 rounded-lg bg-[#7CFF6B] text-black text-xs font-black border-2 border-black">
              +50 XP On Complete
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#FFE156] leading-tight tracking-wide uppercase" style={{ fontFamily: "'Bangers', cursive" }}>
            {storyData.storyTitle}
          </h1>

          {storyData.topic && (
            <p className="mt-3 text-white font-black text-sm sm:text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FFE156] fill-[#FFE156]" />
              <span>Core Subject: <strong className="text-[#00E5FF]">{storyData.topic}</strong></span>
            </p>
          )}

          {/* Host Mascot Intro Bubble */}
          <div className="mt-6 p-5 rounded-xl bg-white text-black border-3 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] flex items-start gap-3.5">
            <div className="w-14 h-14 rounded-xl bg-[#FFE156] border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] flex items-center justify-center text-3xl shrink-0">
              {mascot.avatar}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-black px-2 py-0.5 bg-[#FFE156] rounded-md border border-black">
                  {mascot.name}
                </span>
                <span className="text-[10px] text-white bg-black px-2.5 py-0.5 rounded-md font-black">
                  Host Narrator
                </span>
              </div>
              <p className="text-sm text-black font-bold leading-relaxed italic">
                &ldquo;{storyData.mascotIntro || mascot.greeting}&rdquo;
              </p>
            </div>
          </div>
        </header>

        {/* Comic Panels Grid / Flow */}
        <div className="p-6 sm:p-10 space-y-8 comic-dots">
          
          {storyData.storyText.map((rawParagraph, index) => {
            const { sceneDescription, soundParts } = parseComicParagraph(rawParagraph);
            const panelColor = panelColors[index % panelColors.length];

            return (
              <div
                key={index}
                className="bg-white rounded-xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden transition-all duration-300 relative group hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                {/* Comic Scene Tag / Banner */}
                {sceneDescription && (
                  <div className={`${panelColor} text-black px-4 py-2.5 border-b-4 border-black flex items-center gap-2 text-xs font-black uppercase tracking-wider`}>
                    <Clapperboard className="w-4 h-4" />
                    <span>SCENE: {sceneDescription}</span>
                  </div>
                )}

                <div className="p-6 sm:p-8 space-y-4">
                  {/* Panel Indicator & Mascot Mini-Badge */}
                  <div className="flex items-center justify-between pb-2 border-b-3 border-black">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-black text-[#FFE156] font-black text-sm flex items-center justify-center border-2 border-black">
                        {index + 1}
                      </span>
                      <span className="text-xs font-black uppercase tracking-widest text-black">
                        Panel {index + 1}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFE156] text-black text-xs font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <span>{mascot.avatar}</span>
                      <span className="text-[11px]">{mascot.name.split(' ')[0]}</span>
                    </div>
                  </div>

                  {/* Panel Story Text with Rich Comic Elements */}
                  <div className="text-black text-lg sm:text-xl leading-loose font-bold">
                    {soundParts.map((part, pIdx) => {
                      // Check if part is a sound effect enclosed in asterisks
                      if (part.startsWith('*') && part.endsWith('*')) {
                        const cleanSound = part.replace(/\*/g, '');
                        return (
                          <span
                            key={pIdx}
                            className="inline-block mx-1.5 my-1 px-3 py-1.5 rounded-lg bg-[#FF6B6B] text-black font-black text-sm uppercase tracking-wider transform -rotate-2 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] animate-pop"
                            style={{ fontFamily: "'Bangers', cursive" }}
                          >
                            💥 {cleanSound}
                          </span>
                        );
                      }
                      return <span key={pIdx}>{part}</span>;
                    })}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Key Takeaways & Discoveries Box */}
          {storyData.conceptsMastered && storyData.conceptsMastered.length > 0 && (
            <div className="p-6 sm:p-8 rounded-xl bg-[#7CFF6B] text-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-2.5 mb-4">
                <Sparkles className="w-7 h-7 text-black" />
                <h3 className="font-black text-xl sm:text-2xl uppercase tracking-wide" style={{ fontFamily: "'Bangers', cursive" }}>
                  Key Discoveries In This Comic:
                </h3>
              </div>
              <ul className="space-y-3">
                {storyData.conceptsMastered.map((concept, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base font-bold leading-relaxed bg-white p-3 rounded-lg border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <CheckCircle2 className="w-5 h-5 text-black shrink-0 mt-0.5" />
                    <span>{concept}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Trigger for Screen C (3D Flashcards) */}
          <div className="pt-6 text-center space-y-3">
            <button
              onClick={onProceedToFlashcards}
              className="w-full py-6 px-8 rounded-xl font-black text-xl sm:text-2xl text-black bg-[#FFE156] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3 cursor-pointer group"
              style={{ fontFamily: "'Bangers', cursive", letterSpacing: '0.04em' }}
            >
              <Layers className="w-7 h-7 group-hover:animate-wiggle transition-transform" />
              <span>Practice with 3D Flashcards! (+50 XP)</span>
              <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
            </button>
            <p className="text-sm text-black font-black">
              Flip 3D cards to master key concepts, then tackle the quiz! ✨
            </p>
          </div>

        </div>
      </article>

    </div>
  );
}
