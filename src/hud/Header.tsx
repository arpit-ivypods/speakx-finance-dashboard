import React from 'react';
import { FONTS, SIZES } from '../theme/typography';

const barStyle: React.CSSProperties = {
  width: '100%',
  height: 48,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: 'rgba(10, 16, 30, 0.85)',
  borderBottom: '1px solid rgba(255,255,255,0.10)',
  padding: '0 20px',
  boxSizing: 'border-box',
  borderRadius: '8px 8px 0 0',
};

const SpeakXLogo: React.FC = () => (
  <div
    style={{
      width: 32,
      height: 32,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #00FFCC, #BF5AF2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}
  >
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1 L13 5.5 L8 8 L11 8 L8 15 L3 10.5 L8 8 L5 8 Z" fill="#FFFFFF" />
    </svg>
  </div>
);

const TitleBlock: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    <span
      style={{
        fontFamily: FONTS.header.family,
        fontSize: SIZES.headerBar,
        fontWeight: FONTS.header.weight,
        textTransform: 'uppercase',
        letterSpacing: FONTS.header.letterSpacing,
        color: '#FFFFFF',
        whiteSpace: 'nowrap',
      }}
    >
      SPEAKX <span style={{ color: '#8A8F98' }}>|</span> YEARLY PERFORMANCE REPORT{' '}
      <span style={{ color: '#8A8F98' }}>|</span> FY 2124
    </span>
    <span
      style={{
        fontFamily: FONTS.body.family,
        fontSize: SIZES.subtext,
        fontWeight: FONTS.body.weight,
        color: '#8A8F98',
        whiteSpace: 'nowrap',
      }}
    >
      Critical data to the CFO and Financial Head
    </span>
  </div>
);

const StatusDots: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#00FFCC',
          boxShadow: '0 0 6px #00FFCC',
          animation: 'pulseDot 2s ease-in-out infinite',
          animationDelay: `${i * 0.2}s`,
        }}
      />
    ))}
  </div>
);

const CalendarIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
    <rect x="1" y="2.5" width="12" height="10" rx="1.5" stroke="#8A8F98" strokeWidth="1.2" />
    <line x1="1" y1="5.5" x2="13" y2="5.5" stroke="#8A8F98" strokeWidth="1.2" />
    <line x1="4" y1="1" x2="4" y2="3.5" stroke="#8A8F98" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="10" y1="1" x2="10" y2="3.5" stroke="#8A8F98" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const Header: React.FC = () => (
  <header className="fade-in-down" style={{ ...barStyle, animationDelay: '0.2s' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <SpeakXLogo />
      <TitleBlock />
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <StatusDots />
      <CalendarIcon />
      <span
        style={{
          fontFamily: "'Roboto Mono', monospace",
          fontSize: SIZES.statusDate,
          fontWeight: 400,
          color: '#8A8F98',
          whiteSpace: 'nowrap',
        }}
      >
        14 OCT 2124
      </span>
    </div>
  </header>
);

export default Header;
