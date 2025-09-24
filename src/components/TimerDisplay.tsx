import React from 'react';
import { formatTime } from '../utils/timeUtils';

interface TimerDisplayProps {
  time: number;
  isRunning: boolean;
  isReady: boolean;
  timerState: 'stopped' | 'preparing' | 'ready' | 'running';
  settings: any;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ 
  time, 
  isRunning, 
  isReady, 
  timerState,
  settings 
}) => {
  const getDisplayColor = () => {
    switch (timerState) {
      case 'preparing':
        return 'text-red-400';
      case 'ready':
        return 'text-green-400';
      case 'running':
        return 'text-white';
      default:
        return 'text-green-400';
    }
  };

  const getDisplayText = () => {
    if (timerState === 'preparing') {
      return 'Hold...';
    }
    if (timerState === 'ready') {
      return 'Ready!';
    }
    return formatTime(time);
  };

  return (
    <div className="text-center">
      <div className={`text-6xl md:text-8xl font-mono font-bold transition-colors duration-200 ${getDisplayColor()}`}>
        {getDisplayText()}
      </div>
      {timerState === 'stopped' && time > 0 && (
        <div className="mt-2 text-sm text-gray-400">
          Click to reset
        </div>
      )}
    </div>
  );
};