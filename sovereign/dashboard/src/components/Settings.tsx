import { useState, useEffect } from 'react';

export default function Settings() {
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] ADK Orchestrator initialized.",
    "[AGENT] Fetching initial privacy constraints...",
    "[CRYPTO] TenSEAL context loaded."
  ]);

  useEffect(() => {
    const events = [
      "[NETWORK] Re-evaluating mesh connectivity...",
      "[AGENT] Synchronizing local gradients.",
      "[PRIVACY] Noise addition successful. Epsilon intact.",
      "[CRYPTO] Key rotation scheduled.",
      "[DATA] 43,921 new records processed safely.",
      "[SYSTEM] Node heartbeat verified: Tokyo, London, NYC",
      "[AGENT] Anomaly detected in US Data stream, isolating...",
      "[NETWORK] Latency spike handled via secondary relay.",
    ];

    const interval = setInterval(() => {
      setLogs(prev => {
        const newEvent = events[Math.floor(Math.random() * events.length)];
        const time = new Date().toLocaleTimeString();
        const updated = [...prev, `${time} ${newEvent}`];
        if (updated.length > 8) return updated.slice(updated.length - 8);
        return updated;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fade-in" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <header className="header" style={{ marginBottom: '0' }}>
        <div>
          <h1 style={{ fontSize: '2rem' }}>Mesh Settings & Logs</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Configure ADK Orchestrator and monitor live system behavior</p>
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
          
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)' }}></div>
                Differential Privacy Config
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Global Epsilon (ε) Budget</label>
                  <input type="range" min="0.1" max="10" step="0.1" defaultValue="8.5" style={{ width: '100%', accentColor: 'var(--accent-primary)' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <span>Strict (0.1)</span>
                    <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>Current: 8.5</span>
                    <span>Loose (10.0)</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Delta (δ) Parameter</label>
                  <select style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', padding: '10px', borderRadius: '6px', outline: 'none' }}>
                    <option>1e-5 (Strict)</option>
                    <option selected>1e-4 (Balanced)</option>
                    <option>1e-3 (Loose)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-secondary)' }}></div>
                Homomorphic Encryption (TenSEAL)
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Polynomial Modulus Degree</span>
                  <span style={{ background: 'var(--bg-tertiary)', padding: '4px 12px', borderRadius: '4px', fontFamily: 'monospace' }}>8192</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Coefficient Modulus Bit Sizes</span>
                  <span style={{ background: 'var(--bg-tertiary)', padding: '4px 12px', borderRadius: '4px', fontFamily: 'monospace' }}>[60, 40, 40, 60]</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Scale (Global)</span>
                  <span style={{ background: 'var(--bg-tertiary)', padding: '4px 12px', borderRadius: '4px', fontFamily: 'monospace' }}>2^40</span>
                </div>
              </div>
            </div>
            
            <button style={{ marginTop: '24px', background: 'transparent', border: '1px solid var(--accent-secondary)', color: 'var(--accent-secondary)', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', width: '100%', transition: 'all 0.2s', fontWeight: '600' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(14, 165, 233, 0.1)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
              Regenerate Context Keys
            </button>
          </div>
        </div>

        <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b', animation: 'pulse-node 2s infinite' }}></span>
            Live Agentic Terminal
          </h3>
          <div className="terminal" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', background: '#050508', border: '1px solid #1f2937', height: '200px' }}>
            {logs.map((log, i) => {
              let color = '#a1a1aa';
              if (log.includes('[SYSTEM]')) color = '#0ea5e9';
              if (log.includes('[AGENT]')) color = '#4ade80';
              if (log.includes('[CRYPTO]')) color = '#c084fc';
              if (log.includes('[PRIVACY]')) color = '#f472b6';
              if (log.includes('anomaly') || log.includes('spike')) color = '#f59e0b';
              
              return (
                <div key={i} className="terminal-line" style={{ animation: 'fadeIn 0.3s ease', color }}>
                  <span className="terminal-prefix" style={{ color: '#475569' }}>&gt;</span> {log}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
