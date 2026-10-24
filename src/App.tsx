/**
 * Math & Word Battle – 2-Player Speed Quiz Arena
 * Pure React, Tailwind CSS & Web Audio API
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { HeaderBar } from './components/HeaderBar';
import { CenterQuestionCard } from './components/CenterQuestionCard';
import { PlayerCard } from './components/PlayerCard';
import { SetupModal, GameSettings } from './components/SetupModal';
import { WinnerModal, PlayerStats } from './components/WinnerModal';
import { generateQuestion, MathQuestion } from './utils/mathGenerator';
import { generateWordQuestion, WordQuestion } from './utils/wordGenerator';
import { soundFx } from './utils/sound';
import { Language, translations } from './utils/translations';

type GameState = 'SETUP' | 'PLAYING' | 'PAUSED' | 'WINNER';
type RoundStatus = 'playing' | 'p1_point' | 'p2_point' | 'time_up' | 'paused';

const DEFAULT_SETTINGS: GameSettings = {
  gameType: 'math',
  wordLanguage: 'en',
  p1Name: 'Player 1',
  p2Name: 'Player 2',
  isAiBot: false,
  difficulty: 'easy',
  totalRounds: 10,
  questionTimer: 20,
  isFaceToFace: false,
  language: 'en',
  instagramHandle: '@tony_codes_919',
};

export default function App() {
  // Game Setup & Flow State
  const [gameState, setGameState] = useState<GameState>('SETUP');
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [currentMathQuestion, setCurrentMathQuestion] = useState<MathQuestion | null>(null);
  const [currentWordQuestion, setCurrentWordQuestion] = useState<WordQuestion | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(20);
  const [roundStatus, setRoundStatus] = useState<RoundStatus>('playing');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentLang, setCurrentLang] = useState<Language>('en');

  const [lastTappedTileP1, setLastTappedTileP1] = useState<string | undefined>();
  const [lastTappedTileP2, setLastTappedTileP2] = useState<string | undefined>();

  const t = translations[currentLang] || translations.en;

  // Track used question keys to guarantee zero duplicates per match
  const usedQuestionKeysRef = useRef<Set<string>>(new Set());

  // Player Scores & Stats
  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);
  const [p1Streak, setP1Streak] = useState(0);
  const [p2Streak, setP2Streak] = useState(0);
  const [p1MaxStreak, setP1MaxStreak] = useState(0);
  const [p2MaxStreak, setP2MaxStreak] = useState(0);
  const [p1CorrectCount, setP1CorrectCount] = useState(0);
  const [p2CorrectCount, setP2CorrectCount] = useState(0);
  const [p1WrongCount, setP1WrongCount] = useState(0);
  const [p2WrongCount, setP2WrongCount] = useState(0);
  const [p1FastestSec, setP1FastestSec] = useState<number | null>(null);
  const [p2FastestSec, setP2FastestSec] = useState<number | null>(null);

  // Locks & Cooldowns
  const [p1Locked, setP1Locked] = useState(false);
  const [p2Locked, setP2Locked] = useState(false);
  const [p1LockTimer, setP1LockTimer] = useState(0);
  const [p2LockTimer, setP2LockTimer] = useState(0);
  const [p1WrongMsg, setP1WrongMsg] = useState<string | null>(null);
  const [p2WrongMsg, setP2WrongMsg] = useState<string | null>(null);

  // Animations & AI Bot
  const [showAnimP1, setShowAnimP1] = useState(false);
  const [showAnimP2, setShowAnimP2] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);

  // Ref for Question Start Timestamp
  const questionStartTimeRef = useRef<number>(Date.now());
  const aiTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset all match stats & clear used question history
  const resetMatchStats = useCallback(() => {
    usedQuestionKeysRef.current.clear();
    setP1Score(0);
    setP2Score(0);
    setP1Streak(0);
    setP2Streak(0);
    setP1MaxStreak(0);
    setP2MaxStreak(0);
    setP1CorrectCount(0);
    setP2CorrectCount(0);
    setP1WrongCount(0);
    setP2WrongCount(0);
    setP1FastestSec(null);
    setP2FastestSec(null);
    setP1Locked(false);
    setP2Locked(false);
    setP1LockTimer(0);
    setP2LockTimer(0);
    setP1WrongMsg(null);
    setP2WrongMsg(null);
    setShowAnimP1(false);
    setShowAnimP2(false);
  }, []);

  // Load a fresh unique question
  const loadNextQuestion = useCallback((
    gType: 'math' | 'word',
    diff: GameSettings['difficulty'],
    timerSec: number,
    uiLang: Language,
    wLang: Language
  ) => {
    if (gType === 'word') {
      const wQ = generateWordQuestion(diff, wLang, uiLang, usedQuestionKeysRef.current);
      setCurrentWordQuestion(wQ);
      setCurrentMathQuestion(null);
    } else {
      const mQ = generateQuestion(diff, uiLang, usedQuestionKeysRef.current);
      setCurrentMathQuestion(mQ);
      setCurrentWordQuestion(null);
    }

    setTimeLeft(timerSec);
    setRoundStatus('playing');
    setP1Locked(false);
    setP2Locked(false);
    setP1LockTimer(0);
    setP2LockTimer(0);
    setP1WrongMsg(null);
    setP2WrongMsg(null);
    questionStartTimeRef.current = Date.now();
  }, []);

  // Start new game with settings
  const handleStartGame = (newSettings: GameSettings) => {
    setSettings(newSettings);
    setCurrentLang(newSettings.language);
    resetMatchStats();
    setCurrentRound(1);
    setGameState('PLAYING');
    loadNextQuestion(
      newSettings.gameType,
      newSettings.difficulty,
      newSettings.questionTimer,
      newSettings.language,
      newSettings.wordLanguage
    );
  };

  // Change language on the fly
  const handleLanguageChange = (newLang: Language) => {
    setCurrentLang(newLang);
    setSettings((prev) => ({ ...prev, language: newLang }));
  };

  // Toggle Mute
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundFx.muted = nextMuted;
  };

  // Toggle Pause
  const handleTogglePause = () => {
    if (gameState === 'PLAYING') {
      setGameState('PAUSED');
      setRoundStatus('paused');
    } else if (gameState === 'PAUSED') {
      setGameState('PLAYING');
      setRoundStatus('playing');
    }
  };

  // Restart match with same settings
  const handleRestart = () => {
    resetMatchStats();
    setCurrentRound(1);
    setGameState('PLAYING');
    loadNextQuestion(
      settings.gameType,
      settings.difficulty,
      settings.questionTimer,
      currentLang,
      settings.wordLanguage
    );
  };

  // Handle tile click in Word Puzzle mode
  const handleTileClick = (letter: string) => {
    setLastTappedTileP1(letter);
    setLastTappedTileP2(letter);
    setTimeout(() => {
      setLastTappedTileP1(undefined);
      setLastTappedTileP2(undefined);
    }, 100);
  };

  // Submit Answer Logic (Player 1 or Player 2)
  const handleAnswerSubmit = useCallback((playerNum: 1 | 2, answerRaw: string) => {
    if (gameState !== 'PLAYING' || roundStatus !== 'playing') return;

    if (playerNum === 1 && p1Locked) return;
    if (playerNum === 2 && p2Locked) return;

    const timeTakenSec = (Date.now() - questionStartTimeRef.current) / 1000;

    let isCorrect = false;

    if (settings.gameType === 'word' && currentWordQuestion) {
      const target = currentWordQuestion.targetWord.trim().toLowerCase();
      const userAns = answerRaw.trim().toLowerCase();
      isCorrect = target === userAns;
    } else if (currentMathQuestion) {
      const parsed = parseInt(answerRaw.trim(), 10);
      isCorrect = !isNaN(parsed) && parsed === currentMathQuestion.correctAnswer;
    }

    if (isCorrect) {
      // CORRECT ANSWER!
      soundFx.playCorrect();

      if (playerNum === 1) {
        setP1Score((s) => s + 1);
        setP1CorrectCount((c) => c + 1);
        setP1Streak((st) => {
          const newSt = st + 1;
          setP1MaxStreak((m) => Math.max(m, newSt));
          return newSt;
        });
        setP1FastestSec((f) => (f === null ? timeTakenSec : Math.min(f, timeTakenSec)));
        setRoundStatus('p1_point');
        setShowAnimP1(true);
        setTimeout(() => setShowAnimP1(false), 1200);
      } else {
        setP2Score((s) => s + 1);
        setP2CorrectCount((c) => c + 1);
        setP2Streak((st) => {
          const newSt = st + 1;
          setP2MaxStreak((m) => Math.max(m, newSt));
          return newSt;
        });
        setP2FastestSec((f) => (f === null ? timeTakenSec : Math.min(f, timeTakenSec)));
        setRoundStatus('p2_point');
        setShowAnimP2(true);
        setTimeout(() => setShowAnimP2(false), 1200);
      }

      // Automatically move to next question after 2s
      setTimeout(() => {
        setCurrentRound((r) => {
          if (r < settings.totalRounds) {
            const nextR = r + 1;
            loadNextQuestion(
              settings.gameType,
              settings.difficulty,
              settings.questionTimer,
              currentLang,
              settings.wordLanguage
            );
            return nextR;
          } else {
            setGameState('WINNER');
            return r;
          }
        });
      }, 2000);

    } else {
      // WRONG ANSWER!
      soundFx.playWrong();

      if (playerNum === 1) {
        setP1WrongCount((w) => w + 1);
        setP1Streak(0);
        setP1Locked(true);
        setP1LockTimer(3);
        setP1WrongMsg(t.cooldownMsg);
      } else {
        setP2WrongCount((w) => w + 1);
        setP2Streak(0);
        setP2Locked(true);
        setP2LockTimer(3);
        setP2WrongMsg(t.cooldownMsg);
      }
    }
  }, [gameState, roundStatus, settings, currentMathQuestion, currentWordQuestion, p1Locked, p2Locked, currentLang, loadNextQuestion, t.cooldownMsg]);

  // Main Question Countdown Timer (1s ticks)
  useEffect(() => {
    if (gameState !== 'PLAYING' || roundStatus !== 'playing') return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time Up!
          clearInterval(interval);
          soundFx.playTimeUp();
          setRoundStatus('time_up');

          // Reset streaks on time up
          setP1Streak(0);
          setP2Streak(0);

          // Move to next round after 2.5s
          setTimeout(() => {
            setCurrentRound((r) => {
              if (r < settings.totalRounds) {
                const nextR = r + 1;
                loadNextQuestion(
                  settings.gameType,
                  settings.difficulty,
                  settings.questionTimer,
                  currentLang,
                  settings.wordLanguage
                );
                return nextR;
              } else {
                setGameState('WINNER');
                return r;
              }
            });
          }, 2500);

          return 0;
        }

        if (prev === 6) {
          soundFx.playTimerWarning();
        } else if (prev <= 5) {
          soundFx.playTick();
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, roundStatus, settings, currentLang, loadNextQuestion]);

  // P1 Lock Cooldown Countdown
  useEffect(() => {
    if (!p1Locked || gameState !== 'PLAYING') return;

    const interval = setInterval(() => {
      setP1LockTimer((tVal) => {
        if (tVal <= 1) {
          clearInterval(interval);
          setP1Locked(false);
          setP1WrongMsg(null);
          return 0;
        }
        return tVal - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [p1Locked, gameState]);

  // P2 Lock Cooldown Countdown
  useEffect(() => {
    if (!p2Locked || gameState !== 'PLAYING') return;

    const interval = setInterval(() => {
      setP2LockTimer((tVal) => {
        if (tVal <= 1) {
          clearInterval(interval);
          setP2Locked(false);
          setP2WrongMsg(null);
          return 0;
        }
        return tVal - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [p2Locked, gameState]);

  // AI Bot Automated Simulation (for both Math and Word Puzzle)
  useEffect(() => {
    if (
      gameState !== 'PLAYING' ||
      roundStatus !== 'playing' ||
      !settings.isAiBot ||
      p2Locked
    ) {
      setAiThinking(false);
      return;
    }

    setAiThinking(true);

    let minDelay = 4000;
    let maxDelay = 7000;
    let accuracyChance = 0.75;

    if (settings.difficulty === 'medium') {
      minDelay = 3000;
      maxDelay = 5500;
      accuracyChance = 0.85;
    } else if (settings.difficulty === 'hard') {
      minDelay = 2000;
      maxDelay = 4000;
      accuracyChance = 0.92;
    }

    const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

    aiTimerRef.current = setTimeout(() => {
      if (roundStatus === 'playing') {
        const isCorrect = Math.random() < accuracyChance;
        
        let botAnswer = '';
        if (settings.gameType === 'word' && currentWordQuestion) {
          botAnswer = isCorrect
            ? currentWordQuestion.targetWord
            : currentWordQuestion.scrambledLetters.join('');
        } else if (currentMathQuestion) {
          botAnswer = String(
            isCorrect
              ? currentMathQuestion.correctAnswer
              : currentMathQuestion.correctAnswer + (Math.random() > 0.5 ? 2 : -2)
          );
        }

        handleAnswerSubmit(2, botAnswer);
      }
      setAiThinking(false);
    }, delay);

    return () => {
      if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
    };
  }, [gameState, roundStatus, settings, p2Locked, currentMathQuestion, currentWordQuestion, handleAnswerSubmit]);

  // Player Stats for Winner Screen
  const p1Stats: PlayerStats = {
    name: settings.p1Name,
    score: p1Score,
    correctCount: p1CorrectCount,
    wrongCount: p1WrongCount,
    fastestTimeSec: p1FastestSec,
    maxStreak: p1MaxStreak,
  };

  const p2Stats: PlayerStats = {
    name: settings.p2Name,
    score: p2Score,
    correctCount: p2CorrectCount,
    wrongCount: p2WrongCount,
    fastestTimeSec: p2FastestSec,
    maxStreak: p2MaxStreak,
  };

  const cleanInstaUser = (settings.instagramHandle || '@tony_codes_919').replace(/^@/, '');
  const instaProfileUrl = `https://www.instagram.com/${cleanInstaUser}`;

  const correctAnswerToShow = settings.gameType === 'word'
    ? currentWordQuestion?.targetWord
    : currentMathQuestion?.correctAnswer;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-white relative overflow-x-hidden">
      {/* Top Header Navigation Bar */}
      <HeaderBar
        currentRound={currentRound}
        totalRounds={settings.totalRounds}
        difficulty={settings.difficulty}
        isPaused={gameState === 'PAUSED'}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onTogglePause={handleTogglePause}
        onRestart={handleRestart}
        onOpenSettings={() => setGameState('SETUP')}
        isGameActive={gameState === 'PLAYING' || gameState === 'PAUSED'}
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        instagramHandle={settings.instagramHandle || '@tony_codes_919'}
      />

      {/* Main Battle Arena View */}
      {gameState === 'PLAYING' || gameState === 'PAUSED' ? (
        <main className="flex-1 w-full max-w-7xl mx-auto p-2 sm:p-4 flex flex-col justify-between">
          {/* Pause Overlay */}
          {gameState === 'PAUSED' && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center p-4">
              <div className="bg-slate-900 border border-slate-700 p-8 rounded-3xl text-center shadow-2xl max-w-sm">
                <h2 className="text-3xl font-heading font-black text-amber-400 mb-2">{t.gamePaused}</h2>
                <p className="text-sm text-slate-300 mb-6">{t.gamePausedDesc}</p>
                <button
                  type="button"
                  onClick={handleTogglePause}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-extrabold rounded-2xl text-lg shadow-lg shadow-emerald-600/30"
                >
                  {t.resumeGame}
                </button>
              </div>
            </div>
          )}

          {/* Center Question & Status Banner */}
          <CenterQuestionCard
            gameType={settings.gameType}
            mathQuestion={currentMathQuestion}
            wordQuestion={currentWordQuestion}
            difficulty={settings.difficulty}
            timeLeft={timeLeft}
            maxTime={settings.questionTimer}
            currentRound={currentRound}
            totalRounds={settings.totalRounds}
            roundStatus={roundStatus}
            winnerName={
              roundStatus === 'p1_point'
                ? settings.p1Name
                : roundStatus === 'p2_point'
                ? settings.p2Name
                : undefined
            }
            correctAnswerToShow={correctAnswerToShow}
            currentLang={currentLang}
            onTileClick={handleTileClick}
          />

          {/* Split Screen 2-Player Battle Arena */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 my-2 items-stretch flex-1">
            {/* Player 1 (Blue Side - Left) */}
            <PlayerCard
              playerNumber={1}
              playerName={settings.p1Name}
              score={p1Score}
              streak={p1Streak}
              isLocked={p1Locked}
              lockTimeLeft={p1LockTimer}
              onSubmitAnswer={(ans) => handleAnswerSubmit(1, ans)}
              isGameActive={gameState === 'PLAYING'}
              roundStatus={roundStatus}
              showPointAnimation={showAnimP1}
              isFlipped={settings.isFaceToFace}
              wrongAttemptMsg={p1WrongMsg}
              currentLang={currentLang}
              gameType={settings.gameType}
              activeAppendedText={lastTappedTileP1}
            />

            {/* Player 2 (Red Side - Right / AI Bot) */}
            <PlayerCard
              playerNumber={2}
              playerName={settings.p2Name}
              score={p2Score}
              streak={p2Streak}
              isLocked={p2Locked}
              lockTimeLeft={p2LockTimer}
              isAiBot={settings.isAiBot}
              aiThinking={aiThinking}
              onSubmitAnswer={(ans) => handleAnswerSubmit(2, ans)}
              isGameActive={gameState === 'PLAYING'}
              roundStatus={roundStatus}
              showPointAnimation={showAnimP2}
              wrongAttemptMsg={p2WrongMsg}
              currentLang={currentLang}
              gameType={settings.gameType}
              activeAppendedText={lastTappedTileP2}
            />
          </div>
        </main>
      ) : null}

      {/* Game Setup Modal */}
      {gameState === 'SETUP' && (
        <SetupModal
          initialSettings={settings}
          onStartGame={handleStartGame}
          isCustomizing={p1Score > 0 || p2Score > 0}
        />
      )}

      {/* Game Winner Celebration Modal */}
      {gameState === 'WINNER' && (
        <WinnerModal
          p1Stats={p1Stats}
          p2Stats={p2Stats}
          totalRounds={settings.totalRounds}
          difficulty={settings.difficulty}
          onPlayAgain={handleRestart}
          onChangeSettings={() => setGameState('SETUP')}
          currentLang={currentLang}
          instagramHandle={settings.instagramHandle || '@tony_codes_919'}
        />
      )}

      {/* Footer Branding Bar */}
      <footer className="w-full bg-slate-950 border-t border-slate-900 px-4 py-2 text-center text-xs text-slate-500 flex justify-between items-center">
        <span>{t.appTitle} – {t.appTitleSub}</span>
        <a
          href={instaProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-400 hover:text-pink-300 font-semibold flex items-center gap-1 transition-colors"
        >
          <span>{settings.instagramHandle || '@tony_codes_919'}</span>
        </a>
      </footer>
    </div>
  );
}
