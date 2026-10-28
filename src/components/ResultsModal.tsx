import React, { useState } from 'react';
import { Award, RotateCcw, CheckCircle2, XCircle, Share2, BookOpen } from 'lucide-react';
import { Question, OptionKey } from '../types/quiz';
import { CATEGORIES } from '../data/questions';

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  answers: Record<number, OptionKey>;
  onRestart: () => void;
  onRetakeWrongOnly: (wrongQuestionIds: number[]) => void;
  onOpenStudyGuide: () => void;
}

export const ResultsModal: React.FC<ResultsModalProps> = ({
  isOpen,
  questions,
  answers,
  onRestart,
  onRetakeWrongOnly,
  onOpenStudyGuide,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'summary' | 'mistakes'>('summary');

  if (!isOpen) return null;

  // Calculate results
  let correctCount = 0;
  const mistakes: { question: Question; userAnswer: OptionKey }[] = [];

  questions.forEach((q) => {
    const userAns = answers[q.id];
    if (userAns === q.correctAnswer) {
      correctCount++;
    } else {
      mistakes.push({ question: q, userAnswer: userAns });
    }
  });

  const total = questions.length;
  const percentage = Math.round((correctCount / total) * 100);

  // Category breakdown
  const categoryStats = CATEGORIES.filter(c => c.id !== 'all').map((cat) => {
    const catQuestions = questions.filter(q => q.category === cat.id);
    const catCorrect = catQuestions.filter(q => answers[q.id] === q.correctAnswer).length;
    const catTotal = catQuestions.length;
    const catPercent = catTotal > 0 ? Math.round((catCorrect / catTotal) * 100) : 0;
    return {
      id: cat.id,
      label: cat.label,
      correct: catCorrect,
      total: catTotal,
      percent: catPercent,
    };
  });

  // Performance Assessment Title
  let gradeText = "Good Effort!";
  let gradeColor = "text-amber-400";
  let gradeBg = "bg-amber-500/10 border-amber-500/30";

  if (percentage >= 95) {
    gradeText = "Outstanding Master! (40+/41)";
    gradeColor = "text-emerald-400";
    gradeBg = "bg-emerald-500/15 border-emerald-500/40";
  } else if (percentage >= 85) {
    gradeText = "Excellent Lecture Mastery!";
    gradeColor = "text-teal-400";
    gradeBg = "bg-teal-500/15 border-teal-500/40";
  } else if (percentage >= 70) {
    gradeText = "Very Good!";
    gradeColor = "text-cyan-400";
    gradeBg = "bg-cyan-500/15 border-cyan-500/40";
  }

  const handleShare = () => {
    const text = `🏆 EcoMed Quiz Score: ${correctCount}/${total} (${percentage}%) - ${gradeText}\nTested on 41 Environmental & Public Health Questions!`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-pop">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header / Score showcase */}
        <div className="text-center pb-5 border-b border-slate-800">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-emerald-500/20 via-teal-500/20 to-cyan-500/20 border border-emerald-500/30 mb-3 text-emerald-400 shadow-lg">
            <Award className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Quiz Performance Report
          </h2>

          <div className={`inline-block px-4 py-1.5 rounded-full border mt-2 text-sm font-bold ${gradeBg} ${gradeColor}`}>
            {gradeText}
          </div>

          {/* Big Score Display */}
          <div className="flex items-baseline justify-center gap-2 mt-4 font-mono">
            <span className="text-5xl sm:text-6xl font-black text-white tabular-nums tracking-tight">
              {correctCount}
            </span>
            <span className="text-2xl text-slate-500 font-bold">/ {total}</span>
            <span className="text-2xl font-extrabold text-emerald-400 ml-2">
              ({percentage}%)
            </span>
          </div>
        </div>

        {/* Tab switch (Summary vs Mistakes) */}
        <div className="flex items-center gap-2 p-1 bg-slate-950/80 rounded-xl my-4 border border-slate-800 shrink-0">
          <button
            onClick={() => setActiveTab('summary')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'summary'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Topic Breakdown
          </button>
          <button
            onClick={() => setActiveTab('mistakes')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'mistakes'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Review Mistakes</span>
            <span className="px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-400 text-[11px] font-mono">
              {mistakes.length}
            </span>
          </button>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto flex-1 pr-1 space-y-4">
          {activeTab === 'summary' ? (
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Domain Mastery Breakdown
              </h4>

              {categoryStats.map((cat) => (
                <div
                  key={cat.id}
                  className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                    <span className="text-slate-200">{cat.label}</span>
                    <span className="font-mono text-emerald-400">
                      {cat.correct} / {cat.total} ({cat.percent}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        cat.percent === 100
                          ? 'bg-emerald-500'
                          : cat.percent >= 70
                          ? 'bg-teal-400'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${cat.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {mistakes.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">
                    Flawless 100%! Zero Mistakes 🎯
                  </h4>
                  <p className="text-xs text-slate-400">
                    You answered all 41 questions with 100% precision.
                  </p>
                </div>
              ) : (
                mistakes.map(({ question: q, userAnswer }) => (
                  <div
                    key={q.id}
                    className="p-4 rounded-2xl bg-slate-950/80 border border-rose-500/30 text-left"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-rose-400 mb-1">
                      <span>Question #{q.id}</span>
                      <span className="text-slate-500">{q.categoryLabel}</span>
                    </div>

                    <p className="text-sm font-bold text-slate-100 mb-2">
                      {q.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                      <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-center gap-2">
                        <XCircle className="w-4 h-4 shrink-0 text-rose-400" />
                        <span>
                          Your answer: <strong>({userAnswer || 'None'})</strong>
                        </span>
                      </div>
                      <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                        <span>
                          Correct: <strong>({q.correctAnswer}) {q.options.find(o => o.key === q.correctAnswer)?.text}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Explanation snippet */}
                    <p className="text-xs text-slate-400 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 leading-relaxed">
                      💡 {q.explanation}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2.5 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied!' : 'Share Result'}</span>
            </button>

            <button
              onClick={onOpenStudyGuide}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Study Bank</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {mistakes.length > 0 && (
              <button
                onClick={() => onRetakeWrongOnly(mistakes.map(m => m.question.id))}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/40 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Missed ({mistakes.length})</span>
              </button>
            )}

            <button
              onClick={onRestart}
              className="px-5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 hover:from-emerald-400 hover:to-teal-300 shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart Quiz</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
