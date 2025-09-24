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
    <div className={`glass rounded-lg p-4 transition-all ${
      highlight ? 'ring-2 ring-blue-400/50' : ''
    }`} style={{ 
      backgroundColor: highlight ? 'rgba(59, 130, 246, 0.1)' : 'var(--glass-bg)',
      margin: '2px'
    }}>
      <div className="text-xs uppercase tracking-wider ui-font font-medium px-1" style={{ color: 'var(--text-muted)' }}>{label}</div>
      <div className="text-lg timer-font font-medium mt-1 px-1" style={{ color: 'var(--text-primary)' }}>
        {value !== undefined ? formatTime(value) : '-'}
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <h3 className="text-xl font-semibold ui-font mb-3" style={{ color: 'var(--text-primary)' }}>Session Statistics</h3>
      
      <div className="text-sm ui-font mb-4" style={{ color: 'var(--text-secondary)' }}>
        Solves: <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{stats.count}</span>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-4 content-start p-1">
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