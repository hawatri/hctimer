import React from 'react';
import { formatTime } from '../utils/timeUtils';

interface SessionStatsProps {
  stats: {
    count: number;
    best?: number;
    worst?: number;
    average?: number;
    ao5?: number;
    ao12?: number;
    ao100?: number;
    mean?: number;
  };
}

export const SessionStats: React.FC<SessionStatsProps> = ({ stats }) => {
  const StatCard: React.FC<{ label: string; value: number | undefined; highlight?: boolean }> = ({ 
    label, 
    value, 
    highlight = false 
  }) => (
    <div className={`bg-gray-800 rounded-lg p-3 ${highlight ? 'ring-2 ring-blue-500' : ''}`}>
      <div className="text-xs text-gray-400 uppercase tracking-wide">{label}</div>
      <div className="text-lg font-mono font-semibold text-white">
        {value !== undefined ? formatTime(value) : '-'}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Session Statistics</h3>
      
      <div className="text-sm text-gray-400">
        Solves: {stats.count}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Best" value={stats.best} highlight />
        <StatCard label="Worst" value={stats.worst} />
        <StatCard label="Ao5" value={stats.ao5} highlight />
        <StatCard label="Ao12" value={stats.ao12} highlight />
        <StatCard label="Ao100" value={stats.ao100} />
        <StatCard label="Mean" value={stats.mean} />
      </div>
    </div>
  );
};