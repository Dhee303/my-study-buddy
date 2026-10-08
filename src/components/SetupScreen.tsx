'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  BookOpen,
  Wand2,
  Compass,
  Lightbulb,
  Loader2,
  AlertCircle,
  Check,
  Flame,
  ArrowRight
} from 'lucide-react';
import { GenerateStoryRequest, MascotId } from '@/types';
import { MASCOT_LIST, getMascot } from '@/lib/mascots';

interface SetupScreenProps {
  onGenerate: (data: GenerateStoryRequest) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  onClearError: () => void;
  initialTopic?: string;
  initialMascot?: MascotId;
}

const TOPIC_SUGGESTIONS = [
  {
    emoji: '🌱',
    label: 'Photosynthesis',
    topic: 'Photosynthesis & How Plants Cook Sunbeams',
    mascot: 'channie' as MascotId,
    description: 'How tiny green leaves turn sunlight into food energy',
    category: 'Biology & Nature',
    color: 'bg-[#7CFF6B]'
  },
  {
    emoji: '🍎',
    label: 'Gravity & Falling Apples',
    topic: 'Gravity & Why Things Fall Down',
    mascot: 'lee' as MascotId,
    description: 'Why balls, apples, and puppies stay stuck to the Earth',
    category: 'Physics & Forces',
    color: 'bg-[#FFE156]'
  },
  {
    emoji: '🌌',
    label: 'Black Holes & Cosmic Voids',
    topic: 'Black Holes in Deep Space',
    mascot: 'minnie' as MascotId,
    description: 'The swirling mysteries and event horizons of deep space',
    category: 'Space & Astronomy',
    color: 'bg-[#00E5FF]'
  },
  {
    emoji: '📐',
    label: 'Algebra & Secret Mystery Box',
    topic: 'Algebra & Solving for X',
    mascot: 'felix' as MascotId,
    description: 'Cracking secret number codes using balance scales',
    category: 'Math & Logic',
    color: 'bg-[#FF6B9D]'
  },
  {
    emoji: '🍕',
    label: 'Fractions with Pizza Slices',
    topic: 'Understanding Fractions & Pizza Math',
    mascot: 'lee' as MascotId,
    description: 'Slicing halves, quarters, and eighths into delicious math',
    category: 'Math & Numbers',
    color: 'bg-[#FF9F43]'
  },
  {
    emoji: '⚡',
    label: 'Static Electricity & Sparks',
    topic: 'Static Electricity & Jumping Electrons',
    mascot: 'channie' as MascotId,
    description: 'Why socks stick together and balloons stick to walls',
    category: 'Science & Energy',
    color: 'bg-[#FFE156]'
  },
  {
    emoji: '🏛️',
    label: 'Ancient Rome & Gladiators',
    topic: 'Ancient Rome, Aqueducts & Empires',
    mascot: 'minnie' as MascotId,
    description: 'Explore the Colosseum, emperors, and ancient engineers',
    category: 'History & World',
    color: 'bg-[#C56CF0]'
  },
  {
    emoji: '🎭',
    label: 'Creative Storytelling & Rhymes',
    topic: 'Creative Storytelling & Metaphors',
    mascot: 'felix' as MascotId,
    description: 'Conjure exciting rhymes, heroes, and word magic',
    category: 'Language Arts',
    color: 'bg-[#FF6B9D]'
  },
];

const STORY_THEMES = [
  { id: 'Any', label: 'Surprise Me! ✨', emoji: '🎲' },
  { id: 'Space Odyssey', label: 'Space Odyssey', emoji: '🚀' },
  { id: 'Magical Kingdom', label: 'Magical Kingdom', emoji: '🏰' },
  { id: 'Detective Mystery', label: 'Detective Mystery', emoji: '🕵️' },
  { id: 'Time Travel Journey', label: 'Time Travel Journey', emoji: '⏳' },
  { id: 'Microscopic World', label: 'Microscopic World', emoji: '🔬' },
];

const LOADING_MESSAGES = [
  "Summoning your mascot companion...",
  "Sketching comic panels and sound effects...",
  "Tailoring vocabulary to your child's age...",
  "Designing 3D concept flashcards...",
  "Baking comprehension questions and encouraging hints...",
  "Polishing final story panels for launch! 🚀"
];

