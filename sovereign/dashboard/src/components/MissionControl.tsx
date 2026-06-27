import { useState, useEffect, useRef } from 'react';

const IconIntel = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const IconPlay = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>;

type AgentState = 'idle' | 'processing' | 'active' | 'done';

export default function MissionControl() {
  const [activeTask, setActiveTask] = useState<string | null>(null);
  const [logs, setLogs] = useState<{text: string, type: string}[]>([]);
  const [privacyBudget, setPrivacyBudget] = useState({ EU: 9.0, US: 8.5, Asia: 10.0 });
  const [showResults, setShowResults] = useState(false);
  
  const [nodes, setNodes] = useState<Record<string, AgentState>>({
    orchestrator: 'idle',
    eu: 'idle',
    us: 'idle',
    asia: 'idle',
    reasoning: 'idle'
  });

  const [activeLinks, setActiveLinks] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (text: string, type: 'normal' | 'success' | 'warning' = 'normal') => {
    setLogs(prev => [...prev, { text, type }]);
  };

  const runSimulation = () => {
    setActiveTask("Global Disease Tracking Federation");
    setShowResults(false);
    setLogs([]);
    
    addLog("Task Initiated: Global Disease Tracking Federation", "success");
    setNodes(n => ({...n, orchestrator: 'active'}));
    
    setTimeout(() => {
      addLog("[Orchestrator] Broadcasting homomorphic encryption keys to Regional Agents...");
      setActiveLinks(['orch-eu', 'orch-us', 'orch-asia']);
      setNodes(n => ({...n, eu: 'processing', us: 'processing', asia: 'processing'}));
    }, 1500);

    setTimeout(() => {
      addLog("[MCP] Deducting Privacy Budget (ε = 1.0) from all regions...", "warning");
      setPrivacyBudget(prev => ({ EU: prev.EU - 1.0, US: prev.US - 1.0, Asia: prev.Asia - 1.0 }));
    }, 3000);

    setTimeout(() => {
      addLog("[EU Agent] Differential Privacy Noise added. Data encrypted (TenSEAL).");
      addLog("[US Agent] Differential Privacy Noise added. Data encrypted (TenSEAL).");
      addLog("[Asia Agent] Differential Privacy Noise added. Data encrypted (TenSEAL).");
      setActiveLinks(['eu-reason', 'us-reason', 'asia-reason']);
      setNodes(n => ({...n, eu: 'done', us: 'done', asia: 'done', reasoning: 'processing'}));
    }, 5000);

    setTimeout(() => {
      addLog("[Reasoning LangGraph] Receiving Encrypted Tensors. Performing secure aggregation...");
    }, 6500);

    setTimeout(() => {
      addLog("[Reasoning LangGraph] Decrypting final aggregated result on secure enclave...", "warning");
      setNodes(n => ({...n, reasoning: 'active'}));
    }, 8000);

    setTimeout(() => {
      addLog("Analysis Complete! Actionable Intelligence generated.", "success");
      setNodes(n => ({...n, orchestrator: 'idle', reasoning: 'idle'}));
      setActiveLinks([]);
      setActiveTask(null);
      setShowResults(true);
    }, 10000);
  };

  return (
    <div className="fade-in">
      <header className="header">
        <div>
          <h1 style={{ fontSize: '2rem' }}>Federated Analytics Control</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Secure Multi-Party Computation Environment</p>
        </div>
        <button 
          className="launch-btn"
          onClick={runSimulation}
          disabled={activeTask !== null}
        >
          <IconPlay />
          {activeTask ? 'Execution in Progress...' : 'Launch Simulation'}
        </button>
      </header>

      <div className="dashboard-grid">
        {/* Top Mesh Visualizer */}
        <div className="glass-panel col-span-12">
          <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', background: activeTask ? 'var(--accent-primary)' : 'var(--text-muted)', borderRadius: '50%', boxShadow: activeTask ? '0 0 10px var(--accent-primary)' : 'none' }}></span>
            Live Local Mesh
          </h3>
          <div className="mesh-visualizer">
            <svg className="mesh-lines">
              <line x1="50%" y1="20%" x2="20%" y2="50%" className={`mesh-line ${activeLinks.includes('orch-us') ? 'active' : ''}`} />
              <line x1="50%" y1="20%" x2="50%" y2="50%" className={`mesh-line ${activeLinks.includes('orch-eu') ? 'active' : ''}`} />
              <line x1="50%" y1="20%" x2="80%" y2="50%" className={`mesh-line ${activeLinks.includes('orch-asia') ? 'active' : ''}`} />
              
              <line x1="20%" y1="50%" x2="50%" y2="80%" className={`mesh-line ${activeLinks.includes('us-reason') ? 'active' : ''}`} strokeDasharray="5,5" />
              <line x1="50%" y1="50%" x2="50%" y2="80%" className={`mesh-line ${activeLinks.includes('eu-reason') ? 'active' : ''}`} strokeDasharray="5,5" />
              <line x1="80%" y1="50%" x2="50%" y2="80%" className={`mesh-line ${activeLinks.includes('asia-reason') ? 'active' : ''}`} strokeDasharray="5,5" />
            </svg>

            <div className={`mesh-node ${nodes.orchestrator}`} style={{ top: '20%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <div className="mesh-dot"></div>
              <div className="mesh-label">ADK Orchestrator</div>
            </div>

            <div className={`mesh-node ${nodes.us}`} style={{ top: '50%', left: '20%', transform: 'translate(-50%, -50%)' }}>
              <div className="mesh-dot"></div>
              <div className="mesh-label">US Data Agent (OpenDP)</div>
            </div>
            <div className={`mesh-node ${nodes.eu}`} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <div className="mesh-dot"></div>
              <div className="mesh-label">EU Data Agent (OpenDP)</div>
            </div>
            <div className={`mesh-node ${nodes.asia}`} style={{ top: '50%', left: '80%', transform: 'translate(-50%, -50%)' }}>
              <div className="mesh-dot"></div>
              <div className="mesh-label">Asia Data Agent (OpenDP)</div>
            </div>

            <div className={`mesh-node ${nodes.reasoning}`} style={{ top: '80%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <div className="mesh-dot"></div>
              <div className="mesh-label">LangGraph Engine</div>
            </div>
          </div>
        </div>

        {/* Left Column: Budgets */}
        <div className="col-span-4" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel">
            <h3 style={{ marginBottom: '16px' }}>Privacy Budgets (ε)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>EU Region</span>
                <span className={`budget-val ${privacyBudget.EU > 3 ? 'safe' : 'warn'}`}>{privacyBudget.EU.toFixed(2)}</span>
              </div>
              <div style={{ height: '1px', background: 'var(--border-subtle)' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>US Region</span>
                <span className={`budget-val ${privacyBudget.US > 3 ? 'safe' : 'warn'}`}>{privacyBudget.US.toFixed(2)}</span>
              </div>
              <div style={{ height: '1px', background: 'var(--border-subtle)' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Asia Region</span>
                <span className={`budget-val ${privacyBudget.Asia > 3 ? 'safe' : 'warn'}`}>{privacyBudget.Asia.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Execution Terminal */}
        <div className="col-span-8 glass-panel">
          <h3 style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
            Execution Logs
            <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>Secure A2A Channel</span>
          </h3>
          <div className="terminal" ref={terminalRef}>
            <div className="terminal-line"><span className="terminal-prefix">SYS</span> Sovereign Mesh Core v2.4 initialized.</div>
            {logs.length === 0 && !activeTask && (
              <div className="terminal-line" style={{ color: 'var(--text-muted)' }}>System standing by. Awaiting orchestration vector...</div>
            )}
            {logs.map((log, idx) => (
              <div key={idx} className={`terminal-line terminal-${log.type}`}>
                <span className="terminal-prefix">EXE</span>
                {log.text}
              </div>
            ))}
            {activeTask && (
              <div className="terminal-line" style={{ animation: 'pulse-node 1s infinite' }}>_</div>
            )}
          </div>
        </div>

        {/* Dynamic Results Reveal */}
        {showResults && (
          <div className="col-span-12 glass-panel fade-in" style={{ borderColor: 'var(--accent-primary)', background: 'rgba(74, 222, 128, 0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ padding: '8px', background: 'rgba(74, 222, 128, 0.2)', borderRadius: '8px', color: 'var(--accent-primary)' }}>
                <IconIntel />
              </div>
              <h3>Analysis Results: Disease Tracking</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.6' }}>
              Cross-regional federated data successfully decrypted via homomorphic keys. No sensitive PII was exposed during the transit or aggregation phases.
            </p>
            
            <div className="results-grid">
              <div className="result-card">
                <span className="label">Outbreak Probability</span>
                <span className="value" style={{ color: 'var(--accent-warning)' }}>84.2%</span>
              </div>
              <div className="result-card">
                <span className="label">Identified Hotspots</span>
                <span className="value">3 Zones (US-East, EU-Central, Asia-South)</span>
              </div>
              <div className="result-card">
                <span className="label">Prediction Confidence</span>
                <span className="value" style={{ color: 'var(--accent-primary)' }}>[0.81 - 0.87]</span>
              </div>
              <div className="result-card">
                <span className="label">Total Nodes Queried</span>
                <span className="value">3,450 Hospitals</span>
              </div>
              <div className="result-card">
                <span className="label">Privacy Cost (Epsilon)</span>
                <span className="value">1.0 per region</span>
              </div>
              <div className="result-card">
                <span className="label">Decryption Time</span>
                <span className="value">1.4 seconds</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
