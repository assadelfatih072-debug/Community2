import React, { useState, useMemo } from 'react';
import { Search, Eye, EyeOff, Bookmark, CheckCircle2, Sparkles } from 'lucide-react';
import { Question, CategoryId } from '../types/quiz';
import { CATEGORIES } from '../data/questions';

interface StudyGuideViewProps {
  questions: Question[];
  bookmarks: number[];
  onToggleBookmark: (id: number) => void;
}

export const StudyGuideView: React.FC<StudyGuideViewProps> = ({
  questions,
  bookmarks,
  onToggleBookmark,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [showAllAnswers, setShowAllAnswers] = useState(true);
  const [revealedIds, setRevealedIds] = useState<Record<number, boolean>>({});
  const [filterBookmarkedOnly, setFilterBookmarkedOnly] = useState(false);

  // Toggle reveal for a single question
  const toggleSingleReveal = (id: number) => {
    setRevealedIds(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filtered list
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      // Category filter
      if (selectedCategory !== 'all' && q.category !== selectedCategory) {
        return false;
      }
      // Bookmark filter
      if (filterBookmarkedOnly && !bookmarks.includes(q.id)) {
        return false;
      }
      // Search term
      if (searchTerm.trim() !== '') {
        const term = searchTerm.toLowerCase();
        const inEn = q.question.toLowerCase().includes(term);
        const inExpl = q.explanation.toLowerCase().includes(term);
        const inOptions = q.options.some(o => o.text.toLowerCase().includes(term));
        const inId = String(q.id) === term;
        return inEn || inExpl || inOptions || inId;
      }
      return true;
    });
  }, [questions, selectedCategory, filterBookmarkedOnly, searchTerm, bookmarks]);

  return (
    <div className="w-full space-y-6">
      {/* Top Banner / Filter Toolbar */}
      <div className="p-4 sm:p-6 bg-slate-900/90 border border-slate-800 rounded-3xl backdrop-blur-md shadow-xl">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-display flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span>Comprehensive Study Bank (41 Questions)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Browse all 41 verified questions with answer keys and complete lecture rationales
            </p>
          </div>

          {/* Action toggles */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setShowAllAnswers(!showAllAnswers)}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all ${
                showAllAnswers
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              {showAllAnswers ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{showAllAnswers ? 'Hide Answers' : 'Reveal Answers'}</span>
            </button>

            <button
              onClick={() => setFilterBookmarkedOnly(!filterBookmarkedOnly)}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all ${
                filterBookmarkedOnly
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${filterBookmarkedOnly ? 'fill-amber-400' : ''}`} />
              <span>Bookmarked ({bookmarks.length})</span>
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions, terms, pathogens (e.g. turbidity, radiation, dengue, lyme, NTU, E. coli)..."
            className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all"
          />
        </div>

        {/* Categories Tab Pill Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-purple-500 text-white font-bold shadow-md shadow-purple-500/20'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 px-2">
          <span>
            Showing {filteredQuestions.length} of {questions.length} questions
          </span>
        </div>

        {filteredQuestions.length === 0 ? (
          <div className="p-8 text-center bg-slate-900/60 rounded-3xl border border-slate-800">
            <p className="text-sm text-slate-400">
              No matching questions found.
            </p>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isRevealed = showAllAnswers || !!revealedIds[q.id];
            const isBookmarked = bookmarks.includes(q.id);

            return (
              <div
                key={q.id}
                className="p-5 sm:p-6 bg-slate-900/80 border border-slate-800 rounded-3xl shadow-lg hover:border-slate-700/80 transition-all text-left"
              >
                {/* Header */}
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-purple-400">
                      #{q.id}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {q.categoryLabel}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => toggleSingleReveal(q.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      title={isRevealed ? 'Hide Answer' : 'Show Answer'}
                    >
                      {isRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-purple-400" />}
                    </button>

                    <button
                      onClick={() => onToggleBookmark(q.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isBookmarked
                          ? 'text-amber-400 bg-amber-500/10'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* English Question */}
                <h3 className="text-base sm:text-lg font-bold text-white mb-3">
                  {q.question}
                </h3>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-3">
                  {q.options.map((opt) => {
                    const isCorrect = opt.key === q.correctAnswer;
                    return (
                      <div
                        key={opt.key}
                        className={`p-2.5 rounded-xl border text-xs sm:text-sm flex items-center justify-between transition-colors ${
                          isRevealed && isCorrect
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-100 font-semibold shadow-sm'
                            : 'bg-slate-950/50 border-slate-800/80 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className={`w-6 h-6 rounded-md flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                              isRevealed && isCorrect
                                ? 'bg-emerald-500 text-slate-950'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {opt.key}
                          </span>
                          <span className="truncate">
                            {opt.text}
                          </span>
                        </div>
                        {isRevealed && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-1.5" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Card */}
                {isRevealed && (
                  <div className="mt-3 p-3.5 rounded-2xl bg-slate-950/70 border border-emerald-500/30 text-xs text-slate-300 space-y-1 animate-pop">
                    <p className="font-bold text-emerald-400">
                      ✓ Correct Answer: ({q.correctAnswer})
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                      {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
