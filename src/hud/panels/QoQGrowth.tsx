import React from 'react';
import { qoqGrowth, additionalMetrics } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatCurrency';

const QoQGrowth: React.FC = () => {
  const growthItems = [
    { label: qoqGrowth.revenue.label, value: qoqGrowth.revenue.change, color: qoqGrowth.revenue.color },
    { label: qoqGrowth.gross.label, value: qoqGrowth.gross.change, color: qoqGrowth.gross.color },
    { label: qoqGrowth.ebitda.label, value: qoqGrowth.ebitda.change, color: qoqGrowth.ebitda.color },
  ];

  const metricItems = [
    {
      label: additionalMetrics.operatingCashFlow.label,
      value: formatCurrency(
        additionalMetrics.operatingCashFlow.value,
        additionalMetrics.operatingCashFlow.unit,
        additionalMetrics.operatingCashFlow.currency
      ),
      color: additionalMetrics.operatingCashFlow.color,
    },
    {
      label: additionalMetrics.freeCashFlow.label,
      value: formatCurrency(
        additionalMetrics.freeCashFlow.value,
        additionalMetrics.freeCashFlow.unit,
        additionalMetrics.freeCashFlow.currency
      ),
      color: additionalMetrics.freeCashFlow.color,
    },
    {
      label: additionalMetrics.evEbitda.label,
      value: String(additionalMetrics.evEbitda.value),
      color: additionalMetrics.evEbitda.color,
    },
  ];

  return (
    <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div
        style={{
          fontFamily: "'Roboto Mono', monospace",
          fontSize: 9,
          fontWeight: 500,
          letterSpacing: '0.05em',
          color: '#8A8F98',
          marginBottom: 8,
          flexShrink: 0,
        }}
      >
        QoQ Growth
      </div>

      {/* Growth items - inline label + value */}
      <div style={{ flexShrink: 0 }}>
        {growthItems.map((item, i) => (
          <div
            key={item.label}
            className="fade-in-left"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 6,
              animationDelay: `${i * 0.08}s`,
            }}
          >
            <span
              style={{
                fontFamily: "'Roboto Mono', monospace",
                fontSize: 8,
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#8A8F98',
              }}
            >
              {item.label}
            </span>
            <span
              style={{
                fontFamily: "'Roboto Mono', monospace",
                fontSize: 10,
                fontWeight: 600,
                color: item.color,
              }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          margin: '6px 0 8px',
          flexShrink: 0,
        }}
      />

      {/* Metric items - stacked label above value */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16, minHeight: 0 }}>
        {metricItems.map((item, i) => (
          <div
            key={item.label}
            className="fade-in-left"
            style={{
              animationDelay: `${(growthItems.length + i) * 0.08}s`,
            }}
          >
            <div
              style={{
                fontFamily: "'Roboto Mono', monospace",
                fontSize: 9,
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: '#8A8F98',
                marginBottom: 2,
                lineHeight: 1.2,
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 36,
                fontWeight: 700,
                color: item.color,
                filter: `drop-shadow(0 0 8px ${item.color}50)`,
                lineHeight: 1,
              }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QoQGrowth;
