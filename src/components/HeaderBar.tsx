import React from 'react';
import { Volume2, VolumeX, Pause, Play, RotateCcw, Settings, Zap, Languages, Instagram } from 'lucide-react';
import { soundFx } from '../utils/sound';
import { Language, translations } from '../utils/translations';

interface HeaderBarProps {
  currentRound: number;
  totalRounds: number;
  difficulty: 'easy' | 'medium' | 'hard';
  isPaused: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  onTogglePause: () => void;
  onRestart: () => void;
  onOpenSettings: () => void;
  isGameActive: boolean;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  instagramHandle?: string;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  currentRound,
  totalRounds,
  difficulty,
  isPaused,
  isMuted,
  onToggleMute,
  onTogglePause,
  onRestart,
  onOpenSettings,
  isGameActive,
  currentLang,
  onLanguageChange,
  instagramHandle,
}) => {
  const t = translations[currentLang] || translations.en;

  const difficultyBadge = {
    easy: { text: t.easy, color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
    medium: { text: t.medium, color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
    hard: { text: t.hard, color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
  }[difficulty];

  const cycleLanguage = () => {
    soundFx.playClick();
    const order: Language[] = ['en', 'hinglish', 'hi'];
    const nextIdx = (order.indexOf(currentLang) + 1) % order.length;
    onLanguageChange(order[nextIdx]);
  };

  const langLabelMap: Record<Language, string> = {
    en: 'EN',
    hinglish: 'Hinglish',
    hi: 'हिंदी',
  };

  // Instagram clean URL
  const instaUsername = instagramHandle ? instagramHandle.replace(/^@/, '') : '';
  const instaUrl = instaUsername ? `https://instagram.com/${instaUsername}` : null;

  return (
    <header className="w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2 sm:gap-4 sticky top-0 z-40 shadow-xl">
      {/* Zone 1: Brand Wordmark & Optional Instagram Badge */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-cyan-500/20">
          <Zap className="w-5 h-5 fill-current" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-base sm:text-lg font-heading font-extrabold tracking-tight text-white whitespace-nowrap">
            {t.appTitle} <span className="text-cyan-400 text-sm sm:text-base font-normal">{t.appTitleSub}</span>
          </h1>
        </div>

        {/* Instagram Profile Badge in Header */}
        {instaUrl ? (
          <a
            href={instaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-amber-500/30 border border-pink-500/40 text-pink-300 text-xs font-semibold hover:scale-105 transition-all"
            title="Open Instagram Profile"
          >
            <Instagram className="w-3.5 h-3.5 text-pink-400" />
            <span>{instagramHandle}</span>
          </a>
        ) : null}
      </div>

      {/* Zone 2: Round & Difficulty info */}
      {isGameActive ? (
        <div className="hidden sm:flex items-center gap-3">
          <div className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono font-semibold text-slate-200">
            {t.rounds} <span className="text-cyan-400">{currentRound}</span> / {totalRounds}
          </div>
          <span className={`px-2.5 py-0.5 rounded-full border text-xs font-semibold ${difficultyBadge.color}`}>
            {difficultyBadge.text}
          </span>
        </div>
      ) : (
        <div className="hidden md:block text-xs text-slate-400 font-medium">
          {t.appSubtitle}
        </div>
      )}

      {/* Zone 3: Quick Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Instagram direct button if set */}
        {instaUrl && (
          <a
            href={instaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="lg:hidden p-2 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-500 text-white shadow-md transition-transform active:scale-95 flex items-center justify-center"
            title={`Open Instagram: ${instagramHandle}`}
          >
            <Instagram className="w-4 h-4" />
          </a>
        )}

        {/* Language Switcher Button */}
        <button
          type="button"
          onClick={cycleLanguage}
          className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-colors flex items-center gap-1.5 text-xs font-bold"
          title={t.langSelectLabel}
        >
          <Languages className="w-4 h-4 text-cyan-400" />
          <span>{langLabelMap[currentLang]}</span>
        </button>

        {/* Audio Toggle */}
        <button
          type="button"
          onClick={onToggleMute}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
        </button>

        {isGameActive && (
          <>
            <button
              type="button"
              onClick={onTogglePause}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title={isPaused ? t.resumeGame : t.gamePaused}
            >
              {isPaused ? (
                <>
                  <Play className="w-4 h-4 text-emerald-400 fill-current" />
                  <span className="hidden md:inline">{t.resumeGame}</span>
                </>
              ) : (
                <>
                  <Pause className="w-4 h-4 text-amber-400 fill-current" />
                  <span className="hidden md:inline">{t.gamePaused}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                onRestart();
              }}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title={t.restart}
            >
              <RotateCcw className="w-4 h-4 text-cyan-400" />
              <span className="hidden md:inline">{t.restart}</span>
            </button>
          </>
        )}

        <button
          type="button"
          onClick={() => {
            soundFx.playClick();
            onOpenSettings();
          }}
          className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-cyan-600/20"
          title={t.settings}
        >
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">{t.settings}</span>
        </button>
      </div>
    </header>
  );
};
