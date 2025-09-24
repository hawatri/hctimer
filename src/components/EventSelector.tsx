import React from 'react';

const EVENTS = [
  { id: '333', name: '3x3x3' },
  { id: '222', name: '2x2x2' },
  { id: '444', name: '4x4x4' },
  { id: '555', name: '5x5x5' },
  { id: '666', name: '6x6x6' },
  { id: '777', name: '7x7x7' },
  { id: 'pyram', name: 'Pyraminx' },
  { id: 'skewb', name: 'Skewb' },
  { id: 'sq1', name: 'Square-1' },
  { id: 'clock', name: 'Clock' },
  { id: 'mega', name: 'Megaminx' },
];

interface EventSelectorProps {
  currentEvent: string;
  onEventChange: (event: string) => void;
}

export const EventSelector: React.FC<EventSelectorProps> = ({ currentEvent, onEventChange }) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {EVENTS.map(event => (
        <button
          key={event.id}
          onClick={() => onEventChange(event.id)}
          className={`px-4 py-2 rounded-xl text-base ui-font font-medium transition-all ${
            currentEvent === event.id
              ? 'bg-blue-500/80 text-white shadow-lg shadow-blue-500/25 backdrop-blur-sm'
              : 'glass text-gray-300 hover:bg-white/10 hover:text-white'
          }`}
        >
          {event.name}
        </button>
      ))}
    </div>
  );
};