import Header from './Header';
import LeftColumn from './LeftColumn';
import RightColumn from './RightColumn';

const HUD = () => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 10,
      pointerEvents: 'auto',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      boxSizing: 'border-box',
      overflow: 'hidden',
    }}>
      <Header />
      <div style={{
        display: 'flex',
        gap: '16px',
        flex: 1,
        marginTop: '12px',
        minHeight: 0,
      }}>
        <LeftColumn />
        <RightColumn />
      </div>
    </div>
  );
};

export default HUD;
