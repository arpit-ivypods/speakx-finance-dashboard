import FinancialAnalysis from './panels/FinancialAnalysis';
import MarginTrends from './panels/MarginTrends';
import CashFlowAnalysis from './panels/CashFlowAnalysis';
import ForecastPanel from './panels/ForecastPanel';

const RightColumn = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      width: '60%',
      height: '100%',
      minWidth: 0,
    }}>
      <div
        className="fade-in-right"
        style={{ flex: '30 1 0%', minHeight: 0, animationDelay: '0.5s' }}
      >
        <FinancialAnalysis />
      </div>
      <div
        className="fade-in-right"
        style={{ flex: '35 1 0%', minHeight: 0, animationDelay: '0.6s' }}
      >
        <MarginTrends />
      </div>
      <div
        className="fade-in-up"
        style={{ flex: '30 1 0%', minHeight: 0, animationDelay: '0.7s' }}
      >
        <div style={{
          display: 'flex',
          gap: '12px',
          height: '100%',
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <CashFlowAnalysis />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <ForecastPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightColumn;
