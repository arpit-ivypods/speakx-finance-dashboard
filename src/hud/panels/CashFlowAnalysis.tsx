import React, { useState } from 'react';
import { cashFlow } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatCurrency';

const glassCard: React.CSSProperties = {
  background: 'rgba(10, 16, 30, 0.70)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
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
  boxShadow: '0 0 25px rgba(0,255,204,0.12), inset 0 0 25px rgba(0,255,204,0.04)',
  borderColor: 'rgba(0,255,204,0.30)',
};

interface KPIRowProps {
  label: string;
  value: number;
  unit: string;
  currency: string;
  color: string;
}

function KPIRow({ label, value, unit, currency, color }: KPIRowProps) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div
        style={{
          fontFamily: "'Roboto Mono', monospace",
          fontSize: 9,
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: '#8A8F98',
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 18,
            fontWeight: 700,
            color,
            filter: 'drop-shadow(0 0 8px rgba(0,255,204,0.4))',
            lineHeight: 1,
          }}
        >
          {formatCurrency(value, unit, currency)}
        </span>
        <span
          style={{
            color,
            fontSize: 12,
            fontWeight: 700,
            filter: 'drop-shadow(0 0 6px rgba(0,255,204,0.4))',
            lineHeight: 1,
          }}
        >
          ▲
        </span>
      </div>
    </div>
  );
}

export default function CashFlowAnalysis() {
  const [isHovered, setIsHovered] = useState(false);

  const kpis = [
    { ...cashFlow.netCashFromOps, displayLabel: 'NET CASH FROM OPS' },
    { ...cashFlow.freeCashFlow, displayLabel: 'FREE CASH FLOW' },
  ];

  return (
    <div
      style={{
        ...glassCard,
        ...(isHovered ? glassCardHover : {}),
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
          color: '#FFFFFF',
          marginBottom: 12,
          flexShrink: 0,
        }}
      >
        CASH FLOW ANALYSIS
      </div>

      {kpis.map((kpi, i) => (
        <KPIRow
          key={i}
          label={kpi.displayLabel}
          value={kpi.value}
          unit={kpi.unit}
          currency={kpi.currency}
          color={kpi.color}
        />
      ))}
    </div>
  );
}
