import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'agent';
  content: string;
}

export default function DataAgent() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'agent', content: 'Greetings. I am the Sovereign Data Agent. I have access to real-time global threat indicators, federated data queries, and orchestrator analytics. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsTyping(true);

    // Simulate Agent processing and typing delay
    setTimeout(() => {
      let agentReply = '';
      
      const lowerInput = userMsg.toLowerCase();
      if (lowerInput.includes('data') || lowerInput.includes('dataset') || lowerInput.includes('what data')) {
        agentReply = 'Currently, I am tracking active outbreak vectors across 200+ regions using the disease.sh dataset. Our nodes are performing federated aggregations on case velocity, critical patient loads, and recovery rates. Is there a specific region you want to query?';
      } else if (lowerInput.includes('threat') || lowerInput.includes('intel')) {
        agentReply = 'The latest threat intelligence indicates elevated risk in Southeast Asia and parts of Europe based on our recent DP-federated averages. Our TenSEAL homomorphic encryption pipeline successfully secured the gradient transfers during the last epoch.';
      } else if (lowerInput.includes('nodes') || lowerInput.includes('mesh')) {
        agentReply = 'The Sovereign Mesh currently has 7 active Regional Data Agents and 1 ADK Orchestrator Node online. Latency is stable at ~45ms between the US and EU nodes.';
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        agentReply = 'Hello! I am ready to process federated queries or analyze the global mesh.';
      } else {
        agentReply = 'I am analyzing your query against our encrypted data mesh... Based on the latest aggregated parameters, the variance is within normal thresholds. Would you like me to initiate a new training epoch to investigate further?';
      }

      setMessages(prev => [...prev, { role: 'agent', content: agentReply }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fade-in" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <header className="header" style={{ marginBottom: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem' }}>Data Agent Interface</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Query the Sovereign Mesh naturally. Your data is protected by differential privacy.</p>
        </div>
      </header>

      <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
        
        {/* Chat History */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '12px',
                maxWidth: '80%',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
              }}>
                <div style={{ 
                  width: '36px', height: '36px', borderRadius: '50%', 
                  background: msg.role === 'agent' ? 'rgba(14, 165, 233, 0.2)' : 'rgba(74, 222, 128, 0.2)',
                  border: `1px solid ${msg.role === 'agent' ? '#0ea5e9' : '#4ade80'}`,
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  flexShrink: 0, boxShadow: `0 0 10px ${msg.role === 'agent' ? 'rgba(14, 165, 233, 0.3)' : 'rgba(74, 222, 128, 0.3)'}`
                }}>
                  {msg.role === 'agent' ? 
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    : 
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  }
                </div>
                <div style={{
                  background: msg.role === 'agent' ? 'rgba(255, 255, 255, 0.03)' : 'var(--accent-gradient)',
                  padding: '16px 20px',
                  borderRadius: '16px',
                  borderTopLeftRadius: msg.role === 'agent' ? 0 : '16px',
                  borderTopRightRadius: msg.role === 'user' ? 0 : '16px',
                  border: msg.role === 'agent' ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  color: msg.role === 'agent' ? 'var(--text-primary)' : '#fff',
                  fontSize: '0.95rem',
                  lineHeight: '1.6'
                }}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ 
                  width: '36px', height: '36px', borderRadius: '50%', 
                  background: 'rgba(14, 165, 233, 0.2)', border: '1px solid #0ea5e9',
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  boxShadow: '0 0 10px rgba(14, 165, 233, 0.3)', animation: 'pulse-node 1.5s infinite'
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </div>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)', padding: '16px 24px',
                  borderRadius: '16px', borderTopLeftRadius: 0,
                  border: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex', gap: '6px', alignItems: 'center'
                }}>
                  <span style={{ width: '6px', height: '6px', background: '#0ea5e9', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both' }}></span>
                  <span style={{ width: '6px', height: '6px', background: '#0ea5e9', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '0.2s' }}></span>
                  <span style={{ width: '6px', height: '6px', background: '#0ea5e9', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '0.4s' }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={endOfMessagesRef} />
        </div>

        {/* Input Area */}
        <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border-subtle)', background: 'rgba(5, 5, 8, 0.4)' }}>
          <div style={{ display: 'flex', gap: '12px', background: 'rgba(255, 255, 255, 0.05)', padding: '8px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask the Data Agent about outbreaks, federated nodes, or threat intelligence..."
              style={{ 
                flex: 1, background: 'transparent', border: 'none', color: 'var(--text-primary)', 
                padding: '12px', fontSize: '1rem', outline: 'none' 
              }}
              disabled={isTyping}
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              style={{ 
                background: input.trim() && !isTyping ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.1)',
                border: 'none', width: '48px', borderRadius: '8px',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                cursor: input.trim() && !isTyping ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={input.trim() && !isTyping ? '#fff' : 'var(--text-muted)'} strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
          <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Sovereign Orchestrator runs queries securely via Homomorphic Encryption.
          </div>
        </div>

      </div>
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
