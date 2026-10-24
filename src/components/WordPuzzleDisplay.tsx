import React from 'react';
import { WordQuestion } from '../utils/wordGenerator';
import { Sparkles, HelpCircle } from 'lucide-react';
import { soundFx } from '../utils/sound';

interface WordPuzzleDisplayProps {
  wordQuestion: WordQuestion;
  onTileClick?: (letter: string) => void;
}

export const WordPuzzleDisplay: React.FC<WordPuzzleDisplayProps> = ({
  wordQuestion,
  onTileClick,
}) => {
  const handleTilePress = (letter: string) => {
    soundFx.playClick();
    if (onTileClick) {
      onTileClick(letter);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-3 my-1">
      {/* Scattered Tiles Header */}
      <div className="text-xs font-extrabold uppercase tracking-wider text-cyan-300 flex items-center gap-1">
        <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
        <span>Scrambled Letters (अक्षर जोडिए / ಅಕ್ಷರಗಳನ್ನು ಜೋಡಿಸಿ)</span>
      </div>

      {/* Interactive Scattered Tiles Grid */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 my-1">
        {wordQuestion.scrambledLetters.map((letter, idx) => (
          <button
            key={`${letter}-${idx}`}
            type="button"
            onClick={() => handleTilePress(letter)}
            className="px-3.5 sm:px-5 py-2.5 sm:py-3.5 rounded-2xl bg-gradient-to-b from-cyan-500 via-blue-600 to-indigo-700 hover:from-cyan-400 hover:to-indigo-600 text-white font-mono font-extrabold text-2xl sm:text-4xl shadow-xl border-2 border-cyan-300/60 active:scale-95 transition-all hover:scale-105 transform hover:-translate-y-1 cursor-pointer"
            title={`Click to add '${letter}'`}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Hint Badge */}
      <div className="mt-1 px-3 py-1 bg-amber-950/70 border border-amber-500/40 rounded-xl text-amber-300 text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-md">
        <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
        <span>💡 Hint: {wordQuestion.hintText}</span>
      </div>
    </div>
  );
};
