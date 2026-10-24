import React, { useState, useEffect, useRef } from 'react';
import { Lock, Keyboard, Check, AlertCircle, Bot, Sparkles, Flame } from 'lucide-react';
import { NumericKeypad } from './NumericKeypad';
import { soundFx } from '../utils/sound';
import { Language, translations } from '../utils/translations';

interface PlayerCardProps {
  playerNumber: 1 | 2;
  playerName: string;
  score: number;
  streak: number;
  isLocked: boolean;
  lockTimeLeft: number;
  isAiBot?: boolean;
  aiThinking?: boolean;
  onSubmitAnswer: (answerVal: string) => void;
  isGameActive: boolean;
  roundStatus: 'playing' | 'p1_point' | 'p2_point' | 'time_up' | 'paused';
  showPointAnimation?: boolean;
  isFlipped?: boolean;
  wrongAttemptMsg?: string | null;
  currentLang?: Language;
  gameType?: 'math' | 'word';
  activeAppendedText?: string;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  playerNumber,
  playerName,
  score,
  streak,
  isLocked,
  lockTimeLeft,
  isAiBot = false,
  aiThinking = false,
  onSubmitAnswer,
  isGameActive,
  roundStatus,
  showPointAnimation = false,
  isFlipped = false,
  wrongAttemptMsg = null,
  currentLang = 'en',
  gameType = 'math',
  activeAppendedText,
}) => {
  const t = translations[currentLang] || translations.en;
  const [inputValue, setInputValue] = useState('');
  const [showKeypad, setShowKeypad] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isBlue = playerNumber === 1;

  // Clear input when round changes
  useEffect(() => {
    if (roundStatus === 'playing') {
      setInputValue('');
    }
  }, [roundStatus]);

  // Handle appended tile text
  useEffect(() => {
    if (activeAppendedText) {
      setInputValue((prev) => prev + activeAppendedText);
    }
  }, [activeAppendedText]);

  // Handle wrong answer shake
  useEffect(() => {
    if (wrongAttemptMsg) {
      setIsShaking(true);
      const timer = setTimeout(() => setIsShaking(false), 500);
      return () => clearTimeout(timer);
    }
  }, [wrongAttemptMsg]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLocked || roundStatus !== 'playing' || isAiBot) return;

    onSubmitAnswer(inputValue.trim());
    setInputValue('');
  };

  const handleDigit = (digit: string) => {
    if (isLocked || roundStatus !== 'playing' || isAiBot) return;
    if (inputValue.length < 15) {
      setInputValue((prev) => prev + digit);
    }
  };

  const handleClear = () => {
    setInputValue('');
  };

  const handleBackspace = () => {
    setInputValue((prev) => prev.slice(0, -1));
  };

  // Color Theme Classes
  const themeCardBorder = isBlue
    ? 'border-blue-500/60 shadow-blue-900/30'
    : 'border-red-500/60 shadow-red-900/30';

  const themeHeaderBg = isBlue
    ? 'bg-gradient-to-r from-blue-900/80 to-blue-950/80 border-blue-500/40 text-blue-200'
    : 'bg-gradient-to-r from-red-900/80 to-red-950/80 border-red-500/40 text-red-200';

  const themeScoreBadge = isBlue
    ? 'bg-blue-600 border-blue-400 text-white'
    : 'bg-red-600 border-red-400 text-white';

  const themeInputFocus = isBlue
    ? 'focus:border-blue-400 focus:ring-blue-500/40'
    : 'focus:border-red-400 focus:ring-red-500/40';

  const themeSubmitBtn = isBlue
    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-blue-600/30 border-blue-400/50'
    : 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-red-600/30 border-red-400/50';

  return (
    <div
      className={`w-full flex-1 flex flex-col justify-between p-3 sm:p-5 rounded-3xl border-2 backdrop-blur-xl bg-slate-900/85 relative transition-all duration-300 ${themeCardBorder} ${
        isShaking ? 'animate-shake border-rose-500' : ''
      } ${isFlipped ? 'rotate-180' : ''}`}
    >
      {/* Floating Point Particle Animation (+1) */}
      {showPointAnimation && (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-float-particle">
          <div className="flex items-center gap-1 px-4 py-2 rounded-2xl bg-emerald-500 text-white font-heading font-black text-3xl shadow-2xl border-2 border-white">
            <Sparkles className="w-7 h-7 text-yellow-300" />
            <span>+1 Point!</span>
          </div>
        </div>
      )}

      {/* Lock Overlay when locked due to wrong answer */}
      {isLocked && (
        <div className="absolute inset-0 z-40 bg-slate-950/90 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center p-4 text-center border-2 border-rose-500/80 animate-pulse-glow">
          <div className="w-14 h-14 rounded-full bg-rose-900/80 border-2 border-rose-500 flex items-center justify-center text-rose-300 mb-2">
            <Lock className="w-7 h-7 animate-bounce" />
          </div>
          <p className="text-xl font-heading font-black text-rose-400">{t.wrongAnswer}</p>
          <p className="text-xs text-slate-300 mt-1 font-medium">{t.inputLocked} {lockTimeLeft}s</p>
          <div className="mt-3 px-3 py-1 bg-rose-950 border border-rose-500/50 rounded-full text-rose-200 font-mono text-sm font-bold">
            00:0{lockTimeLeft}
          </div>
        </div>
      )}

      {/* Top Player Info Card Header */}
      <div className={`p-3 rounded-2xl border flex items-center justify-between gap-2 shadow-lg ${themeHeaderBg}`}>
        <div className="flex items-center gap-2.5">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-inner ${
            isBlue ? 'bg-blue-950 text-cyan-300 border border-blue-400/40' : 'bg-red-950 text-rose-300 border border-red-400/40'
          }`}>
            {isAiBot ? <Bot className="w-6 h-6 text-rose-400" /> : `P${playerNumber}`}
          </div>
          <div>
            <h2 className="font-heading font-extrabold text-base sm:text-lg text-white leading-tight flex items-center gap-1">
              <span>{playerName}</span>
              {isAiBot && <span className="text-[10px] bg-rose-950 border border-rose-500/40 text-rose-300 px-1.5 py-0.2 rounded">BOT</span>}
            </h2>
            <div className="flex items-center gap-2 text-xs font-medium opacity-80">
              <span>{isBlue ? t.blueTeam : t.redTeam}</span>
              {streak >= 2 && (
                <span className="flex items-center gap-0.5 text-amber-300 font-bold bg-amber-950/60 px-1.5 py-0.2 rounded-full border border-amber-500/30">
                  <Flame className="w-3 h-3 fill-current" /> {streak} {t.streak}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Score Counter */}
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{t.score}</span>
          <div className={`px-3 py-1 rounded-xl border font-mono font-black text-xl sm:text-2xl shadow-md ${themeScoreBadge}`}>
            {score}
          </div>
        </div>
      </div>

      {/* Center Input / Interaction Area */}
      <div className="my-3 sm:my-5 flex flex-col gap-3">
        {isAiBot ? (
          /* AI Bot Mode View */
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-6 text-center flex flex-col items-center justify-center min-h-[140px]">
            {aiThinking ? (
              <div className="flex flex-col items-center gap-2 animate-pulse">
                <Bot className="w-10 h-10 text-rose-400 animate-spin-slow" />
                <span className="text-sm font-semibold text-rose-300">{t.botThinking}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1 text-slate-400">
                <Bot className="w-8 h-8 text-slate-500" />
                <span className="text-xs">{t.botReady}</span>
              </div>
            )}
          </div>
        ) : (
          /* Human Player Input Form */
          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
            <div className="relative">
              <input
                ref={inputRef}
                type={gameType === 'word' ? 'text' : 'number'}
                pattern={gameType === 'math' ? '[0-9]*' : undefined}
                inputMode={gameType === 'math' ? 'numeric' : 'text'}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t.enterYourAnswer}
                disabled={isLocked || roundStatus !== 'playing'}
                className={`w-full bg-slate-950/90 border-2 border-slate-700 rounded-2xl px-4 py-3 sm:py-4 font-mono font-bold text-2xl sm:text-3xl text-center text-white placeholder:text-slate-600 placeholder:text-base outline-none transition-all shadow-inner ${themeInputFocus} ${
                  isLocked ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 rounded-lg bg-slate-800 text-xs text-slate-400 hover:text-white"
                >
                  {t.clear}
                </button>
              )}
            </div>

            {/* Main Submit Button */}
            <button
              type="submit"
              disabled={!inputValue.trim() || isLocked || roundStatus !== 'playing'}
              className={`w-full py-3.5 sm:py-4 rounded-2xl border font-heading font-black text-lg sm:text-xl tracking-wide flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98 ${themeSubmitBtn} ${
                !inputValue.trim() || isLocked || roundStatus !== 'playing'
                  ? 'opacity-40 cursor-not-allowed grayscale'
                  : ''
              }`}
            >
              <span>{t.submitAnswer}</span>
              <Check className="w-6 h-6 stroke-[3]" />
            </button>
          </form>
        )}

        {/* Wrong Attempt Message */}
        {wrongAttemptMsg && !isLocked && (
          <div className="flex items-center gap-1.5 text-xs text-rose-400 font-bold bg-rose-950/50 border border-rose-500/30 p-2 rounded-xl">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{wrongAttemptMsg}</span>
          </div>
        )}
      </div>

      {/* On-Screen Keypad toggle button for phone/tablet */}
      {!isAiBot && gameType === 'math' && (
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-1">
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setShowKeypad(!showKeypad);
              }}
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-colors ${
                isBlue
                  ? 'bg-blue-950/60 border-blue-500/30 text-blue-300 hover:bg-blue-900/60'
                  : 'bg-red-950/60 border-red-500/30 text-red-300 hover:bg-red-900/60'
              }`}
            >
              <Keyboard className="w-3.5 h-3.5" />
              <span>{showKeypad ? t.hideKeypad : t.openKeypad}</span>
            </button>
          </div>

          {showKeypad && (
            <div className="mt-2">
              <NumericKeypad
                theme={isBlue ? 'blue' : 'red'}
                disabled={isLocked || roundStatus !== 'playing'}
                onDigit={handleDigit}
                onClear={handleClear}
                onBackspace={handleBackspace}
                onSubmit={handleSubmit}
                onClose={() => setShowKeypad(false)}
                currentLang={currentLang}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
