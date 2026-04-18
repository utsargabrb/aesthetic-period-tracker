import React from 'react';
import { format } from 'date-fns';

export function PredictionsPanel({ nextPeriodDate, ovulationDate, fertileWindowStart, fertileWindowEnd }) {
  return (
    <div className="glass-panel" style={{ marginTop: '16px', marginBottom: '16px', padding: '16px 24px' }}>
      <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: 'var(--text-dark)' }}>Upcoming</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-light)' }}>Next Period:</span>
          <strong>{format(nextPeriodDate, 'MMM d, yyyy')}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-light)' }}>Next Ovulation:</span>
          <strong>{format(ovulationDate, 'MMM d, yyyy')}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-light)' }}>Fertile Window:</span>
          <strong>{format(fertileWindowStart, 'MMM d')} - {format(fertileWindowEnd, 'MMM d')}</strong>
        </div>
      </div>
    </div>
  );
}
