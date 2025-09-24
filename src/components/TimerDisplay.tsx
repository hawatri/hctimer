import React from 'react';
import { formatTime } from '../utils/timeUtils';

interface TimerDisplayProps {
  time: number;
  isRunning: boolean;
  isReady: boolean;
  timerState: 'stopped' | 'preparing' | 'ready' | 'running';
  settings: any;
}

// Seven-segment display component
const SevenSegmentDigit: React.FC<{ digit: string; color: string }> = ({ digit, color }) => {
  // Seven segments: [top, topRight, topLeft, middle, bottomRight, bottomLeft, bottom]
  const segments = {
    '0': [true, true, true, false, true, true, true],    // 0: all except middle
    '1': [false, true, false, false, true, false, false], // 1: right sides only
    '2': [true, true, false, true, false, true, true],   // 2: top, topRight, middle, bottomLeft, bottom
    '3': [true, true, false, true, true, false, true],   // 3: top, topRight, middle, bottomRight, bottom
    '4': [false, true, true, true, true, false, false],  // 4: topLeft, topRight, middle, bottomRight
    '5': [true, false, true, true, true, false, true],   // 5: top, topLeft, middle, bottomRight, bottom
    '6': [true, false, true, true, true, true, true],    // 6: top, topLeft, middle, bottomRight, bottomLeft, bottom
    '7': [true, true, false, false, true, false, false], // 7: top, topRight, bottomRight
    '8': [true, true, true, true, true, true, true],     // 8: all segments
    '9': [true, true, true, true, true, false, true],    // 9: all except bottomLeft
    ' ': [false, false, false, false, false, false, false],
    '-': [false, false, false, true, false, false, false],
  };

  const activeSegments = segments[digit as keyof typeof segments] || [false, false, false, false, false, false, false];

  return (
    <div className="inline-block mx-2" style={{ width: '60px', height: '90px', position: 'relative' }}>
      {/* Top */}
      <div 
        className="absolute"
        style={{
          top: '3px',
          left: '9px',
          width: '42px',
          height: '6px',
          backgroundColor: activeSegments[0] ? color : 'rgba(255,255,255,0.08)',
          clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
          boxShadow: activeSegments[0] ? `0 0 12px ${color}` : 'none'
        }}
      />
      {/* Top Right */}
      <div 
        className="absolute"
        style={{
          top: '9px',
          right: '3px',
          width: '6px',
          height: '33px',
          backgroundColor: activeSegments[1] ? color : 'rgba(255,255,255,0.08)',
          clipPath: 'polygon(0% 10%, 100% 0%, 100% 90%, 0% 100%)',
          boxShadow: activeSegments[1] ? `0 0 12px ${color}` : 'none'
        }}
      />
      {/* Top Left */}
      <div 
        className="absolute"
        style={{
          top: '9px',
          left: '3px',
          width: '6px',
          height: '33px',
          backgroundColor: activeSegments[2] ? color : 'rgba(255,255,255,0.08)',
          clipPath: 'polygon(100% 10%, 100% 90%, 0% 100%, 0% 0%)',
          boxShadow: activeSegments[2] ? `0 0 12px ${color}` : 'none'
        }}
      />
      {/* Middle */}
      <div 
        className="absolute"
        style={{
          top: '42px',
          left: '9px',
          width: '42px',
          height: '6px',
          backgroundColor: activeSegments[3] ? color : 'rgba(255,255,255,0.08)',
          clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
          boxShadow: activeSegments[3] ? `0 0 12px ${color}` : 'none'
        }}
      />
      {/* Bottom Right */}
      <div 
        className="absolute"
        style={{
          bottom: '9px',
          right: '3px',
          width: '6px',
          height: '33px',
          backgroundColor: activeSegments[4] ? color : 'rgba(255,255,255,0.08)',
          clipPath: 'polygon(0% 0%, 100% 10%, 100% 100%, 0% 90%)',
          boxShadow: activeSegments[4] ? `0 0 12px ${color}` : 'none'
        }}
      />
      {/* Bottom Left */}
      <div 
        className="absolute"
        style={{
          bottom: '9px',
          left: '3px',
          width: '6px',
          height: '33px',
          backgroundColor: activeSegments[5] ? color : 'rgba(255,255,255,0.08)',
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 90%, 0% 100%)',
          boxShadow: activeSegments[5] ? `0 0 12px ${color}` : 'none'
        }}
      />
      {/* Bottom */}
      <div 
        className="absolute"
        style={{
          bottom: '3px',
          left: '9px',
          width: '42px',
          height: '6px',
          backgroundColor: activeSegments[6] ? color : 'rgba(255,255,255,0.08)',
          clipPath: 'polygon(0% 0%, 90% 0%, 100% 100%, 10% 100%)',
          boxShadow: activeSegments[6] ? `0 0 12px ${color}` : 'none'
        }}
      />
    </div>
  );
};

