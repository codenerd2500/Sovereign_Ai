import { useState, useEffect } from 'react';

export default function ThreatIntel() {
  const [threats, setThreats] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch live threat intel from our Sovereign Python Backend deployed on Cloud Run
    // This backend parses real dataset from Disease.sh for global COVID-19/Outbreak indicators
    fetch('https://sovereign-backend-300725508321.us-central1.run.app/api/threat_intel')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setThreats(data.threats);
          setMetrics({
            signatures: data.pathogen_signatures,
            anomalous: data.anomalous_behaviors,
            mitigation: data.active_mitigation_ops
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch threat intel:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="fade-in" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <header className="header" style={{ marginBottom: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem' }}>Threat Intelligence</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Live global vulnerability & disease tracking feeds (Real Dataset)</p>
        </div>
      </header>

      <div className="dashboard-grid">
        <div className="col-span-8 glass-panel">
          <h3 style={{ marginBottom: '16px', color: 'var(--accent-danger)' }}>Recent Critical Alerts</h3>
          {loading ? (
            <div style={{ color: 'var(--text-muted)' }}>Establishing secure link to Threat Intelligence Backend...</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {threats.map((alert, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: '#f8fafc', marginBottom: '4px' }}>{alert.threat}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      Location: {alert.loc} | ID: {alert.id} <br/>
                      <span style={{ color: 'var(--accent-danger)' }}>Metric Value: {alert.metrics.toLocaleString()}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: 'var(--accent-warning)', fontWeight: 'bold' }}>{alert.conf} Conf.</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{alert.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="col-span-4 glass-panel">
          <h3 style={{ marginBottom: '16px' }}>Threat Matrix (Per Million)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Pathogen Signatures</span>
                <span style={{ fontSize: '0.9rem', color: '#f8fafc', fontWeight: 600 }}>{metrics.signatures?.toLocaleString() || 'N/A'}</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'var(--bg-tertiary)', borderRadius: '3px' }}>
                <div style={{ width: '85%', height: '100%', background: 'var(--accent-primary)', borderRadius: '3px' }}></div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Anomalous Critical Cases</span>
                <span style={{ fontSize: '0.9rem', color: '#f8fafc', fontWeight: 600 }}>{metrics.anomalous?.toLocaleString() || 'N/A'}</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'var(--bg-tertiary)', borderRadius: '3px' }}>
                <div style={{ width: '45%', height: '100%', background: 'var(--accent-warning)', borderRadius: '3px' }}></div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Affected Countries</span>
                <span style={{ fontSize: '0.9rem', color: '#f8fafc', fontWeight: 600 }}>{metrics.mitigation?.toLocaleString() || 'N/A'}</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'var(--bg-tertiary)', borderRadius: '3px' }}>
                <div style={{ width: '15%', height: '100%', background: 'var(--accent-danger)', borderRadius: '3px' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
