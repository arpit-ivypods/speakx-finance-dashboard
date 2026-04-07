import FinancialAnalysis from './panels/FinancialAnalysis';
import MarginTrends from './panels/MarginTrends';
import CashFlowAnalysis from './panels/CashFlowAnalysis';
import ForecastPanel from './panels/ForecastPanel';
import { useBreakpoint } from '../hooks/useBreakpoint';

const RightColumn = () => {
  const { isMobile, isDesktop } = useBreakpoint();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? '12px' : '12px',
      width: isDesktop ? '60%' : '100%',
      height: isDesktop ? '100%' : undefined,
      minWidth: 0,
    }}>
      <div
        className="fade-in-right"
        style={{
          flex: isDesktop ? '30 1 0%' : undefined,
          minHeight: isMobile ? 420 : 0,
          animationDelay: '0.5s',
        }}
      >
        <FinancialAnalysis />
      </div>
      <div
        className="fade-in-right"
        style={{
          flex: isDesktop ? '35 1 0%' : undefined,
          minHeight: isMobile ? 280 : 0,
          animationDelay: '0.6s',
        }}
      >
        <MarginTrends />
      </div>
      <div
        className="fade-in-up"
        style={{
          flex: isDesktop ? '30 1 0%' : undefined,
          minHeight: isMobile ? 0 : 0,
          animationDelay: '0.7s',
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '12px' : '12px',
          height: isDesktop ? '100%' : undefined,
        }}>
          <div style={{ flex: 1, minWidth: 0, minHeight: isMobile ? 180 : undefined }}>
            <CashFlowAnalysis />
          </div>
          <div style={{ flex: 1, minWidth: 0, minHeight: isMobile ? 200 : undefined }}>
            <ForecastPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightColumn;