export default function SetupScreen({
  onGenerate,
  isLoading,
  error,
  onClearError,
  initialTopic = 'Photosynthesis & How Plants Cook Sunbeams',
  initialMascot = 'channie',
}: SetupScreenProps) {
  const [topic, setTopic] = useState(initialTopic || TOPIC_SUGGESTIONS[0].topic);
  const [age, setAge] = useState<number>(8);
  const [selectedMascot, setSelectedMascot] = useState<MascotId>(initialMascot);
  const [theme, setTheme] = useState<string>('Any');
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  // Sync initial topic if updated externally
  useEffect(() => {
    if (initialTopic) {
      setTopic(initialTopic);
    }
  }, [initialTopic]);

  // Rotate loading messages while loading
  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setLoadingMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [isLoading]);

  const activeMascotObj = getMascot(selectedMascot);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onClearError();
    onGenerate({
      topic: topic.trim(),
      age,
      mascot: selectedMascot,
      tone: theme !== 'Any' ? theme : undefined,
    });
  };

  const handleSelectTopic = (item: typeof TOPIC_SUGGESTIONS[0]) => {
    setTopic(item.topic);
    setSelectedMascot(item.mascot);
  };

  const getAgeDescription = (selectedAge: number) => {
    if (selectedAge <= 7) return 'Early Explorer (Ages 5-7): Big visual analogies, playful onomatopoeia, and simple everyday words.';
    if (selectedAge <= 10) return 'Curious Discoverer (Ages 8-10): Engaging comic plot, clever metaphors, and lively dialogue.';
    if (selectedAge <= 13) return 'Junior Scientist (Ages 11-13): Cause-and-effect science, deeper concepts, and thoughtful challenges.';
    return 'Young Scholar (Ages 14-15): Academic precision, historical depth, and sophisticated problem-solving.';
  };

  const mascotCardColors = ['bg-[#7CFF6B]', 'bg-[#FFE156]', 'bg-[#00E5FF]', 'bg-[#FF6B9D]'];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      
      {/* Hero Header */}
      <div className="text-center space-y-5 mb-10">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#00E5FF] border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm font-black text-black animate-float">
          <Sparkles className="w-5 h-5 text-black" />
          <span>Interactive E-Comic Learning, 3D Flashcards &amp; Quizzes</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-wide text-black leading-tight" style={{ fontFamily: "'Bangers', cursive" }}>
          What would you love to{' '}
          <span className="bg-[#FF6B9D] px-3 py-1 rounded-xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block -rotate-1">
            learn today?
          </span>
        </h1>
        
        <p className="text-base sm:text-lg text-black/80 max-w-2xl mx-auto leading-relaxed font-bold">
          Pick your favorite learning adventure below! Your study buddy will transform it into an action-packed comic adventure with 3D flashcards and comprehension challenges!
        </p>
      </div>

      {/* Main Setup Form Card */}
      <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-10 relative overflow-hidden">
        
        {/* Corner decorations */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-[#FFE156] -translate-y-1/2 translate-x-1/2 rotate-45 border-4 border-black" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#FF6B9D] translate-y-1/2 -translate-x-1/2 rotate-45 border-4 border-black" />

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-[#FF6B6B] border-3 border-black text-black flex items-start gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-comic-shake">
            <AlertCircle className="w-6 h-6 text-black shrink-0 mt-0.5" />
            <div>
              <p className="font-black text-base">💥 KA-POW! Something went sideways!</p>
              <p className="mt-0.5 text-sm font-bold">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          
          {/* STEP 1: Select Topic Adventure */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label 
                className="flex items-center gap-2 text-sm sm:text-base font-black text-black"
              >
                <div className="w-9 h-9 rounded-lg bg-[#C56CF0] flex items-center justify-center text-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <span className="text-lg">1. Choose a Topic Adventure</span>
              </label>
              <span className="text-xs text-black font-black bg-[#FFE156] px-3 py-1.5 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                Selected: {TOPIC_SUGGESTIONS.find(t => t.topic === topic)?.label || topic}
              </span>
            </div>

            {/* Curated Topic Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {TOPIC_SUGGESTIONS.map((item) => {
                const isSelected = topic === item.topic;
                return (
                  <button
                    key={item.label}
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleSelectTopic(item)}
                    className={`p-4 rounded-xl border-3 text-left transition-all cursor-pointer relative flex flex-col justify-between hover:-translate-y-1 active:translate-y-1 ${
                      isSelected
                        ? `${item.color} border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] scale-[1.02] -translate-y-1`
                        : 'bg-white hover:bg-slate-50 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-6 h-6 rounded-lg bg-black text-white flex items-center justify-center border-2 border-black">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-2xl">{item.emoji}</span>
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-black text-white">
                          {item.category}
                        </span>
                      </div>
                      <h4 className="font-black text-base text-black leading-snug">
                        {item.label}
                      </h4>
                      <p className="text-xs text-black/80 font-bold mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Cute Mascot Avatar Selector */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm sm:text-base font-black text-black">
                <div className="w-9 h-9 rounded-lg bg-[#FFE156] flex items-center justify-center text-black border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-lg">2. Pick Your Mascot Host</span>
              </label>
              <span className="text-xs text-black font-black bg-[#FF6B9D] px-3 py-1.5 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                Your Narrator
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {MASCOT_LIST.map((m, idx) => {
                const isSelected = selectedMascot === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    disabled={isLoading}
                    onClick={() => setSelectedMascot(m.id)}
                    className={`p-4 rounded-xl border-3 text-left transition-all cursor-pointer relative flex flex-col justify-between hover:-translate-y-1 active:translate-y-1 ${
                      isSelected
                        ? `${mascotCardColors[idx]} border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] scale-[1.02] -translate-y-1`
                        : 'bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-6 h-6 rounded-lg bg-black text-white flex items-center justify-center border-2 border-black">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}

                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-14 h-14 rounded-xl bg-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-3xl shrink-0">
                        {m.avatar}
                      </div>
                      <div>
                        <h4 className="font-black text-sm text-black leading-tight">
                          {m.name}
                        </h4>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded-md text-[10px] font-black bg-black text-white">
                          {m.specialty}
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-black/70 italic font-bold line-clamp-2 mt-1">
                      &ldquo;{m.catchphrase}&rdquo;
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Mascot Greeting Preview */}
            <div className="p-4 rounded-xl bg-[#00E5FF] border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 comic-bubble">
              <span className="text-3xl">{activeMascotObj.avatar}</span>
              <p className="text-sm text-black font-bold leading-relaxed">
                <strong className="font-black">{activeMascotObj.name}:</strong> {activeMascotObj.greeting}
              </p>
            </div>
          </div>

          {/* STEP 3: Target Age Selector (5 to 15) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label 
                htmlFor="age-select"
                className="flex items-center gap-2 text-sm sm:text-base font-black text-black"
              >
                <div className="w-9 h-9 rounded-lg bg-[#FF6B9D] flex items-center justify-center text-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  <Compass className="w-5 h-5" />
                </div>
                <span className="text-lg">3. Child&apos;s Target Age:</span>
                <span className="px-3.5 py-1.5 rounded-lg bg-[#C56CF0] text-white font-black text-sm border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {age} Years Old
                </span>
              </label>

              <div className="text-xs text-black font-black bg-[#7CFF6B] px-3 py-1.5 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                Adaptive Difficulty
              </div>
            </div>

            {/* Age Slider + Number Pills */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-black bg-[#FFE156] px-2.5 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  5
                </span>
                <input
                  id="age-select"
                  type="range"
                  min="5"
                  max="15"
                  step="1"
                  value={age}
                  disabled={isLoading}
                  onChange={(e) => setAge(parseInt(e.target.value, 10))}
                  className="w-full h-4 bg-[#00E5FF] rounded-lg appearance-none cursor-pointer border-3 border-black accent-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                />
                <span className="text-xs font-black text-black bg-[#FFE156] px-2.5 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  15
                </span>
              </div>

              {/* Quick Age Select Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1">
                {[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAge(val)}
                    disabled={isLoading}
                    className={`w-9 h-9 rounded-lg font-black text-xs transition-all cursor-pointer border-2 border-black ${
                      age === val
                        ? 'bg-black text-[#FFE156] scale-110 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -translate-y-1'
                        : 'bg-white hover:bg-[#FFE156] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>

              {/* Age Pedagogical Explanation Box */}
              <p className="text-xs text-black font-bold p-3 bg-white rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                🎯 {getAgeDescription(age)}
              </p>
            </div>
          </div>

          {/* STEP 4: Story Theme/Tone */}
          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-2 text-sm sm:text-base font-black text-black">
              <div className="w-9 h-9 rounded-lg bg-[#FF9F43] flex items-center justify-center text-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-lg">4. Adventure Setting &amp; Theme</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {STORY_THEMES.map((t) => {
                const isSelected = theme === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    disabled={isLoading}
                    onClick={() => setTheme(t.id)}
                    className={`p-3 rounded-xl border-3 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 hover:-translate-y-1 active:translate-y-1 ${
                      isSelected
                        ? 'bg-[#FFE156] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black -translate-y-0.5'
                        : 'bg-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-2xl">{t.emoji}</span>
                    <span className="text-xs leading-tight text-black">{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SUBMIT BUTTON & LOADING STATE */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading || !topic.trim()}
              className="w-full py-5 px-8 rounded-2xl font-black text-xl sm:text-2xl text-black bg-[#7CFF6B] hover:bg-[#6be85b] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3 cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "'Bangers', cursive", letterSpacing: '0.04em' }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-7 h-7 animate-spin text-black" />
                  <span>Generating Epic Adventure...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                  <span>Generate Story &amp; Comics!</span>
                  <Sparkles className="w-6 h-6 text-black fill-black" />
                </>
              )}
            </button>

            {/* Dynamic Loading Message */}
            {isLoading && (
              <div className="mt-4 p-4 rounded-xl bg-[#FFE156] border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center animate-pulse">
                <p className="text-sm font-black text-black">
                  ✨ {LOADING_MESSAGES[loadingMessageIndex]}
                </p>
              </div>
            )}
          </div>

        </form>
      </div>

    </div>
  );
}
