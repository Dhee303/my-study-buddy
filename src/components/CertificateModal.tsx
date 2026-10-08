'use client';

import React from 'react';
import { X, Award, Printer, CheckCircle2 } from 'lucide-react';
import { StoryPayload, QuizSubmission } from '@/types';
import { getMascot } from '@/lib/mascots';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  storyData: StoryPayload;
  quizResult: QuizSubmission;
  childAge: number;
}

export default function CertificateModal({
  isOpen,
  onClose,
  storyData,
  quizResult,
  childAge,
}: CertificateModalProps) {
  if (!isOpen) return null;

  const mascot = getMascot(storyData.mascot);

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] border-4 border-black overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Action Bar (hidden in print) */}
        <div className="p-4 bg-[#00E5FF] border-b-4 border-black flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-xs font-black text-black">
            <Award className="w-5 h-5 text-black" />
            <span className="font-comic text-sm">Official Story Teacher Certificate</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-[#7CFF6B] hover:bg-[#68e058] text-black text-xs font-black border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5 hover:-translate-y-0.5 active:translate-y-0.5 transition-transform cursor-pointer"
            >
              <Printer className="w-4 h-4 text-black" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white hover:bg-slate-100 flex items-center justify-center text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0.5 transition-transform cursor-pointer"
            >
              <X className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Area */}
        <div className="p-8 sm:p-12 text-center bg-[#FFE156]/30 relative">
          
          {/* Certificate Corner Ornaments */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-black rounded-tl-xl pointer-events-none" />
          <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-black rounded-tr-xl pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-black rounded-bl-xl pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-black rounded-br-xl pointer-events-none" />

          {/* Certificate Header */}
          <div className="w-20 h-20 rounded-2xl bg-[#FFE156] border-4 border-black mx-auto flex items-center justify-center text-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] mb-4">
            <Award className="w-10 h-10 text-black" />
          </div>

          <p className="text-xs font-black uppercase tracking-widest text-black bg-[#FF6B9D] inline-block px-3 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            Official Certificate of Mastery
          </p>

          <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight mt-3 mb-3 font-comic">
            Young Scholar Award
          </h2>

          <p className="text-sm text-black font-bold max-w-md mx-auto leading-relaxed">
            This certificate proudly celebrates our Curious Explorer (Age {childAge}) for successfully completing the interactive educational adventure:
          </p>

          {/* Subject Badge */}
          <div className="my-5 p-4 rounded-2xl bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-lg mx-auto">
            <h3 className="text-xl sm:text-2xl font-black text-black font-comic">
              &ldquo;{storyData.storyTitle}&rdquo;
            </h3>
            <p className="text-xs text-black font-black mt-1 bg-[#00E5FF] inline-block px-2.5 py-0.5 rounded border border-black">
              Topic: {storyData.topic || 'Science & Discovery'}
            </p>
          </div>

          {/* Quiz Score Badge */}
          <div className="flex items-center justify-center gap-6 text-xs text-black mb-6">
            <div className="flex items-center gap-1.5 font-black bg-[#7CFF6B] px-3 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <CheckCircle2 className="w-4 h-4 text-black" />
              <span>Score: {quizResult.score} / {quizResult.total} Correct</span>
            </div>
            <div className="font-black bg-[#FFE156] px-3 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              ⭐ Comprehension Mastered
            </div>
          </div>

          {/* Signatures & Date */}
          <div className="pt-6 border-t-3 border-black flex items-end justify-between max-w-md mx-auto text-xs text-black font-bold">
            <div className="text-left">
              <p className="font-mono text-slate-700 uppercase text-[10px]">Date Awarded</p>
              <p className="font-black text-black mt-0.5">{currentDate}</p>
            </div>
            
            <div className="text-right">
              <div className="flex items-center justify-end gap-1.5 text-base text-black font-black font-comic">
                <span>{mascot.avatar}</span>
                <span>{mascot.name}</span>
              </div>
              <p className="font-mono text-[10px] text-slate-700 mt-0.5">Host Educator &amp; Story Teacher AI</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
