import React from 'react';
import { X, Check, AlertCircle, Bookmark, Sparkles } from 'lucide-react';
import { Question, OptionKey } from '../types/quiz';

interface QuestionNavigatorProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  currentIndex: number;
  onSelectQuestion: (index: number) => void;
  answers: Record<number, OptionKey>;
  bookmarks: number[];
  showInstantFeedback: boolean;
}

export const QuestionNavigator: React.FC<QuestionNavigatorProps> = ({
  isOpen,
  onClose,
  questions,
  currentIndex,
  onSelectQuestion,
  answers,
  bookmarks,
  showInstantFeedback,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-pop">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Questions Navigator (1 – 41)
              </h3>
              <p className="text-xs text-slate-400">
                Click any question number to jump directly
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 py-3 px-1 text-xs text-slate-300 border-b border-slate-800/60">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-emerald-500" />
            <span>Correct</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-rose-500" />
            <span>Incorrect</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-slate-800 border border-slate-700" />
            <span>Unanswered</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Bookmarked</span>
          </div>
        </div>

        {/* 41 Question Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-8 gap-2.5 overflow-y-auto py-4 pr-1">
          {questions.map((q, idx) => {
            const hasAnswered = answers[q.id] !== undefined;
            const userAnswer = answers[q.id];
            const isCorrect = userAnswer === q.correctAnswer;
            const isCurrent = idx === currentIndex;
            const isBookmarked = bookmarks.includes(q.id);

            let colorClasses = "bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-white";

            if (hasAnswered) {
              if (showInstantFeedback) {
                if (isCorrect) {
                  colorClasses = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold shadow-sm shadow-emerald-500/10";
                } else {
                  colorClasses = "bg-rose-500/20 border-rose-500 text-rose-300 font-bold shadow-sm shadow-rose-500/10";
                }
              } else {
                colorClasses = "bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold";
              }
            }

            return (
              <button
                key={q.id}
                onClick={() => {
                  onSelectQuestion(idx);
                  onClose();
                }}
                className={`relative flex flex-col items-center justify-center h-12 rounded-xl border text-sm font-mono font-bold transition-all cursor-pointer ${colorClasses} ${
                  isCurrent ? 'ring-2 ring-emerald-400 scale-105 z-10' : ''
                }`}
              >
                <span>{q.id}</span>

                {/* Status Indicator Dot/Icon */}
                <div className="absolute top-1 right-1">
                  {isBookmarked && (
                    <Bookmark className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                  )}
                </div>

                <div className="absolute bottom-1">
                  {hasAnswered && showInstantFeedback && (
                    isCorrect ? (
                      <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
                    ) : (
                      <AlertCircle className="w-3 h-3 text-rose-400 stroke-[2.5]" />
                    )
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-300 bg-slate-800 rounded-xl hover:bg-slate-700 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
