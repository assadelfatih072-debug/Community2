import React from 'react';
import { Flame, CheckCircle2, XCircle, Grid, Bookmark, Timer } from 'lucide-react';
import { Question } from '../types/quiz';

interface ScoreRibbonProps {
  currentIndex: number;
  totalQuestions: number;
  currentQuestion: Question;
  correctCount: number;
  wrongCount: number;
  streak: number;
  longestStreak: number;
  scoreXP: number;
  onOpenNavigator: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  timeLeft?: number | null;
}

export const ScoreRibbon: React.FC<ScoreRibbonProps> = ({
  currentIndex,
  totalQuestions,
  currentQuestion,
  correctCount,
  wrongCount,
  streak,
  scoreXP,
  onOpenNavigator,
  isBookmarked,
  onToggleBookmark,
  timeLeft,
}) => {
  const answeredCount = correctCount + wrongCount;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);
  const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  return (
    <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-3 sm:p-4 shadow-xl backdrop-blur-sm">
      {/* Top metrics row */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        {/* Question Counter & Category */}
        <div className="flex items-center gap-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-white font-mono tabular-nums">
              {currentIndex + 1}
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              / {totalQuestions}
            </span>
          </div>

          <span className="text-slate-600">·</span>

          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {currentQuestion.categoryLabel}
          </span>

          {/* Bookmark button */}
          <button
            onClick={onToggleBookmark}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark this question for review'}
            className={`p-1.5 rounded-lg border transition-all ${
              isBookmarked
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                : 'text-slate-500 border-transparent hover:text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
          </button>
        </div>

        {/* Dynamic Streak & Stats */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs font-medium">
          {/* Timer if in timed mode */}
          {timeLeft !== null && timeLeft !== undefined && (
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-mono font-bold tabular-nums transition-colors ${
                timeLeft <= 5
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/50 animate-pulse'
                  : 'bg-slate-800 text-cyan-300 border-slate-700'
              }`}
            >
              <Timer className="w-3.5 h-3.5" />
              <span>{timeLeft}s</span>
            </div>
          )}

          {/* Streak Indicator with energetic flame */}
          {streak >= 2 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 font-bold animate-pop">
              <Flame className="w-4 h-4 fill-amber-400 text-amber-500 animate-bounce" />
              <span>{streak}x Streak! 🔥</span>
            </div>
          )}

          {/* Correct Counter */}
          <div className="flex items-center gap-1 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="font-mono tabular-nums font-bold">{correctCount}</span>
          </div>

          {/* Wrong Counter */}
          <div className="flex items-center gap-1 text-rose-400">
            <XCircle className="w-3.5 h-3.5" />
            <span className="font-mono tabular-nums font-bold">{wrongCount}</span>
          </div>

          {/* Score XP */}
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-bold">
            <span>+{scoreXP} XP</span>
          </div>

          {/* Jump Navigator Button */}
          <button
            onClick={onOpenNavigator}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700"
            title="Open 41 Questions Grid"
          >
            <Grid className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">1–41 Matrix</span>
          </button>
        </div>
      </div>

      {/* Modern Bi-color Progress Bar */}
      <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden flex border border-slate-800">
        <div
          className="bg-emerald-500 h-full transition-all duration-300 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
          style={{ width: `${(correctCount / totalQuestions) * 100}%` }}
          title={`Correct: ${correctCount}`}
        />
        <div
          className="bg-rose-500 h-full transition-all duration-300 shadow-[0_0_8px_rgba(244,63,94,0.5)]"
          style={{ width: `${(wrongCount / totalQuestions) * 100}%` }}
          title={`Incorrect: ${wrongCount}`}
        />
      </div>

      {/* Progress subtext */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1.5 px-0.5">
        <span>{answeredCount} of {totalQuestions} answered ({progressPercent}%)</span>
        {answeredCount > 0 && (
          <span className="text-emerald-400/90 font-medium font-mono">
            {accuracy}% accuracy
          </span>
        )}
      </div>
    </div>
  );
};
