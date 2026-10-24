import React from 'react';
import { Delete, CornerDownLeft, X } from 'lucide-react';
import { soundFx } from '../utils/sound';
import { Language, translations } from '../utils/translations';

interface NumericKeypadProps {
  onDigit: (digit: string) => void;
  onClear: () => void;
  onBackspace: () => void;
  onSubmit: () => void;
  disabled?: boolean;
  theme: 'blue' | 'red';
  onClose?: () => void;
  currentLang?: Language;
}

export const NumericKeypad: React.FC<NumericKeypadProps> = ({
  onDigit,
  onClear,
  onBackspace,
  onSubmit,
  disabled = false,
  theme,
  onClose,
  currentLang = 'en',
}) => {
  const t = translations[currentLang] || translations.en;
  const isBlue = theme === 'blue';

  const btnBaseClass = isBlue
    ? 'bg-blue-900/60 hover:bg-blue-800 border-blue-500/30 text-blue-100 active:bg-blue-600 active:scale-95'
    : 'bg-red-900/60 hover:bg-red-800 border-red-500/30 text-red-100 active:bg-red-600 active:scale-95';

  const actionBtnClass = isBlue
    ? 'bg-cyan-600 hover:bg-cyan-500 text-white active:bg-cyan-700 active:scale-95'
    : 'bg-rose-600 hover:bg-rose-500 text-white active:bg-rose-700 active:scale-95';

  const handleKeyClick = (key: string) => {
    if (disabled) return;
    soundFx.playClick();
    if (key === 'C') {
      onClear();
    } else if (key === 'BACK') {
      onBackspace();
    } else if (key === 'ENTER') {
      onSubmit();
    } else {
      onDigit(key);
    }
  };

  const keys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', 'C', '0'];

  return (
    <div className={`p-2.5 rounded-2xl border backdrop-blur-md shadow-2xl transition-all ${
      isBlue ? 'bg-blue-950/80 border-blue-500/40' : 'bg-red-950/80 border-red-500/40'
    } ${disabled ? 'opacity-40 pointer-events-none' : ''}`}>
      {onClose && (
        <div className="flex justify-between items-center mb-1.5 px-1">
          <span className="text-[10px] font-bold tracking-wider uppercase opacity-75">Touch Keypad</span>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-slate-300"
            title={t.hideKeypad}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-3 gap-1.5">
        {keys.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => handleKeyClick(k)}
            disabled={disabled}
            className={`h-11 sm:h-12 rounded-xl border font-mono text-lg font-bold flex items-center justify-center transition-all ${
              k === 'C' ? 'bg-amber-900/40 border-amber-500/30 text-amber-300 hover:bg-amber-800/60' : btnBaseClass
            }`}
          >
            {k}
          </button>
        ))}

        <button
          type="button"
          onClick={() => handleKeyClick('BACK')}
          disabled={disabled}
          className="h-11 sm:h-12 rounded-xl border border-amber-500/30 bg-amber-900/40 hover:bg-amber-800/60 text-amber-300 font-bold flex items-center justify-center transition-all active:scale-95"
          title="Backspace"
        >
          <Delete className="w-5 h-5" />
        </button>
      </div>

      <button
        type="button"
        onClick={() => handleKeyClick('ENTER')}
        disabled={disabled}
        className={`w-full mt-1.5 h-12 rounded-xl font-heading font-bold text-base tracking-wide flex items-center justify-center gap-2 border border-white/20 shadow-lg transition-all ${actionBtnClass}`}
      >
        <span>{t.submitAnswer}</span>
        <CornerDownLeft className="w-5 h-5" />
      </button>
    </div>
  );
};
