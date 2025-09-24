import React, { useState } from 'react';
import { RotateCcw, Copy, Check, ChevronLeft, ChevronRight } from 'lucide-react';

interface ScrambleDisplayProps {
  scramble: string;
  onNextScramble?: () => void;
  onPreviousScramble?: () => void;
  canGoNext?: boolean;
  canGoPrevious?: boolean;
}

export const ScrambleDisplay: React.FC<ScrambleDisplayProps> = ({ 
  scramble, 
  onNextScramble,
  onPreviousScramble,
  canGoNext = true,
  canGoPrevious = false
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(scramble);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass rounded-2xl p-6 max-w-2xl mx-auto">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-semibold text-primary ui-font">Scramble</h3>
        <div className="flex space-x-2">
          <button
            onClick={onPreviousScramble}
            disabled={!canGoPrevious}
            className={`p-2 rounded-lg transition-colors ${
              canGoPrevious 
                ? 'hover:bg-white/10 text-muted hover:text-primary' 
                : 'text-muted opacity-50 cursor-not-allowed'
            }`}
            title="Previous scramble"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onNextScramble}
            disabled={!canGoNext}
            className={`p-2 rounded-lg transition-colors ${
              canGoNext 
                ? 'hover:bg-white/10 text-muted hover:text-primary' 
                : 'text-muted opacity-50 cursor-not-allowed'
            }`}
            title="Next scramble"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-muted hover:text-primary"
            title="Copy scramble"
          >
            {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
      </div>
      <div className="text-secondary timer-font text-lg leading-relaxed break-words text-center">
        {scramble || 'Generating scramble...'}
      </div>
    </div>
  );
};