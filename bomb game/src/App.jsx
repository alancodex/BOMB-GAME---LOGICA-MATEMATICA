import BombAssembly from "./components/Bomb/BombAssembly";
import ManualSection from "./components/Manual/ManualSection";

const appStyle = {
  minHeight: '100vh',
  backgroundColor: '#1a1a1a',
  color: 'white',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

const mainLayoutStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '40px',
  width: '100%',
  maxWidth: '1400px',
  margin: '30px auto',
  alignItems: 'flex-start'
};

const manualContainerStyle = {
  width: '350px',
  height: '600px',
  position: 'sticky',
  top: '20px'
};

export default function App() {
  return (
    
    <div style={appStyle}>
      <h1 style={{ fontSize: '2.5rem', margin: '20px 0', color: '#ff5555' }}>
        💣 DESARME A BOMBA!
      </h1>
      
      <div style={mainLayoutStyle}>
        <BombAssembly />
        <div style={manualContainerStyle}>
          <ManualSection />
        </div>
      </div>
    </div>
  );
}