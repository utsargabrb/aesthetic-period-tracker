import React from 'react';

export function Header() {
  return (
    <header style={{ marginBottom: '32px', textAlign: 'center' }}>
      <h1 className="heading-serif">Hello, Goddess</h1>
      <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>
        Welcome to your personal moon cycle tracker.
      </p>
    </header>
  );
}
