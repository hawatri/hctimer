import React from 'react';

const EVENTS = [
  { id: '333', name: '3×3×3', icon: '🧩' },
  { id: '222', name: '2×2×2', icon: '🔸' },
  { id: '444', name: '4×4×4', icon: '🔷' },
  { id: '555', name: '5×5×5', icon: '🔶' },
  { id: '666', name: '6×6×6', icon: '🔵' },
  { id: '777', name: '7×7×7', icon: '🟣' },
  { id: 'pyram', name: 'Pyraminx', icon: '🔺' },
  { id: 'skewb', name: 'Skewb', icon: '🔳' },
  { id: 'sq1', name: 'Square-1', icon: '🔲' },
  { id: 'clock', name: 'Clock', icon: '🕐' },
  { id: 'mega', name: 'Megaminx', icon: '🔷' },
];

interface EventSelectorProps {
  currentEvent: string;
  onEventChange: (event: string) => void;
}

export const EventSelector: React.FC<EventSelectorProps> = ({ currentEvent, onEventChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Event</h3>
      <div className="grid grid-cols-1 gap-2">
        {EVENTS.map(event => (
          <button
            key={event.id}
            onClick={() => onEventChange(event.id)}
            className={`p-3 rounded-lg text-left transition-all ${
              currentEvent === event.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">{event.icon}</span>
              <span>{event.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};