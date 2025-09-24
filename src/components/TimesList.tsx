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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-white ui-font">Times</h3>
        {times.length > 0 && (
          <button
            onClick={() => setShowClearConfirm(true)}
            className="text-base text-red-400 hover:text-red-300 transition-colors ui-font"
          >
            Clear Session
          </button>
        )}
      </div>

      {showClearConfirm && (
        <div className="glass border border-red-500/20 rounded-xl p-4 bg-red-500/10">
          <div className="flex items-center space-x-3 text-red-300 mb-3">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-base ui-font">Clear all times?</span>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => {
                onClearSession();
                setShowClearConfirm(false);
              }}
              className="px-4 py-2 bg-red-500/80 hover:bg-red-500 rounded-lg text-base transition-colors ui-font"
            >
              Yes
            </button>
            <button
              onClick={() => setShowClearConfirm(false)}
              className="px-4 py-2 glass hover:bg-white/10 rounded-lg text-base transition-colors ui-font"
            >
              No
            </button>
          </div>
        </div>
      )}

      <div className="glass rounded-xl max-h-96 overflow-hidden">
        {times.length === 0 ? (
          <div className="p-8 text-center text-gray-400 ui-font text-lg">
            No times yet. Start solving!
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {times.slice().reverse().map((time, index) => (
              <div key={time.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors group">
                <div className="flex items-center space-x-4">
                  <span className="text-base text-gray-400 w-8 ui-font">
                    #{times.length - index}
                  </span>
                  <span className={`timer-font text-lg ${
                    time.penalty === 'DNF' ? 'text-red-400' : 
                    time.penalty === '+2' ? 'text-yellow-400' : 
                    'text-white'
                  }`}>
                    {formatTimeWithPenalty(time)}
                  </span>
                </div>
                <button
                  onClick={() => onDeleteTime(time.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/20 rounded-lg transition-all"
                  title="Delete time"
                >
                  <X className="w-5 h-5 text-red-400" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};