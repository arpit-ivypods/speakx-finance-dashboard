import React from 'react';
import { financialKPIs } from '../../data/mockData';
import { formatCurrency, formatPercent } from '../../utils/formatCurrency';
import Sparkline from '../shared/Sparkline';
import QoQGrowth from './QoQGrowth';

interface KpiRow {
  label: string;
  value: string;
  color: string;
  sparkline: number[] | null;
  isPercent: boolean;
}

const kpiRows: KpiRow[] = [
  {
    label: 'REVENUE',
    value: formatCurrency(financialKPIs.revenue.value, financialKPIs.revenue.unit, financialKPIs.revenue.currency),
    color: financialKPIs.revenue.color,
    sparkline: financialKPIs.revenue.sparkline,
    isPercent: false,
  },
  {
    label: 'GROSS MARGIN',
    value: formatPercent(financialKPIs.grossMargin.value),
    color: financialKPIs.grossMargin.color,
    sparkline: financialKPIs.grossMargin.sparkline,
    isPercent: true,
  },
  {
    label: 'EBITDA',
    value: formatCurrency(financialKPIs.ebitda.value, financialKPIs.ebitda.unit, financialKPIs.ebitda.currency),
    color: financialKPIs.ebitda.color,
    sparkline: financialKPIs.ebitda.sparkline,
    isPercent: false,
  },
  {
    label: 'EBITDA MARGIN',
    value: formatPercent(financialKPIs.ebitdaMargin.value),
    color: financialKPIs.ebitdaMargin.color,
    sparkline: financialKPIs.ebitdaMargin.sparkline,
    isPercent: true,
  },
  {
    label: 'NET INCOME',
    value: formatCurrency(financialKPIs.netIncome.value, financialKPIs.netIncome.unit, financialKPIs.netIncome.currency),
    color: financialKPIs.netIncome.color,
    sparkline: financialKPIs.netIncome.sparkline,
    isPercent: false,
  },
];

const FinancialKPIs: React.FC = () => {
  return (
    <div
      className="fade-in"
      style={{
        background: 'rgba(10, 16, 30, 0.70)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: 8,
        backdropFilter: 'blur(10px)',
        padding: '16px 20px',
        height: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: '#FFFFFF',
          marginBottom: 10,
          flexShrink: 0,
        }}
      >
        FINANCIAL KPIs
      </div>

      <div style={{ display: 'flex', gap: 16, flex: 1, minHeight: 0, overflow: 'hidden' }}>
        {/* Left: KPI rows */}
        <div style={{ flex: 3, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          {kpiRows.map((kpi, index) => (
            <div
              key={kpi.label}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                borderBottom:
                  index < kpiRows.length - 1
                    ? '1px solid rgba(255,255,255,0.06)'
                    : 'none',
                whiteSpace: 'nowrap',
              }}
              className="fade-in-up"
            >
              <span
                style={{
                  fontFamily: "'Roboto Mono', monospace",
                  fontSize: 9,
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#8A8F98',
                  minWidth: 105,
                  flexShrink: 0,
                }}
              >
                {kpi.label}:
              </span>

              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: kpi.isPercent ? 20 : 28,
                  fontWeight: 700,
                  color: kpi.color,
                  filter: `drop-shadow(0 0 8px ${kpi.color}66)`,
                  lineHeight: 1,
                }}
              >
                {kpi.value}
              </span>

              {kpi.sparkline && (
                <Sparkline data={kpi.sparkline} color={kpi.color} width={60} height={22} animated />
              )}
            </div>
          ))}
        </div>

        {/* Separator */}
        <div style={{ width: 1, background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />

        {/* Right: QoQ Growth */}
        <div style={{ flex: 1.2, minWidth: 0, overflow: 'hidden' }}>
          <QoQGrowth />
        </div>
      </div>
    </div>
  );
};

export default FinancialKPIs;
