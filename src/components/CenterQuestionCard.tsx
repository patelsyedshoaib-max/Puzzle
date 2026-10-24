import React from 'react';
import { MathQuestion, Difficulty } from '../utils/mathGenerator';
import { WordQuestion } from '../utils/wordGenerator';
import { WordPuzzleDisplay } from './WordPuzzleDisplay';
import { Timer, HelpCircle, Swords, CheckCircle2, XCircle } from 'lucide-react';
import { Language, translations } from '../utils/translations';

interface CenterQuestionCardProps {
  gameType: 'math' | 'word';
  mathQuestion: MathQuestion | null;
  wordQuestion: WordQuestion | null;
  difficulty: Difficulty;
  timeLeft: number;
  maxTime: number;
  currentRound: number;
  totalRounds: number;
  roundStatus: 'playing' | 'p1_point' | 'p2_point' | 'time_up' | 'paused';
  winnerName?: string;
  correctAnswerToShow?: string | number;
  currentLang: Language;
  onTileClick?: (letter: string) => void;
}

export const CenterQuestionCard: React.FC<CenterQuestionCardProps> = ({
  gameType,
  mathQuestion,
  wordQuestion,
  difficulty,
  timeLeft,
  maxTime,
  currentRound,
  totalRounds,
  roundStatus,
  winnerName,
  correctAnswerToShow,
  currentLang,
  onTileClick,
}) => {
  const t = translations[currentLang] || translations.en;
  const progressPercent = Math.max(0, Math.min(100, (timeLeft / maxTime) * 100));

  // Determine timer color based on time left
  let timerColor = 'bg-emerald-500 shadow-emerald-500/50';
  let timerTextColor = 'text-emerald-400';

  if (timeLeft <= 5) {
    timerColor = 'bg-rose-500 shadow-rose-500/50 animate-pulse';
    timerTextColor = 'text-rose-400 animate-pulse';
  } else if (timeLeft <= 10) {
    timerColor = 'bg-amber-500 shadow-amber-500/50';
    timerTextColor = 'text-amber-400';
  }

  const categoryTitle = gameType === 'word'
    ? (wordQuestion?.categoryName || t.wordPuzzleCategory)
    : (mathQuestion?.categoryName || t.categoryAddition);

  // Difficulty badge styling: Green for Easy, Yellow/Amber for Medium, Red for Hard
  const diffBadgeClass = {
    easy: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-emerald-500/20',
    medium: 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-amber-500/20',
    hard: 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-rose-500/20',
  }[difficulty];

  const diffBadgeText = {
    easy: t.easy,
    medium: t.medium,
    hard: t.hard,
  }[difficulty];

  return (
    <div className="w-full max-w-xl mx-auto my-2 px-3 z-30">
      <div className="bg-slate-900/95 border-2 border-slate-700/80 rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden transition-all">
        {/* Background Ambient Glow */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header Row: Round, Color-Coded Difficulty Badge & Category */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-xs font-bold text-slate-200">
            <Swords className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.rounds} {currentRound} / {totalRounds}</span>
          </div>

          {/* Color-Coded Difficulty Badge (Green for Easy, Yellow for Medium, Red for Hard) */}
          <div className={`px-2.5 py-0.5 rounded-full border text-xs font-bold shadow-sm ${diffBadgeClass}`}>
            {diffBadgeText}
          </div>

          <div className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{categoryTitle}</span>
          </div>
        </div>

        {/* Center Main Question Display Box */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 sm:p-6 my-2 text-center relative shadow-inner flex flex-col items-center justify-center min-h-[130px] sm:min-h-[150px]">
          {roundStatus === 'playing' || roundStatus === 'paused' ? (
            gameType === 'word' && wordQuestion ? (
              <WordPuzzleDisplay wordQuestion={wordQuestion} onTileClick={onTileClick} />
            ) : mathQuestion ? (
              <>
                <div className="text-3xl sm:text-5xl font-mono font-black tracking-wider text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  {mathQuestion.expressionText}
                </div>
                {mathQuestion.hintText && (
                  <div className="mt-2 text-xs text-amber-300 font-medium bg-amber-950/50 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                    💡 {mathQuestion.hintText}
                  </div>
                )}
              </>
            ) : null
          ) : roundStatus === 'p1_point' || roundStatus === 'p2_point' ? (
            <div className="flex flex-col items-center justify-center animate-bounce-short">
              <div className="flex items-center gap-2 text-emerald-400 text-xl sm:text-2xl font-heading font-extrabold mb-1">
                <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                <span>{t.correctAnswer}</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-slate-200">
                🎉 <span className={roundStatus === 'p1_point' ? 'text-blue-400' : 'text-rose-400'}>{winnerName}</span> {t.answeredCorrectlyFirst}
              </p>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Answer: <span className="text-emerald-400 font-bold text-sm">{correctAnswerToShow}</span>
              </p>
            </div>
          ) : (
            /* Time Up State */
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-2 text-rose-400 text-xl sm:text-2xl font-heading font-extrabold mb-1">
                <XCircle className="w-7 h-7 text-rose-400" />
                <span>{t.timesUp}</span>
              </div>
              <p className="text-sm sm:text-base font-semibold text-slate-300">
                {t.nobodyAnswered}
              </p>
              <p className="text-sm font-bold text-slate-200 mt-1">
                {t.theCorrectAnswerWas} <span className="text-amber-400 font-mono text-xl">{correctAnswerToShow}</span>
              </p>
            </div>
          )}
        </div>

        {/* Question Countdown Bar & Counter */}
        <div className="mt-3">
          <div className="flex justify-between items-center text-xs font-bold mb-1 px-1">
            <span className="flex items-center gap-1 text-slate-400">
              <Timer className="w-3.5 h-3.5" />
              <span>{t.timeRemaining}</span>
            </span>
            <span className={`font-mono text-sm ${timerTextColor}`}>
              {timeLeft}s
            </span>
          </div>

          <div className="w-full h-3 bg-slate-950 rounded-full border border-slate-800 p-0.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${timerColor}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
