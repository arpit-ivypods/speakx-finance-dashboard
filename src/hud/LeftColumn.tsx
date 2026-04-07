import FinancialKPIs from './panels/FinancialKPIs';
import OperatingExpenses from './panels/OperatingExpenses';

const LeftColumn = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      width: '40%',
      height: '100%',
      minWidth: 0,
    }}>
      <div
        className="fade-in-left"
        style={{ flex: '55 1 0%', minHeight: 0, animationDelay: '0.3s' }}
      >
        <FinancialKPIs />
      </div>
      <div
        className="fade-in-left"
        style={{ flex: '45 1 0%', minHeight: 0, animationDelay: '0.4s' }}
      >
        <OperatingExpenses />
      </div>
    </div>
  );
};

export default LeftColumn;
