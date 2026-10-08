'use client';

import React, { useState } from 'react';
import { X, Key, ExternalLink, ShieldCheck, Sparkles, Check } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentKey: string;
  onSaveKey: (key: string) => void;
}

export default function ApiKeyModal({
  isOpen,
  onClose,
  currentKey,
  onSaveKey,
}: ApiKeyModalProps) {
  const [inputKey, setInputKey] = useState(currentKey);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveKey(inputKey.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 700);
  };

  const handleClear = () => {
    setInputKey('');
    onSaveKey('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white rounded-3xl shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] border-4 border-black overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#00E5FF] p-6 text-black relative border-b-4 border-black">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-xl bg-white hover:bg-slate-100 flex items-center justify-center text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0.5 transition-transform cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[3]" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-2 rounded-xl bg-[#FFE156] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Key className="w-5 h-5 text-black" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-black bg-white px-2 py-0.5 rounded border-2 border-black">Settings</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-black font-comic">Google Gemini API Setup</h2>
          <p className="text-xs sm:text-sm text-black font-bold mt-1">
            Generate unlimited custom stories with your own Gemini API Key.
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div className="space-y-2">
            <label className="block text-xs font-black text-black uppercase tracking-wider">
              Gemini API Key
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="AIzaSy..."
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                className="w-full px-4 py-3 bg-[#FFE156]/20 border-3 border-black rounded-2xl text-sm font-mono text-black placeholder:text-slate-400 focus:outline-hidden focus:ring-4 focus:ring-[#00E5FF] transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>
            <p className="text-[11px] text-slate-700 font-bold">
              Keys are stored securely in your browser session or in your local <code className="bg-slate-200 border border-black px-1.5 py-0.5 rounded font-mono text-black">.env.local</code> file.
            </p>
          </div>

          {/* Quick links & Demo info */}
          <div className="p-4 rounded-2xl bg-[#FF9F43]/20 border-3 border-black space-y-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-2 text-xs font-black text-black">
              <Sparkles className="w-4 h-4 text-black fill-[#FFE156]" />
              <span>No API key handy? No worries!</span>
            </div>
            <p className="text-xs text-black font-bold leading-relaxed">
              Story Teacher includes full interactive demo modules for topics like <strong>Photosynthesis</strong>, <strong>Gravity</strong>, and <strong>Black Holes</strong> so you can experience all screens immediately.
            </p>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-black text-black underline hover:text-[#FF6B9D] pt-1"
            >
              <span>Get a free Gemini API key from Google AI Studio</span>
              <ExternalLink className="w-3.5 h-3.5 text-black" />
            </a>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-2">
            {inputKey ? (
              <button
                type="button"
                onClick={handleClear}
                className="text-xs font-black text-rose-600 hover:text-rose-700 underline cursor-pointer"
              >
                Clear Key (Use Demo Mode)
              </button>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-black font-black bg-[#7CFF6B] px-2.5 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <ShieldCheck className="w-4 h-4 text-black" />
                <span>Demo Mode Available</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-black text-black bg-white hover:bg-slate-100 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0.5 transition-transform cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2.5 rounded-xl text-xs font-black text-black bg-[#7CFF6B] hover:bg-[#69e859] border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0.5 transition-transform flex items-center gap-1.5 cursor-pointer"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <span>Save Configuration</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
