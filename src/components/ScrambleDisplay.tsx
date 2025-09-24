import React, { useState } from 'react';
import { RotateCcw, Copy, Check } from 'lucide-react';

interface ScrambleDisplayProps {
  scramble: string;
}

export const ScrambleDisplay: React.FC<ScrambleDisplayProps> = ({ scramble }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(scramble);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass rounded-2xl p-6 max-w-2xl mx-auto">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-semibold text-white ui-font">Scramble</h3>
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
            title="Copy scramble"
          >
            {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
      </div>
      <div className="text-gray-200 timer-font text-lg leading-relaxed break-words text-center">
        {scramble || 'Generating scramble...'}
      </div>
    </div>
  );
};