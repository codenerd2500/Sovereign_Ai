import time
import sys
import os

# Add parent directory to path to import regional_agents
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from regional_data_agents.agent import RegionalDataAgent

class SovereignOrchestrator:
    """
    The Mesh Coordinator. Built conceptually around ADK to handle A2A communication
    and task routing between LangGraph and Regional Data Agents.
    """
    def __init__(self):
        print("[Orchestrator] Initialized Sovereign Orchestrator.")
        # Initialize regional agents
        self.regional_agents = {
            "EU": RegionalDataAgent("EU"),
            "US": RegionalDataAgent("US")
        }
        
    def route_task(self, task: str):
        """
        Receives a task, triggers the Reasoning Agent to plan, then fetches data from Regional Agents via A2A.
        """
        print(f"\n[Orchestrator] Received task: '{task}'")
        print("[Orchestrator] -> Delegating to LangGraph Reasoning Agent for planning...")
        time.sleep(1) # Mock A2A call delay
        
        # Mock receiving plan and data needs from the Reasoning Agent
        data_needs = [{"region": "EU", "query": "demographics"}, {"region": "US", "query": "disease vectors"}]
        
        aggregated_encrypted_payloads = {}
        
        for need in data_needs:
            region = need['region']
            query = need['query']
            print(f"\n[Orchestrator] -> A2A: Initiating secure request to Regional Agent ({region}).")
            print(f"[Orchestrator] [!] Validating with MCP Server for privacy budget...")
            
            # Here we mock the FastMCP deduction. Let's assume epsilon=1.0 is approved.
            time.sleep(0.5)
            print(f"[Orchestrator] [✓] Privacy budget approved for {region}. Proceeding with query.")
            
            # Fetch encrypted data via A2A
            encrypted_payload = self.regional_agents[region].query_and_encrypt(query, epsilon=1.0)
            aggregated_encrypted_payloads[region] = encrypted_payload
            
            print(f"[Orchestrator] <- A2A: Received Encrypted DP data from {region} agent. Size: {len(encrypted_payload)} bytes.")
            
        print("\n[Orchestrator] -> A2A: Returning aggregated encrypted payloads to Reasoning Agent synthesizer...")

if __name__ == "__main__":
    orchestrator = SovereignOrchestrator()
    orchestrator.route_task("Conduct cross-border disease tracking analysis without sharing raw PII.")
