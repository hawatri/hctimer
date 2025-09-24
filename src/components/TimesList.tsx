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
        <h3 className="text-2xl font-semibold ui-font" style={{ color: 'var(--text-primary)' }}>Times</h3>
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
        <div className="glass border border-red-500/20 rounded-xl p-4" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
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

      <div className="glass rounded-xl h-64 flex flex-col overflow-hidden">
        {times.length === 0 ? (
          <div className="p-8 text-center ui-font text-lg" style={{ color: 'var(--text-muted)' }}>
            No times yet. Start solving!
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto" style={{ borderColor: 'var(--border-color)' }}>
            <div className="space-y-0">
              {times.slice().reverse().map((time, index) => (
                <div key={time.id} className="p-3 flex items-center justify-between hover:bg-white/5 transition-colors group border-b last:border-b-0" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm w-6 ui-font" style={{ color: 'var(--text-muted)' }}>
                      #{times.length - index}
                    </span>
                    <span className={`timer-font text-base ${
                      time.penalty === 'DNF' ? 'text-red-400' : 
                      time.penalty === '+2' ? 'text-yellow-400' : ''
                    }`} style={{
                      color: time.penalty === 'DNF' ? '#f87171' : 
                             time.penalty === '+2' ? '#facc15' : 
                             'var(--text-primary)'
                    }}>
                      {formatTimeWithPenalty(time)}
                    </span>
                  </div>
                  <button
                    onClick={() => onDeleteTime(time.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded-lg transition-all"
                    title="Delete time"
                  >
                    <X className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};