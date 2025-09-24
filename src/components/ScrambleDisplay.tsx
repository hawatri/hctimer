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
        <h3 className="text-xl font-semibold ui-font" style={{ color: 'var(--text-primary)' }}>Scramble</h3>
        <div className="flex space-x-2">
          <button
            onClick={onPreviousScramble}
            disabled={!canGoPrevious}
            className={`p-2 rounded-lg transition-colors ${
              canGoPrevious 
                ? 'hover:bg-white/10' 
                : 'opacity-50 cursor-not-allowed'
            }`}
            style={{
              color: canGoPrevious ? 'var(--text-muted)' : 'var(--text-muted)'
            }}
            onMouseEnter={(e) => canGoPrevious && (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => canGoPrevious && (e.currentTarget.style.color = 'var(--text-muted)')}
            title="Previous scramble"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onNextScramble}
            disabled={!canGoNext}
            className={`p-2 rounded-lg transition-colors ${
              canGoNext 
                ? 'hover:bg-white/10' 
                : 'opacity-50 cursor-not-allowed'
            }`}
            style={{
              color: canGoNext ? 'var(--text-muted)' : 'var(--text-muted)'
            }}
            onMouseEnter={(e) => canGoNext && (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => canGoNext && (e.currentTarget.style.color = 'var(--text-muted)')}
            title="Next scramble"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
            title="Copy scramble"
          >
            {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
      </div>
      <div className="timer-font text-lg leading-relaxed break-words text-center" style={{ color: 'var(--text-secondary)' }}>
        {scramble || 'Generating scramble...'}
      </div>
    </div>
  );
};