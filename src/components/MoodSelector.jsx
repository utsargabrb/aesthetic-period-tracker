import React from 'react';

const MOODS = [
  { icon: '☁️', label: 'Cloudy' },
  { icon: '☀️', label: 'Sunny' },
  { icon: '🌸', label: 'Blossoming' }
];

export function MoodSelector({ currentMood, onSelectMood }) {
  return (
    <div className="mood-selector">
      {MOODS.map(mood => (
        <button
          key={mood.label}
          className={`mood-btn ${currentMood === mood.icon ? 'active' : ''}`}
          onClick={() => onSelectMood(currentMood === mood.icon ? null : mood.icon)}
          title={mood.label}
          type="button"
        >
          {mood.icon}
        </button>
      ))}
    </div>
  );
}
