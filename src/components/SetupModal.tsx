import React, { useState } from 'react';
import { Swords, User, Bot, Sparkles, Flame, Clock, RotateCw, Play, Languages, Instagram, ExternalLink, Shapes, Type } from 'lucide-react';
import { Difficulty } from '../utils/mathGenerator';
import { soundFx } from '../utils/sound';
import { Language, translations } from '../utils/translations';

export interface GameSettings {
  gameType: 'math' | 'word';
  wordLanguage: Language;
  p1Name: string;
  p2Name: string;
  isAiBot: boolean;
  difficulty: Difficulty;
  totalRounds: number;
  questionTimer: number;
  isFaceToFace: boolean;
  language: Language;
  instagramHandle?: string;
}

interface SetupModalProps {
  initialSettings: GameSettings;
  onStartGame: (settings: GameSettings) => void;
  onClose?: () => void;
  isCustomizing?: boolean;
}

export const SetupModal: React.FC<SetupModalProps> = ({
  initialSettings,
  onStartGame,
  onClose,
  isCustomizing = false,
}) => {
  const [language, setLanguage] = useState<Language>(initialSettings.language || 'en');
  const t = translations[language] || translations.en;

  const [gameType, setGameType] = useState<'math' | 'word'>(initialSettings.gameType || 'math');
  const [wordLanguage, setWordLanguage] = useState<Language>(initialSettings.wordLanguage || 'en');
  const [p1Name, setP1Name] = useState(initialSettings.p1Name || t.p1Placeholder);
  const [p2Name, setP2Name] = useState(initialSettings.p2Name || t.p2Placeholder);
  const [isAiBot, setIsAiBot] = useState(initialSettings.isAiBot);
  const [difficulty, setDifficulty] = useState<Difficulty>(initialSettings.difficulty);
  const [totalRounds, setTotalRounds] = useState<number>(initialSettings.totalRounds);
  const [questionTimer, setQuestionTimer] = useState<number>(initialSettings.questionTimer);
  const [isFaceToFace, setIsFaceToFace] = useState<boolean>(initialSettings.isFaceToFace);
  const [instagramHandle, setInstagramHandle] = useState<string>(initialSettings.instagramHandle || '@tony_codes_919');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playStartSound ? soundFx.playCorrect() : soundFx.playClick();
    
    // Clean instagram handle
    let cleanInsta = instagramHandle.trim();
    if (cleanInsta && !cleanInsta.startsWith('@')) {
      cleanInsta = '@' + cleanInsta;
    }

    onStartGame({
      gameType,
      wordLanguage,
      p1Name: p1Name.trim() || t.p1Placeholder,
      p2Name: isAiBot ? t.aiBotName : p2Name.trim() || t.p2Placeholder,
      isAiBot,
      difficulty,
      totalRounds,
      questionTimer,
      isFaceToFace,
      language,
      instagramHandle: cleanInsta || '@tony_codes_919',
    });
  };

  const handleLangChange = (newLang: Language) => {
    soundFx.playClick();
    setLanguage(newLang);
    const newT = translations[newLang];
    if (isAiBot) {
      setP2Name(newT.aiBotName);
    }
  };

  const cleanInstaUser = (instagramHandle || '@tony_codes_919').replace(/^@/, '');
  const instaProfileUrl = `https://www.instagram.com/${cleanInstaUser}`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-2xl bg-slate-900 border-2 border-slate-700/80 rounded-3xl p-5 sm:p-8 shadow-2xl my-auto relative overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="text-center mb-5 relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Speed Math & Word Puzzle Arena</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-black tracking-tight text-white">
            {t.appTitle} – <span className="text-cyan-400">{t.appTitleSub}</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Game Type Selector: Math vs Word Puzzle */}
          <div className="bg-slate-950/90 border-2 border-cyan-500/40 p-3.5 rounded-2xl shadow-lg">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-cyan-300 mb-2 flex items-center gap-1.5">
              <Shapes className="w-4 h-4 text-cyan-400" />
              <span>{t.battleCategoryLabel}</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setGameType('math');
                }}
                className={`py-3 px-3 rounded-xl border font-heading font-black text-sm sm:text-base flex items-center justify-center gap-2 transition-all ${
                  gameType === 'math'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 border-cyan-300 text-white shadow-lg shadow-cyan-600/30 ring-2 ring-cyan-400/40'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span>🔢 {t.mathMode}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setGameType('word');
                }}
                className={`py-3 px-3 rounded-xl border font-heading font-black text-sm sm:text-base flex items-center justify-center gap-2 transition-all ${
                  gameType === 'word'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-pink-300 text-white shadow-lg shadow-pink-600/30 ring-2 ring-pink-400/40'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Type className="w-4 h-4 text-pink-300" />
                <span>🔤 {t.wordPuzzleMode}</span>
              </button>
            </div>

            {/* If Word Puzzle is active, choose Word Puzzle Language */}
            {gameType === 'word' && (
              <div className="mt-3 border-t border-slate-800 pt-2.5">
                <label className="block text-xs font-bold text-amber-300 mb-1.5">
                  {t.wordLanguageLabel} (English / हिंदी / ಕನ್ನಡ)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'en', label: 'English', sub: 'A, B, C' },
                    { id: 'hi', label: 'हिंदी', sub: 'क, म, ल' },
                    { id: 'kn', label: 'ಕನ್ನಡ', sub: 'ಕ, ಮ, ಲ' },
                  ].map((wLang) => (
                    <button
                      key={wLang.id}
                      type="button"
                      onClick={() => {
                        soundFx.playClick();
                        setWordLanguage(wLang.id as Language);
                      }}
                      className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                        wordLanguage === wLang.id
                          ? 'bg-amber-600 border-amber-300 text-white font-bold shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="font-heading font-extrabold text-xs sm:text-sm">{wLang.label}</div>
                      <div className="text-[10px] opacity-80">{wLang.sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* UI Language Selector Box */}
          <div className="bg-slate-950/90 border border-slate-800 p-3 rounded-2xl">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Languages className="w-4 h-4 text-cyan-400" />
              <span>{t.langSelectLabel} (UI Language)</span>
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { id: 'en', label: 'English' },
                { id: 'hinglish', label: 'Hinglish' },
                { id: 'hi', label: 'हिंदी' },
                { id: 'kn', label: 'ಕನ್ನಡ' },
              ].map((langObj) => (
                <button
                  key={langObj.id}
                  type="button"
                  onClick={() => handleLangChange(langObj.id as Language)}
                  className={`py-2 px-2 rounded-xl border text-center transition-all ${
                    language === langObj.id
                      ? 'bg-cyan-600 border-cyan-400 text-white font-bold shadow-md shadow-cyan-600/30'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <div className="font-heading font-extrabold text-xs sm:text-sm">{langObj.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Game Mode Selector: 2 Player vs AI Bot */}
          <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-2xl">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              {t.selectGameMode}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setIsAiBot(false);
                }}
                className={`py-3 px-3 rounded-xl border font-heading font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all ${
                  !isAiBot
                    ? 'bg-cyan-600 border-cyan-400 text-white shadow-lg shadow-cyan-600/30'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Swords className="w-4 h-4" />
                <span>{t.mode2Player}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setIsAiBot(true);
                  setP2Name(t.aiBotName);
                }}
                className={`py-3 px-3 rounded-xl border font-heading font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all ${
                  isAiBot
                    ? 'bg-rose-600 border-rose-400 text-white shadow-lg shadow-rose-600/30'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Bot className="w-4 h-4" />
                <span>{t.mode1Player}</span>
              </button>
            </div>
          </div>

          {/* Player Names Input */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Player 1 (Blue) */}
            <div className="bg-blue-950/40 border border-blue-500/30 p-3.5 rounded-2xl">
              <label className="block text-xs font-extrabold text-blue-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <User className="w-4 h-4 text-cyan-400" />
                <span>{t.p1NameLabel}</span>
              </label>
              <input
                type="text"
                value={p1Name}
                onChange={(e) => setP1Name(e.target.value)}
                maxLength={15}
                required
                className="w-full bg-slate-950 border border-blue-500/40 rounded-xl px-3 py-2 text-white font-bold text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                placeholder={t.p1Placeholder}
              />
            </div>

            {/* Player 2 (Red or Bot) */}
            <div className="bg-red-950/40 border border-red-500/30 p-3.5 rounded-2xl">
              <label className="block text-xs font-extrabold text-rose-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                {isAiBot ? <Bot className="w-4 h-4 text-rose-400" /> : <User className="w-4 h-4 text-rose-400" />}
                <span>{isAiBot ? 'AI Bot Opponent' : t.p2NameLabel}</span>
              </label>
              <input
                type="text"
                value={isAiBot ? t.aiBotName : p2Name}
                onChange={(e) => setP2Name(e.target.value)}
                disabled={isAiBot}
                maxLength={15}
                required
                className={`w-full bg-slate-950 border border-red-500/40 rounded-xl px-3 py-2 text-white font-bold text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 ${
                  isAiBot ? 'opacity-60 cursor-not-allowed' : ''
                }`}
                placeholder={t.p2Placeholder}
              />
            </div>
          </div>

          {/* Instagram Handle / ID Input with Direct Link Button */}
          <div className="bg-gradient-to-r from-purple-950/50 via-pink-950/40 to-amber-950/30 border border-pink-500/50 p-3.5 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-extrabold text-pink-300 uppercase tracking-wider flex items-center gap-1.5">
                <Instagram className="w-4 h-4 text-pink-400 animate-pulse" />
                <span>{t.instagramLabel}</span>
              </label>

              <a
                href={instaProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-pink-300 hover:text-white flex items-center gap-1 bg-pink-900/60 hover:bg-pink-700/80 px-2.5 py-1 rounded-lg border border-pink-500/40 transition-colors shadow-sm"
              >
                <span>Visit Instagram</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="relative">
              <input
                type="text"
                value={instagramHandle}
                onChange={(e) => setInstagramHandle(e.target.value)}
                maxLength={30}
                className="w-full bg-slate-950 border-2 border-pink-500/60 rounded-xl px-3 py-2.5 text-white font-bold text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/40 shadow-inner"
                placeholder={t.instagramPlaceholder}
              />
            </div>
          </div>

          {/* Difficulty Selection */}
          <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-2xl">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              {t.difficultyLabel}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'easy', label: t.easy, desc: t.easyDesc, color: 'border-emerald-500/50 text-emerald-300 bg-emerald-950/40' },
                { id: 'medium', label: t.medium, desc: t.mediumDesc, color: 'border-amber-500/50 text-amber-300 bg-amber-950/40' },
                { id: 'hard', label: t.hard, desc: t.hardDesc, color: 'border-rose-500/50 text-rose-300 bg-rose-950/40' },
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setDifficulty(lvl.id as Difficulty);
                  }}
                  className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    difficulty === lvl.id
                      ? `${lvl.color} border-2 shadow-lg ring-1 ring-white/20`
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="font-heading font-extrabold text-xs sm:text-sm">{lvl.label}</span>
                  <span className="text-[10px] opacity-75 mt-0.5 leading-tight">{lvl.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Rounds & Timer Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Rounds */}
            <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-2xl">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.numRoundsLabel}</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[5, 10, 15].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      setTotalRounds(r);
                    }}
                    className={`py-2 rounded-xl border font-mono font-bold text-sm text-center transition-all ${
                      totalRounds === r
                        ? 'bg-cyan-600 border-cyan-400 text-white shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {r} {t.rounds}
                  </button>
                ))}
              </div>
            </div>

            {/* Timer per Question */}
            <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-2xl">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t.timerPerQuestion}</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[10, 15, 20].map((tVal) => (
                  <button
                    key={tVal}
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      setQuestionTimer(tVal);
                    }}
                    className={`py-2 rounded-xl border font-mono font-bold text-sm text-center transition-all ${
                      questionTimer === tVal
                        ? 'bg-cyan-600 border-cyan-400 text-white shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {tVal}s Timer
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table Flip Option for tablet/mobile opposite seating */}
          {!isAiBot && (
            <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RotateCw className="w-4 h-4 text-cyan-400" />
                <div>
                  <p className="text-xs font-bold text-white">{t.faceToFaceMode}</p>
                  <p className="text-[10px] text-slate-400">{t.faceToFaceDesc}</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={isFaceToFace}
                onChange={(e) => setIsFaceToFace(e.target.checked)}
                className="w-5 h-5 accent-cyan-500 rounded cursor-pointer"
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2 flex items-center gap-3">
            {onClose && isCustomizing && (
              <button
                type="button"
                onClick={onClose}
                className="py-4 px-5 rounded-2xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm"
              >
                {t.back}
              </button>
            )}

            <button
              type="submit"
              className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-heading font-black text-xl tracking-wider shadow-2xl shadow-cyan-500/25 border border-cyan-300/40 transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <span>{t.startGame}</span>
              <Play className="w-6 h-6 fill-current" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
