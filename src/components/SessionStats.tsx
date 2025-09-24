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
    <div className={`glass rounded-xl p-4 transition-all ${
      highlight ? 'ring-2 ring-blue-400/50 bg-blue-500/10' : ''
    }`}>
      <div className="text-sm text-gray-400 uppercase tracking-wider ui-font font-medium">{label}</div>
      <div className="text-xl timer-font font-medium text-white mt-1">
        {value !== undefined ? formatTime(value) : '-'}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-white ui-font">Session Statistics</h3>
      
      <div className="text-base text-gray-300 ui-font">
        Solves: <span className="font-semibold text-white">{stats.count}</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
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