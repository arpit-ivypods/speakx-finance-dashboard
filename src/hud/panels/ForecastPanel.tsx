import React, { useState } from 'react';
import { forecast } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatCurrency';
import { useTheme } from '../../theme/ThemeContext';

const glassCard: React.CSSProperties = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border-card)',
  borderRadius: 8,
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  padding: '16px 20px',
  overflow: 'hidden',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
};

const glassCardHover: React.CSSProperties = {
  boxShadow: 'var(--hover-glow)',
  borderColor: 'var(--hover-border)',
};

function RangeBar({ mapColor }: { mapColor: (c: string) => string }) {
  const { low, high, unit, currency } = forecast.revenueRange;

  return (
    <div style={{ marginTop: 8, marginBottom: 8 }}>
      <div
        style={{
          width: '100%',
          height: 2,
          borderRadius: 1,
          background: 'var(--chart-gridline)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: 1,
            background: `linear-gradient(90deg, ${mapColor('#00FFCC')}, ${mapColor('#BF5AF2')})`,
            boxShadow: `0 0 6px ${mapColor('#00FFCC')}66`,
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 4,
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 8,
            color: 'var(--text-muted)',
          }}
        >
          {formatCurrency(low, unit, currency)}
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 8,
            color: 'var(--text-muted)',
          }}
        >
          {formatCurrency(high, unit, currency)}
        </span>
      </div>
    </div>
  );
}

export default function ForecastPanel() {
  const [isHovered, setIsHovered] = useState(false);
  const { mapColor } = useTheme();

  return (
    <div
      style={{
        ...glassCard,
        borderColor: isHovered ? 'var(--hover-border)' : undefined,
        boxShadow: isHovered ? 'var(--hover-glow)' : 'none',
        height: '100%',
        justifyContent: 'center',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: 10,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--text-primary)',
          marginBottom: 8,
          flexShrink: 0,
        }}
      >
        FY 2125 FINANCIAL FORECAST
      </div>

      {/* Projected Revenue */}
      <div style={{ marginBottom: 4 }}>
        <div
          style={{
            fontFamily: "'Roboto Mono', monospace",
            fontSize: 9,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--text-muted)',
            marginBottom: 4,
          }}
        >
          PROJECTED REVENUE
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 18,
            fontWeight: 700,
            color: mapColor('#00FFCC'),
            filter: `drop-shadow(0 0 8px ${mapColor('#00FFCC')}66)`,
            lineHeight: 1,
          }}
        >
          {formatCurrency(
            forecast.projectedRevenue.value,
            forecast.projectedRevenue.unit,
            forecast.projectedRevenue.currency
          )}
        </div>
      </div>

      {/* Range label */}
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 8,
          color: 'var(--text-muted)',
          marginBottom: 2,
        }}
      >
        ({formatCurrency(forecast.revenueRange.low, forecast.revenueRange.unit, forecast.revenueRange.currency)}
        {' \u2013 '}
        {formatCurrency(forecast.revenueRange.high, forecast.revenueRange.unit, forecast.revenueRange.currency)})
      </div>

      {/* Range Bar */}
      <RangeBar mapColor={mapColor} />

      {/* Projected Net Income */}
      <div>
        <div
          style={{
            fontFamily: "'Roboto Mono', monospace",
            fontSize: 9,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--text-muted)',
            marginBottom: 4,
          }}
        >
          PROJECTED NET INCOME
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 18,
            fontWeight: 700,
            color: mapColor('#00FFCC'),
            filter: `drop-shadow(0 0 8px ${mapColor('#00FFCC')}66)`,
            lineHeight: 1,
          }}
        >
          {formatCurrency(
            forecast.projectedNetIncome.value,
            forecast.projectedNetIncome.unit,
            forecast.projectedNetIncome.currency
          )}
        </div>
      </div>
    </div>
  );
}
