import React from 'react';
import { usePeriodTracker } from './hooks/usePeriodTracker';
import { Header } from './components/Header';
import { SettingsPanel } from './components/SettingsPanel';
import { PredictionsPanel } from './components/PredictionsPanel';
import { Calendar } from './components/Calendar';
import { MoodSelector } from './components/MoodSelector';
import './index.css';

function App() {
  const {
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
  } = usePeriodTracker();

  return (
    <>
      <Header />
      <MoodSelector currentMood={mood} onSelectMood={updateMood} />
      <SettingsPanel
        lastPeriodStart={lastPeriodStart}
        cycleLength={cycleLength}
        updateCycleLength={updateCycleLength}
        logPeriod={logPeriod}
      />
      <PredictionsPanel 
        nextPeriodDate={nextPeriodDate}
        ovulationDate={ovulationDate}
        fertileWindowStart={fertileWindowStart}
        fertileWindowEnd={fertileWindowEnd}
      />
      <Calendar
        lastPeriodStart={lastPeriodStart}
        nextPeriodDate={nextPeriodDate}
        ovulationDate={ovulationDate}
        fertileWindowStart={fertileWindowStart}
        fertileWindowEnd={fertileWindowEnd}
      />
    </>
  );
}

export default App;
