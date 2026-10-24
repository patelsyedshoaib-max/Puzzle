import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RefreshCw, Settings, Instagram, Copy, Check, ExternalLink } from 'lucide-react';
import { soundFx } from '../utils/sound';
import { Language, translations } from '../utils/translations';

export interface PlayerStats {
  name: string;
  score: number;
  correctCount: number;
  wrongCount: number;
  fastestTimeSec: number | null;
  maxStreak: number;
}

interface WinnerModalProps {
  p1Stats: PlayerStats;
  p2Stats: PlayerStats;
  totalRounds: number;
  difficulty: string;
  onPlayAgain: () => void;
  onChangeSettings: () => void;
  currentLang?: Language;
  instagramHandle?: string;
}

export const WinnerModal: React.FC<WinnerModalProps> = ({
  p1Stats,
  p2Stats,
  totalRounds,
  difficulty,
  onPlayAgain,
  onChangeSettings,
  currentLang = 'en',
  instagramHandle,
}) => {
  const t = translations[currentLang] || translations.en;
  const isDraw = p1Stats.score === p2Stats.score;
  const isP1Winner = p1Stats.score > p2Stats.score;
  const winnerName = isDraw ? null : isP1Winner ? p1Stats.name : p2Stats.name;

  const [copiedInsta, setCopiedInsta] = useState(false);

  const instaUsername = instagramHandle ? instagramHandle.replace(/^@/, '') : '';
  const instaUrl = instaUsername ? `https://instagram.com/${instaUsername}` : null;

  useEffect(() => {
    // Play victory sound
    soundFx.playVictory();

    // Trigger confetti celebration
    try {
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#06b6d4', '#3b82f6', '#ec4899', '#f59e0b'],
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#06b6d4', '#3b82f6', '#ec4899', '#f59e0b'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    } catch {
      // Ignore confetti fallback
    }
  }, []);

  const handleCopyStoryScore = () => {
    soundFx.playClick();
    const resultMsg = isDraw
      ? `🤝 Match Tied! ${p1Stats.name} (${p1Stats.score} pts) vs ${p2Stats.name} (${p2Stats.score} pts)`
      : `👑 ${winnerName} Wins Math Battle! (${p1Stats.name} ${p1Stats.score} - ${p2Stats.score} ${p2Stats.name})`;

    const shareText = `⚡ Math Battle – Speed Quiz ⚡\n${resultMsg}\nDifficulty: ${difficulty.toUpperCase()} · ${totalRounds} Rounds\n${
      instagramHandle ? `Follow on Insta: ${instagramHandle}\n` : ''
    }Play now!`;

    navigator.clipboard.writeText(shareText);
    setCopiedInsta(true);
    setTimeout(() => setCopiedInsta(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-2xl bg-slate-900 border-2 border-slate-700 rounded-3xl p-5 sm:p-8 shadow-2xl my-auto text-center relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Trophy Icon Header */}
        <div className="relative inline-block mb-3">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-300 p-0.5 shadow-2xl shadow-amber-500/40 flex items-center justify-center animate-bounce-short">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
              <Trophy className="w-12 h-12 text-amber-400 fill-amber-400/20" />
            </div>
          </div>
        </div>

        {/* Winner Title Announcement */}
        {isDraw ? (
          <div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-amber-300">
              🤝 {t.matchTied}
            </h2>
            <p className="text-slate-300 text-sm mt-1 font-semibold">
              {t.bothScoredEqually}
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white">
              🎉 <span className={isP1Winner ? 'text-cyan-400' : 'text-rose-400'}>{winnerName}</span> {t.wins}
            </h2>
            <p className="text-amber-300 text-base font-bold mt-1">
              👑 Math Champion of the Match!
            </p>
          </div>
        )}

        {/* Scoreboard Comparison Table */}
        <div className="my-5 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-inner">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            {t.matchStats} ({totalRounds} {t.rounds} · {difficulty.toUpperCase()})
          </div>

          <div className="grid grid-cols-3 gap-2 items-center text-xs sm:text-sm">
            {/* Player 1 Column */}
            <div className={`p-3 rounded-xl border flex flex-col items-center ${
              isP1Winner ? 'bg-blue-950/80 border-blue-400/60 ring-2 ring-blue-500/30' : 'bg-slate-900 border-slate-800'
            }`}>
              <span className="font-heading font-extrabold text-blue-300 text-sm sm:text-base truncate max-w-[120px]">
                {p1Stats.name}
              </span>
              <span className="font-mono font-black text-2xl sm:text-3xl text-white mt-1">
                {p1Stats.score} <span className="text-xs font-normal text-slate-400">pts</span>
              </span>
            </div>

            {/* VS Divider */}
            <div className="font-heading font-black text-lg text-slate-500">
              VS
            </div>

            {/* Player 2 Column */}
            <div className={`p-3 rounded-xl border flex flex-col items-center ${
              !isDraw && !isP1Winner ? 'bg-red-950/80 border-red-400/60 ring-2 ring-red-500/30' : 'bg-slate-900 border-slate-800'
            }`}>
              <span className="font-heading font-extrabold text-rose-300 text-sm sm:text-base truncate max-w-[120px]">
                {p2Stats.name}
              </span>
              <span className="font-mono font-black text-2xl sm:text-3xl text-white mt-1">
                {p2Stats.score} <span className="text-xs font-normal text-slate-400">pts</span>
              </span>
            </div>
          </div>

          {/* Detailed Stat Rows */}
          <div className="mt-4 space-y-2 border-t border-slate-800 pt-3 text-xs sm:text-sm">
            <div className="flex justify-between items-center py-1 px-2 rounded hover:bg-slate-900/50">
              <span className="text-blue-300 font-bold font-mono">{p1Stats.correctCount}</span>
              <span className="text-slate-400 font-medium">{t.correctAnswersCount}</span>
              <span className="text-rose-300 font-bold font-mono">{p2Stats.correctCount}</span>
            </div>

            <div className="flex justify-between items-center py-1 px-2 rounded hover:bg-slate-900/50">
              <span className="text-blue-300 font-bold font-mono">{p1Stats.wrongCount}</span>
              <span className="text-slate-400 font-medium">{t.wrongAttemptsCount}</span>
              <span className="text-rose-300 font-bold font-mono">{p2Stats.wrongCount}</span>
            </div>

            <div className="flex justify-between items-center py-1 px-2 rounded hover:bg-slate-900/50">
              <span className="text-blue-300 font-bold font-mono">
                {p1Stats.fastestTimeSec ? `${p1Stats.fastestTimeSec.toFixed(1)}s` : '-'}
              </span>
              <span className="text-slate-400 font-medium">{t.fastestSpeed}</span>
              <span className="text-rose-300 font-bold font-mono">
                {p2Stats.fastestTimeSec ? `${p2Stats.fastestTimeSec.toFixed(1)}s` : '-'}
              </span>
            </div>

            <div className="flex justify-between items-center py-1 px-2 rounded hover:bg-slate-900/50">
              <span className="text-blue-300 font-bold font-mono">{p1Stats.maxStreak} 🔥</span>
              <span className="text-slate-400 font-medium">{t.maxStreakLabel}</span>
              <span className="text-rose-300 font-bold font-mono">{p2Stats.maxStreak} 🔥</span>
            </div>
          </div>
        </div>

        {/* Instagram Share & Profile Box */}
        <div className="mb-5 p-3.5 rounded-2xl bg-gradient-to-r from-purple-950/60 via-pink-950/40 to-amber-950/30 border border-pink-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-500 flex items-center justify-center text-white shadow-lg shrink-0">
              <Instagram className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>Instagram Profile</span>
                {instagramHandle && (
                  <span className="text-xs text-pink-300 font-mono font-semibold">{instagramHandle}</span>
                )}
              </p>
              <p className="text-xs text-slate-300">Share your match results on Insta Stories!</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {instaUrl && (
              <a
                href={instaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs flex items-center gap-1 shadow-md transition-all shrink-0"
              >
                <span>{t.followOnInsta}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              type="button"
              onClick={handleCopyStoryScore}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-pink-400/40 text-pink-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              {copiedInsta ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">{t.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-pink-400" />
                  <span>{t.copyInstaStory}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onPlayAgain();
            }}
            className="py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-heading font-black text-lg shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 border border-cyan-300/30 transition-all active:scale-98"
          >
            <RefreshCw className="w-5 h-5" />
            <span>{t.playAgain}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onChangeSettings();
            }}
            className="py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-heading font-bold text-lg flex items-center justify-center gap-2 transition-all active:scale-98"
          >
            <Settings className="w-5 h-5 text-cyan-400" />
            <span>{t.changeSettings}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