// Colon separator for time display
const ColonSeparator: React.FC<{ color: string }> = ({ color }) => (
  <div className="inline-block mx-3" style={{ width: '12px', height: '90px', position: 'relative' }}>
    <div 
      className="absolute w-3 h-3 rounded-full"
      style={{
        top: '27px',
        left: '3px',
        backgroundColor: color,
        boxShadow: `0 0 10px ${color}`
      }}
    />
    <div 
      className="absolute w-3 h-3 rounded-full"
      style={{
        top: '60px',
        left: '3px',
        backgroundColor: color,
        boxShadow: `0 0 10px ${color}`
      }}
    />
  </div>
);

// Decimal point
const DecimalPoint: React.FC<{ color: string }> = ({ color }) => (
  <div className="inline-block mx-2" style={{ width: '12px', height: '90px', position: 'relative' }}>
    <div 
      className="absolute w-3 h-3 rounded-full"
      style={{
        bottom: '9px',
        left: '3px',
        backgroundColor: color,
        boxShadow: `0 0 10px ${color}`
      }}
    />
  </div>
);

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
        return '#ff3333'; // bright red
      case 'ready':
        return '#00ff00'; // bright green
      case 'running':
        return '#00ffff'; // cyan
      default:
        return '#ffffff'; // white
    }
  };

  const getBackgroundGlow = () => {
    switch (timerState) {
      case 'preparing':
        return '0 0 20px rgba(255, 51, 51, 0.3)';
      case 'ready':
        return '0 0 20px rgba(0, 255, 0, 0.3)';
      case 'running':
        return '0 0 20px rgba(0, 255, 255, 0.3)';
      default:
        return '0 0 20px rgba(255, 255, 255, 0.1)';
    }
  };

  const renderSevenSegmentTime = () => {
    const color = getDisplayColor();
    
    if (timerState === 'preparing') {
      // Show "8888" pattern to indicate preparing
      return (
        <div className="flex justify-center items-center">
          {[8, 8, 8, 8].map((digit, index) => (
            <SevenSegmentDigit key={index} digit={digit.toString()} color={color} />
          ))}
        </div>
      );
    }
    
    if (timerState === 'ready') {
      // Show "0000" pattern to indicate ready
      return (
        <div className="flex justify-center items-center">
          {[0, 0, 0, 0].map((digit, index) => (
            <SevenSegmentDigit key={index} digit={digit.toString()} color={color} />
          ))}
        </div>
      );
    }
    
    const timeStr = formatTime(time);
    const parts = timeStr.split(/([:.])/);
    
    return (
      <div className="flex justify-center items-center">
        {parts.map((part, index) => {
          if (part === ':') {
            return <ColonSeparator key={index} color={color} />;
          } else if (part === '.') {
            return <DecimalPoint key={index} color={color} />;
          } else {
            return part.split('').map((digit, digitIndex) => (
              <SevenSegmentDigit key={`${index}-${digitIndex}`} digit={digit} color={color} />
            ));
          }
        })}
      </div>
    );
  };

  return (
    <div className="text-center py-6">
      {/* Digital Clock Display */}
      <div className="inline-block">
        <div 
          className="glass-dark rounded-xl p-6 border-2"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            boxShadow: `inset 0 0 20px rgba(0, 0, 0, 0.5), ${getBackgroundGlow()}`
          }}
        >
          {/* Seven-segment display background */}
          <div 
            className="rounded-lg p-6 mb-2"
            style={{
              background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 30%, #111111 50%, #0a0a0a 70%, #000000 100%)',
              border: '3px inset rgba(100, 100, 100, 0.4)',
              boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.8), inset 0 0 40px rgba(0, 0, 0, 0.6)'
            }}
          >
            {renderSevenSegmentTime()}
          </div>
          
          {/* Status indicator LEDs */}
          <div className="flex justify-center space-x-4 mt-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: timerState === 'preparing' ? '#ff3333' : 'rgba(255, 255, 255, 0.1)',
                boxShadow: timerState === 'preparing' ? '0 0 8px #ff3333' : 'none'
              }}
            />
            <div 
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: timerState === 'ready' ? '#00ff00' : 'rgba(255, 255, 255, 0.1)',
                boxShadow: timerState === 'ready' ? '0 0 8px #00ff00' : 'none'
              }}
            />
            <div 
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: timerState === 'running' ? '#00ffff' : 'rgba(255, 255, 255, 0.1)',
                boxShadow: timerState === 'running' ? '0 0 8px #00ffff' : 'none'
              }}
            />
          </div>
        </div>
      </div>
      
      {timerState === 'stopped' && time > 0 && (
        <div className="mt-3 text-sm ui-font" style={{ color: 'var(--text-muted)' }}>
          Click to reset
        </div>
      )}
    </div>
  );
};