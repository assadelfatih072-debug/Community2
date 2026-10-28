import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { QUESTIONS_DATA } from './data/questions';
import { OptionKey, QuizMode } from './types/quiz';
import { Navbar } from './components/Navbar';
import { ScoreRibbon } from './components/ScoreRibbon';
import { QuestionCard } from './components/QuestionCard';
import { QuestionNavigator } from './components/QuestionNavigator';
import { ResultsModal } from './components/ResultsModal';
import { StudyGuideView } from './components/StudyGuideView';
import { soundManager } from './utils/soundEffects';
import { fireCorrectConfetti, fireGrandCelebration } from './utils/confetti';
import { Award } from 'lucide-react';

export default function App() {
  const [questionsList, setQuestionsList] = useState(QUESTIONS_DATA);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, OptionKey>>({});
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [scoreXP, setScoreXP] = useState(0);
  const [mode, setMode] = useState<QuizMode>('practice');
  const [isMuted, setIsMuted] = useState(soundManager.isMuted());
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false);
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('ecomed_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Speed Mode Timer: 15s per question
  const [speedTimer, setSpeedTimer] = useState<number | null>(null);

  // Active question
  const currentQuestion = questionsList[currentIndex] || questionsList[0];
  const isAnswered = answers[currentQuestion?.id] !== undefined;
  const selectedAnswer = answers[currentQuestion?.id] || null;

  // Save bookmarks
  const toggleBookmark = (id: number) => {
    setBookmarks((prev) => {
      const next = prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id];
      try {
        localStorage.setItem('ecomed_bookmarks', JSON.stringify(next));
      } catch {
        // Ignore
      }
      return next;
    });
  };

  // Sound toggle
  const handleToggleMute = () => {
    const nextMuted = soundManager.toggleMute();
    setIsMuted(nextMuted);
  };

  // Reset quiz
  const handleReset = useCallback(() => {
    setQuestionsList(QUESTIONS_DATA);
    setCurrentIndex(0);
    setAnswers({});
    setStreak(0);
    setScoreXP(0);
    setIsResultsOpen(false);
  }, []);

  // Filter to retake only missed questions
  const handleRetakeWrongOnly = useCallback((wrongIds: number[]) => {
    const missed = QUESTIONS_DATA.filter((q) => wrongIds.includes(q.id));
    if (missed.length > 0) {
      setQuestionsList(missed);
      setCurrentIndex(0);
      setAnswers({});
      setStreak(0);
      setIsResultsOpen(false);
      setMode('practice');
    }
  }, []);

  // Answer handler
  const handleSelectOption = useCallback(
    (key: OptionKey) => {
      if (!currentQuestion) return;

      // In practice & speed mode: once answered, cannot re-click in current turn
      if ((mode === 'practice' || mode === 'speed') && isAnswered) return;

      const isCorrect = key === currentQuestion.correctAnswer;

      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: key,
      }));

      if (mode === 'practice' || mode === 'speed') {
        if (isCorrect) {
          soundManager.playCorrect();
          fireCorrectConfetti(0.5, 0.55);

          const newStreak = streak + 1;
          setStreak(newStreak);
          if (newStreak > longestStreak) {
            setLongestStreak(newStreak);
          }

          if (newStreak >= 3) {
            soundManager.playStreak(newStreak);
          }

          setScoreXP((prev) => prev + 100 + newStreak * 25);
        } else {
          soundManager.playWrong();
          setStreak(0);
        }
      } else {
        // Exam mode: soft click feedback
        soundManager.playClick();
      }
    },
    [currentQuestion, isAnswered, mode, streak, longestStreak]
  );

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (currentIndex < questionsList.length - 1) {
      setCurrentIndex((i) => i + 1);
      if (mode === 'speed') {
        setSpeedTimer(15);
      }
    } else if (mode === 'exam' || mode === 'speed') {
      setIsResultsOpen(true);
      soundManager.playVictory();
      fireGrandCelebration();
    }
  }, [currentIndex, questionsList.length, mode]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  // Speed blitz timer countdown effect
  useEffect(() => {
    if (mode !== 'speed' || isAnswered || isResultsOpen) {
      setSpeedTimer(null);
      return;
    }

    if (speedTimer === null) {
      setSpeedTimer(15);
      return;
    }

    if (speedTimer <= 0) {
      // Time is up! Auto-mark wrong and move on
      soundManager.playWrong();
      setStreak(0);
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: 'A', // Fallback default on timeout
      }));
      return;
    }

    const timer = setInterval(() => {
      setSpeedTimer((t) => (t !== null && t > 0 ? t - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [mode, speedTimer, isAnswered, currentQuestion?.id, isResultsOpen]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (['a', 'A', '1'].includes(e.key)) {
        handleSelectOption('A');
      } else if (['b', 'B', '2'].includes(e.key)) {
        handleSelectOption('B');
      } else if (['c', 'C', '3'].includes(e.key)) {
        handleSelectOption('C');
      } else if (['d', 'D', '4'].includes(e.key)) {
        handleSelectOption('D');
      } else if (e.key === 'm' || e.key === 'M') {
        handleToggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, handleSelectOption]);

  // Compute metrics
  const correctCount = useMemo(() => {
    return questionsList.filter((q) => answers[q.id] === q.correctAnswer).length;
  }, [questionsList, answers]);

  const wrongCount = useMemo(() => {
    return questionsList.filter((q) => answers[q.id] && answers[q.id] !== q.correctAnswer).length;
  }, [questionsList, answers]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        mode={mode}
        setMode={(m) => {
          setMode(m);
          if (m === 'speed') setSpeedTimer(15);
        }}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onReset={handleReset}
      />

      {/* Sub-header Strip */}
      <div className="w-full bg-gradient-to-b from-slate-900/60 to-transparent border-b border-slate-900/80 py-3 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-slate-300">
              41 Questions · Environmental Health, Water Quality, Radiation &amp; Medical Entomology
            </span>
          </div>

          <button
            onClick={() => setIsResultsOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors shrink-0 font-medium cursor-pointer"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Score Report</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 sm:py-8 flex flex-col gap-6">
        {mode === 'study' ? (
          // Comprehensive Study Bank / Flashcards View
          <StudyGuideView
            questions={QUESTIONS_DATA}
            bookmarks={bookmarks}
            onToggleBookmark={toggleBookmark}
          />
        ) : (
          // Active Interactive Quiz View
          <>
            {/* Score Ribbon & Live Progress */}
            <ScoreRibbon
              currentIndex={currentIndex}
              totalQuestions={questionsList.length}
              currentQuestion={currentQuestion}
              correctCount={correctCount}
              wrongCount={wrongCount}
              streak={streak}
              longestStreak={longestStreak}
              scoreXP={scoreXP}
              onOpenNavigator={() => setIsNavigatorOpen(true)}
              isBookmarked={bookmarks.includes(currentQuestion?.id)}
              onToggleBookmark={() => toggleBookmark(currentQuestion?.id)}
              timeLeft={mode === 'speed' ? speedTimer : null}
            />

            {/* Central Question Card */}
            {currentQuestion && (
              <QuestionCard
                question={currentQuestion}
                selectedAnswer={selectedAnswer}
                onSelectOption={handleSelectOption}
                onNext={handleNext}
                onPrev={handlePrev}
                isFirst={currentIndex === 0}
                isLast={currentIndex === questionsList.length - 1}
                isAnswered={isAnswered}
                showInstantFeedback={mode === 'practice' || mode === 'speed'}
                isExamMode={mode === 'exam'}
                onFinishExam={() => {
                  setIsResultsOpen(true);
                  soundManager.playVictory();
                  fireGrandCelebration();
                }}
              />
            )}

            {/* Quick Keyboard shortcuts hint */}
            <div className="hidden sm:flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-2">
              <span>Keys: <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">A</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">B</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">C</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">D</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">1–4</kbd></span>
              <span>·</span>
              <span>Navigate: <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">→</kbd></span>
              <span>·</span>
              <span>Mute: <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">M</kbd></span>
            </div>
          </>
        )}
      </main>

      {/* 1-41 Interactive Matrix Modal */}
      <QuestionNavigator
        isOpen={isNavigatorOpen}
        onClose={() => setIsNavigatorOpen(false)}
        questions={questionsList}
        currentIndex={currentIndex}
        onSelectQuestion={(idx) => setCurrentIndex(idx)}
        answers={answers}
        bookmarks={bookmarks}
        showInstantFeedback={mode === 'practice' || mode === 'speed'}
      />

      {/* Results & Review Modal */}
      <ResultsModal
        isOpen={isResultsOpen}
        onClose={() => setIsResultsOpen(false)}
        questions={questionsList}
        answers={answers}
        onRestart={handleReset}
        onRetakeWrongOnly={handleRetakeWrongOnly}
        onOpenStudyGuide={() => {
          setIsResultsOpen(false);
          setMode('study');
        }}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 py-4 px-6 text-center text-xs text-slate-500">
        <p>
          EcoMed Interactive Medical &amp; Environmental Health Study Engine · 41 Solved Standard Questions
        </p>
      </footer>
    </div>
  );
}
