import { useState } from 'react';
import './index.css';

import MissionControl from './components/MissionControl';
import GlobalNodes from './components/GlobalNodes';
import ThreatIntel from './components/ThreatIntel';
import Settings from './components/Settings';
import DataAgent from './components/DataAgent';

// SVG Icons
const IconDashboard = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>;
const IconNodes = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><path d="M10 7L7 16"/><path d="M14 7l3 10"/></svg>;
const IconSettings = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
const IconIntel = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const IconAgent = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;

function App() {
  const [activeTab, setActiveTab] = useState<'mission' | 'nodes' | 'intel' | 'agent' | 'settings'>('mission');

  const renderContent = () => {
    switch (activeTab) {
      case 'mission': return <MissionControl />;
      case 'nodes': return <GlobalNodes />;
      case 'intel': return <ThreatIntel />;
      case 'agent': return <DataAgent />;
      case 'settings': return <Settings />;
      default: return <MissionControl />;
    }
  };

  return (
    <div className="app-container fade-in">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="logo">
          <IconDashboard />
          Sovereign Mesh
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div 
            className={`nav-item ${activeTab === 'mission' ? 'active' : ''}`}
            onClick={() => setActiveTab('mission')}
          >
            <IconDashboard /> Mission Control
          </div>
          <div 
            className={`nav-item ${activeTab === 'nodes' ? 'active' : ''}`}
            onClick={() => setActiveTab('nodes')}
          >
            <IconNodes /> Global Nodes
          </div>
          <div 
            className={`nav-item ${activeTab === 'intel' ? 'active' : ''}`}
            onClick={() => setActiveTab('intel')}
          >
            <IconIntel /> Threat Intel
          </div>
          <div 
            className={`nav-item ${activeTab === 'agent' ? 'active' : ''}`}
            onClick={() => setActiveTab('agent')}
          >
            <IconAgent /> Data Agent
          </div>
          <div 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <IconSettings /> Settings
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
