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
    <div className="text-center py-8">
      <div className={`text-8xl md:text-9xl lg:text-[12rem] timer-font font-light transition-colors duration-200 ${getDisplayColor()} leading-none`}>
        {getDisplayText()}
      </div>
      {timerState === 'stopped' && time > 0 && (
        <div className="mt-4 text-base text-gray-400 ui-font">
          Click to reset
        </div>
      )}
    </div>
  );
};