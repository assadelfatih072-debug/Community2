import React from 'react';
import { Volume2, VolumeX, RotateCcw, BookOpen, Zap, Award } from 'lucide-react';
import { QuizMode } from '../types/quiz';

interface NavbarProps {
  mode: QuizMode;
  setMode: (m: QuizMode) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onReset: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  mode,
  setMode,
  isMuted,
  onToggleMute,
  onReset,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <span className="text-slate-950 font-black text-lg">41</span>
          </div>
          <div>
            <span className="text-lg font-extrabold tracking-tight text-white whitespace-nowrap block leading-none font-display">
              EcoMed<span className="text-emerald-400">Quiz</span>
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              Environmental &amp; Public Health
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Mode Switcher */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl">
          <button
            onClick={() => setMode('practice')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              mode === 'practice'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Practice Mode</span>
          </button>

          <button
            onClick={() => setMode('exam')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              mode === 'exam'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Full Exam</span>
          </button>

          <button
            onClick={() => setMode('speed')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              mode === 'speed'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Speed Blitz (15s)</span>
          </button>

          <button
            onClick={() => setMode('study')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              mode === 'study'
                ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Study Guide</span>
          </button>
        </nav>

        {/* Zone 3: Quick Utilities (Audio, Reset) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            title={isMuted ? 'Unmute Audio Feedback' : 'Mute Audio Feedback'}
            className={`p-2 rounded-lg border transition-colors ${
              isMuted
                ? 'border-slate-800 bg-slate-900/60 text-slate-500 hover:text-slate-300'
                : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Reset Quiz */}
          <button
            onClick={onReset}
            title="Restart Quiz"
            className="p-2 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Mode Switcher Bar */}
      <div className="flex md:hidden overflow-x-auto px-4 py-2 border-t border-slate-800/60 bg-slate-950 gap-1.5 scrollbar-none">
        <button
          onClick={() => setMode('practice')}
          className={`px-3 py-1 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 ${
            mode === 'practice' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 bg-slate-900'
          }`}
        >
          Practice
        </button>
        <button
          onClick={() => setMode('exam')}
          className={`px-3 py-1 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 ${
            mode === 'exam' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 bg-slate-900'
          }`}
        >
          Exam
        </button>
        <button
          onClick={() => setMode('speed')}
          className={`px-3 py-1 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 ${
            mode === 'speed' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 bg-slate-900'
          }`}
        >
          Speed Blitz
        </button>
        <button
          onClick={() => setMode('study')}
          className={`px-3 py-1 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 ${
            mode === 'study' ? 'bg-purple-500 text-white font-bold' : 'text-slate-400 bg-slate-900'
          }`}
        >
          Study Guide
        </button>
      </div>
    </header>
  );
};
