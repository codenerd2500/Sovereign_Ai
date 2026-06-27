import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';

export default function GlobalNodes() {
  const globeEl = useRef<any>(null);
  const [arcsData, setArcsData] = useState<any[]>([]);
  const [ringsData, setRingsData] = useState<any[]>([]);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);

  const N = 12;
  const nodes = [
    { id: 'London (Orchestrator)', lat: 51.5074, lng: -0.1278, color: '#4ade80' },
    { id: 'New York (Agent)', lat: 40.7128, lng: -74.0060, color: '#0ea5e9' },
    { id: 'San Francisco (Agent)', lat: 37.7749, lng: -122.4194, color: '#0ea5e9' },
    { id: 'Tokyo (Agent)', lat: 35.6762, lng: 139.6503, color: '#0ea5e9' },
    { id: 'Singapore (Agent)', lat: 1.3521, lng: 103.8198, color: '#0ea5e9' },
    { id: 'Frankfurt (Agent)', lat: 50.1109, lng: 8.6821, color: '#0ea5e9' },
    { id: 'Sydney (Agent)', lat: -33.8688, lng: 151.2093, color: '#0ea5e9' },
    { id: 'São Paulo (Agent)', lat: -23.5505, lng: -46.6333, color: '#0ea5e9' },
  ];

  useEffect(() => {
    // Auto-rotate
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 1.5;
      globeEl.current.pointOfView({ lat: 20, lng: -20, altitude: 2.2 }, 3000);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Simulate live traffic arcs between nodes
    const interval = setInterval(() => {
      const startNode = nodes[Math.floor(Math.random() * nodes.length)];
      const endNode = nodes[Math.floor(Math.random() * nodes.length)];
      
      if (startNode.id !== endNode.id) {
        const newArc = {
          startLat: startNode.lat,
          startLng: startNode.lng,
          endLat: endNode.lat,
          endLng: endNode.lng,
          color: startNode.color
        };
        setArcsData(prev => [...prev.slice(-15), newArc]);
        
        // Also add a ripple effect at the target node
        const newRing = {
          lat: endNode.lat,
          lng: endNode.lng,
          color: endNode.color
        };
        setRingsData(prev => [...prev.slice(-8), newRing]);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fade-in" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <header className="header" style={{ marginBottom: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem' }}>Global Node Mesh</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Live interactive view of decentralized Sovereign agents. Drag to rotate, scroll to zoom.</p>
        </div>
      </header>

      <div className="glass-panel" style={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '24px', left: '24px', zIndex: 10, background: 'rgba(10,10,16,0.7)', padding: '16px', borderRadius: '12px', backdropFilter: 'blur(8px)', border: '1px solid var(--border-subtle)' }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '1.1rem' }}>Active Mesh Nodes</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 10px #4ade80' }}></div>
              <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>London (ADK Core)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#0ea5e9', boxShadow: '0 0 10px #0ea5e9', animation: 'pulse-node 2s infinite' }}></div>
              <span style={{ color: 'var(--text-secondary)' }}>Global Compute Nodes (7)</span>
            </div>
          </div>
          
          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>NETWORK TRAFFIC</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: '700', color: '#fff', fontFamily: 'monospace' }}>24.8</span>
              <span style={{ color: 'var(--text-secondary)' }}>GB/s</span>
            </div>
          </div>
        </div>

        <div ref={containerRef} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Globe
            ref={globeEl}
            width={dimensions.width}
            height={dimensions.height}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            backgroundColor="rgba(0,0,0,0)"
            labelsData={nodes}
            labelLat="lat"
            labelLng="lng"
            labelText="id"
            labelSize={1.5}
            labelDotRadius={0.6}
            labelColor="color"
            labelResolution={2}
            arcsData={arcsData}
            arcStartLat="startLat"
            arcStartLng="startLng"
            arcEndLat="endLat"
            arcEndLng="endLng"
            arcColor="color"
            arcDashLength={0.4}
            arcDashGap={0.2}
            arcDashAnimateTime={1500}
            ringsData={ringsData}
            ringLat="lat"
            ringLng="lng"
            ringColor="color"
            ringMaxRadius={5}
            ringPropagationSpeed={2}
            ringRepeatPeriod={800}
          />
        </div>
      </div>
    </div>
  );
}
