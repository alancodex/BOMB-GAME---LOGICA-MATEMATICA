import BombTimer from "./BombTimer";
import WiresSection from "./WiresSection";
import SwitchesSection from "./SwitchesSection";
import ButtonsSection from "./ButtonsSection";

const bombContainerStyle = {
  display: 'flex',
  gap: '30px',
  width: '100%',
  maxWidth: '1000px'
};

const leftPanelStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
  backgroundColor: '#2a2a2a',
  borderRadius: '15px',
  padding: '25px',
  boxShadow: '0 0 20px rgba(255, 50, 50, 0.3)',
  border: '2px solid #ff5555'
};

const rightPanelStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
  backgroundColor: '#2a2a2a',
  borderRadius: '15px',
  padding: '25px',
  boxShadow: '0 0 20px rgba(255, 50, 50, 0.3)',
  border: '2px solid #ff5555'
};

export default function BombAssembly() {
  return (
    <div style={bombContainerStyle}>
      {/* Bloco Esquerdo */}
      <div style={leftPanelStyle}>
        <BombTimer initialTime={300} />
        <WiresSection />
      </div>

      {/* Bloco Direito */}
      <div style={rightPanelStyle}>
        <SwitchesSection />
        <ButtonsSection />
      </div>
    </div>
  );
}