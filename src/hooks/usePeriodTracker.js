import { useState, useEffect } from 'react';
import { addDays, subDays } from 'date-fns';

export function usePeriodTracker() {
  const [lastPeriodStart, setLastPeriodStart] = useState(() => {
    const saved = localStorage.getItem('lastPeriodStart');
    return saved ? new Date(saved) : new Date();
  });

  const [cycleLength, setCycleLength] = useState(() => {
    const saved = localStorage.getItem('cycleLength');
    return saved ? parseInt(saved, 10) : 28;
  });

  const [mood, setMood] = useState(() => {
    return localStorage.getItem('dailyMood') || null;
  });

  useEffect(() => {
    localStorage.setItem('lastPeriodStart', lastPeriodStart.toISOString());
  }, [lastPeriodStart]);

  useEffect(() => {
    localStorage.setItem('cycleLength', cycleLength.toString());
  }, [cycleLength]);

  useEffect(() => {
    if (mood) {
      localStorage.setItem('dailyMood', mood);
    } else {
      localStorage.removeItem('dailyMood');
    }
  }, [mood]);

  const logPeriod = (date) => {
    setLastPeriodStart(date);
  };

  const updateCycleLength = (length) => {
    setCycleLength(length);
  };

  const updateMood = (newMood) => {
    setMood(newMood);
  };

  const nextPeriodDate = addDays(lastPeriodStart, cycleLength);
  
  // Ovulation is usually ~14 days before the next period
  const ovulationDate = subDays(nextPeriodDate, 14);
  
  // Fertile window is typically 5 days before ovulation up to 1 day after
  const fertileWindowStart = subDays(ovulationDate, 5);
  const fertileWindowEnd = addDays(ovulationDate, 1);

  return {
    lastPeriodStart,
    cycleLength,
    nextPeriodDate,
    ovulationDate,
    fertileWindowStart,
    fertileWindowEnd,
    mood,
    logPeriod,
    updateCycleLength,
    updateMood,
  };
}
