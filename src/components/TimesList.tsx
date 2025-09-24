import React, { useState } from 'react';
import { X, AlertTriangle, Plus } from 'lucide-react';
import { formatTime } from '../utils/timeUtils';

interface Time {
  id: string;
  time: number;
  scramble: string;
  timestamp: number;
  penalty?: 'DNF' | '+2';
}

interface TimesListProps {
  times: Time[];
  onDeleteTime: (id: string) => void;
  onClearSession: () => void;
}

export const TimesList: React.FC<TimesListProps> = ({ times, onDeleteTime, onClearSession }) => {
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const formatTimeWithPenalty = (time: Time) => {
    if (time.penalty === 'DNF') return 'DNF';
    const baseTime = formatTime(time.time);
    return time.penalty === '+2' ? `${baseTime}+` : baseTime;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Times</h3>
        {times.length > 0 && (
          <button
            onClick={() => setShowClearConfirm(true)}
            className="text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            Clear Session
          </button>
        )}
      </div>

      {showClearConfirm && (
        <div className="bg-red-900/50 border border-red-700 rounded-lg p-3">
          <div className="flex items-center space-x-2 text-red-300 mb-2">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm">Clear all times?</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                onClearSession();
                setShowClearConfirm(false);
              }}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors"
            >
              Yes
            </button>
            <button
              onClick={() => setShowClearConfirm(false)}
              className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded text-sm transition-colors"
            >
              No
            </button>
          </div>
        </div>
      )}

      <div className="bg-gray-800 rounded-lg max-h-96 overflow-y-auto">
        {times.length === 0 ? (
          <div className="p-6 text-center text-gray-400">
            No times yet. Start solving!
          </div>
        ) : (
          <div className="divide-y divide-gray-700">
            {times.slice().reverse().map((time, index) => (
              <div key={time.id} className="p-3 flex items-center justify-between hover:bg-gray-700/50 transition-colors group">
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-400 w-6">
                    #{times.length - index}
                  </span>
                  <span className={`font-mono ${time.penalty === 'DNF' ? 'text-red-400' : time.penalty === '+2' ? 'text-yellow-400' : 'text-white'}`}>
                    {formatTimeWithPenalty(time)}
                  </span>
                </div>
                <button
                  onClick={() => onDeleteTime(time.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-600 rounded transition-all"
                  title="Delete time"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};