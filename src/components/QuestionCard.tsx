import React from 'react';
import { Check, X, ArrowRight, ArrowLeft, Lightbulb, Sparkles, CheckCircle2 } from 'lucide-react';
import { Question, OptionKey } from '../types/quiz';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: OptionKey | null;
  onSelectOption: (key: OptionKey) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  isAnswered: boolean;
  showInstantFeedback: boolean;
  onFinishExam?: () => void;
  isExamMode?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onSelectOption,
  onNext,
  onPrev,
  isFirst,
  isLast,
  isAnswered,
  showInstantFeedback,
  onFinishExam,
  isExamMode = false,
}) => {
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div
      className={`relative w-full rounded-3xl p-6 sm:p-8 transition-all duration-300 border ${
        isAnswered && showInstantFeedback
          ? isCorrect
            ? 'bg-slate-900/90 border-emerald-500/50 glow-emerald animate-pop'
            : 'bg-slate-900/90 border-rose-500/50 glow-rose animate-shake'
          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700/80'
      } shadow-2xl backdrop-blur-md`}
    >
      {/* Question Header & Title */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
          <span className="font-mono text-emerald-400 font-bold">
            Question #{question.id}
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60 uppercase tracking-wider text-[10px]">
            {question.difficulty}
          </span>
        </div>

        {/* English Question */}
        <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug tracking-tight font-display">
          {question.question}
        </h2>
      </div>

      {/* 4 Interactive Options (A, B, C, D) */}
      <div className="grid grid-cols-1 gap-3 sm:gap-3.5 mb-6">
        {question.options.map((opt) => {
          const isSelected = selectedAnswer === opt.key;
          const isOptionCorrect = opt.key === question.correctAnswer;
          
          let btnStyle = "bg-slate-950/60 border-slate-800 text-slate-200 hover:bg-slate-800/80 hover:border-slate-700 hover:text-white";
          let keyBadgeStyle = "bg-slate-800 text-slate-300 border-slate-700";

          if (isAnswered && showInstantFeedback) {
            if (isOptionCorrect) {
              // Always highlight correct answer in emerald
              btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-100 font-semibold ring-2 ring-emerald-500/30";
              keyBadgeStyle = "bg-emerald-500 text-slate-950 font-black border-emerald-400";
            } else if (isSelected && !isOptionCorrect) {
              // Highlight selected incorrect answer in rose
              btnStyle = "bg-rose-500/20 border-rose-500 text-rose-100 ring-2 ring-rose-500/30";
              keyBadgeStyle = "bg-rose-500 text-white font-black border-rose-400";
            } else {
              // Dim other non-selected incorrect options
              btnStyle = "bg-slate-950/30 border-slate-900 text-slate-500 opacity-60";
              keyBadgeStyle = "bg-slate-900 text-slate-600 border-slate-800";
            }
          } else if (isSelected) {
            // Selected state in exam mode
            btnStyle = "bg-cyan-500/20 border-cyan-500 text-cyan-100 ring-2 ring-cyan-500/30 font-semibold";
            keyBadgeStyle = "bg-cyan-500 text-slate-950 font-black border-cyan-400";
          }

          return (
            <button
              key={opt.key}
              onClick={() => onSelectOption(opt.key)}
              disabled={isAnswered && showInstantFeedback}
              className={`group relative flex items-center justify-between w-full text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer disabled:cursor-default ${btnStyle}`}
            >
              <div className="flex items-center gap-3.5 flex-1 min-w-0 pr-2">
                {/* Option Key Letter (A, B, C, D) */}
                <span
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono text-sm font-bold border transition-colors shrink-0 shadow-sm ${keyBadgeStyle}`}
                >
                  {opt.key}
                </span>

                {/* Option Text */}
                <span className="text-sm sm:text-base leading-snug">
                  {opt.text}
                </span>
              </div>

              {/* Status Indicator */}
              <div className="shrink-0 ml-2">
                {isAnswered && showInstantFeedback && isOptionCorrect && (
                  <div className="flex items-center gap-1 text-emerald-400 font-semibold text-xs bg-emerald-500/20 border border-emerald-500/40 px-2 py-1 rounded-lg animate-pop">
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span className="hidden sm:inline">Correct</span>
                  </div>
                )}
                {isAnswered && showInstantFeedback && isSelected && !isOptionCorrect && (
                  <div className="flex items-center gap-1 text-rose-400 font-semibold text-xs bg-rose-500/20 border border-rose-500/40 px-2 py-1 rounded-lg">
                    <X className="w-4 h-4 stroke-[3]" />
                    <span className="hidden sm:inline">Wrong</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Immediate Interactive Feedback Card (Practice Mode) */}
      {isAnswered && showInstantFeedback && (
        <div
          className={`rounded-2xl p-4 sm:p-5 mb-6 border transition-all animate-pop ${
            isCorrect
              ? 'bg-gradient-to-r from-emerald-950/60 to-slate-900/90 border-emerald-500/40'
              : 'bg-gradient-to-r from-rose-950/60 to-slate-900/90 border-rose-500/40'
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`p-2 rounded-xl shrink-0 ${
                isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
              }`}
            >
              {isCorrect ? (
                <Sparkles className="w-5 h-5 text-emerald-400" />
              ) : (
                <Lightbulb className="w-5 h-5 text-amber-400" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h4
                className={`text-sm sm:text-base font-bold mb-1 ${
                  isCorrect ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {isCorrect
                  ? 'Correct Answer! Outstanding'
                  : `Incorrect — The correct answer is: (${question.correctAnswer})`}
              </h4>

              {/* Lecture Explanation Text */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {question.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer Navigation Bar */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          onClick={onPrev}
          disabled={isFirst}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-950/80 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="flex items-center gap-2">
          {/* If in exam mode and at the end */}
          {isExamMode && isLast && onFinishExam && (
            <button
              onClick={onFinishExam}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit Exam</span>
            </button>
          )}

          {/* Normal Next button */}
          {(!isExamMode || !isLast) && (
            <button
              onClick={onNext}
              disabled={isLast && !isExamMode}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg ${
                isAnswered && showInstantFeedback
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 hover:from-emerald-400 hover:to-teal-300 shadow-emerald-500/20'
                  : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              <span>{isLast ? 'Completed' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
