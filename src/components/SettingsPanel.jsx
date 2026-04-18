import React from 'react';
import { format } from 'date-fns';

export function SettingsPanel({ 
  lastPeriodStart, 
  cycleLength, 
  updateCycleLength, 
  logPeriod 
}) {
  return (
    <div className="glass-panel" style={{ marginBottom: '24px' }}>
      <div style={{ marginBottom: '16px' }}>
        <label className="label" htmlFor="lastPeriodDate">
          Last Period Start Date
        </label>
        <input 
          type="date" 
          id="lastPeriodDate"
          className="glass-input" 
          value={format(lastPeriodStart, 'yyyy-MM-dd')}
          onChange={(e) => {
            if(e.target.value) {
              logPeriod(new Date(e.target.value));
            }
          }}
        />
      </div>
      <div>
        <label className="label" htmlFor="cycleLength">
          Average Cycle Length (Days)
        </label>
        <input 
          type="number" 
          id="cycleLength"
          className="glass-input"
          min="15" 
          max="60"
          value={cycleLength}
          onChange={(e) => updateCycleLength(parseInt(e.target.value, 10))}
        />
      </div>
    </div>
  );
}
