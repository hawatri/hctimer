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
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-white">Scramble</h3>
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
            title="Copy scramble"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <div className="text-gray-300 font-mono text-sm leading-relaxed break-words">
        {scramble || 'Generating scramble...'}
      </div>
    </div>
  );
};