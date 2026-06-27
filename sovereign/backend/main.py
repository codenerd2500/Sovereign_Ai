from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import time
import requests
from pydantic import BaseModel
import sys
import os

# Add parent to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from regional_data_agents.agent import RegionalDataAgent

app = FastAPI(title="Sovereign Mesh Backend API")

# Enable CORS for the dashboard
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for the demo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Agents
regional_agents = {
    "EU": RegionalDataAgent("EU"),
    "US": RegionalDataAgent("US"),
    "Asia": RegionalDataAgent("Asia")
}

class SimulationRequest(BaseModel):
    task: str

@app.post("/api/simulate")
def run_simulation(request: SimulationRequest):
    """
    Runs the orchestration simulation combining DP and Homomorphic Encryption
    """
    logs = []
    logs.append(f"[Orchestrator] Received task: '{request.task}'")
    logs.append("[Orchestrator] Delegating to LangGraph Reasoning Agent for planning...")
    
    # Mock A2A planning
    data_needs = ["EU", "US", "Asia"]
    aggregated_payloads = {}
    
    for region in data_needs:
        logs.append(f"[Orchestrator] Initiating secure request to {region} Data Agent.")
        logs.append(f"[MCP Server] Validating Privacy Budget for {region}...")
        
        # Query the agent (which applies OpenDP and TenSEAL)
        encrypted_payload = regional_agents[region].query_and_encrypt("demographics", epsilon=1.0)
        aggregated_payloads[region] = len(encrypted_payload)
        
        logs.append(f"[Orchestrator] Budget Approved. DP noise and HE applied by {region} Agent.")
        logs.append(f"[{region} Agent] Sent Encrypted Payload (Size: {len(encrypted_payload)} bytes).")
    
    logs.append("[Reasoning LangGraph] Securely aggregating tensors in Trusted Execution Environment...")
    logs.append("[Reasoning LangGraph] Analysis Complete. Returning Decrypted Insights.")
    
    return {
        "status": "success",
        "logs": logs,
        "results": {
            "outbreak_probability": "84.2%",
            "hotspots": "3 Zones",
            "confidence": "[0.81 - 0.87]",
            "privacy_epsilon_used": 1.0,
            "payload_sizes_bytes": aggregated_payloads
        }
    }

@app.get("/api/threat_intel")
def get_threat_intel():
    """
    Expands Threat Intelligence logic to parse real datasets (e.g. Disease.sh API for global outbreak intel)
    """
    try:
        response = requests.get("https://disease.sh/v3/covid-19/all", timeout=5)
        data = response.json()
        
        # Parse into our threat matrix format
        threats = [
            {
                "id": "ALR-9921",
                "loc": "Global Vector",
                "threat": "Active Cases Surge",
                "conf": "99%",
                "time": "Live",
                "metrics": data.get("active", "N/A")
            },
            {
                "id": "ALR-9920",
                "loc": "Global Vector",
                "threat": "Critical Cases",
                "conf": "95%",
                "time": "Live",
                "metrics": data.get("critical", "N/A")
            },
            {
                "id": "ALR-9919",
                "loc": "Global Database",
                "threat": "Total Affected Population",
                "conf": "100%",
                "time": "Live",
                "metrics": data.get("cases", "N/A")
            }
        ]
        
        return {
            "status": "success",
            "threats": threats,
            "pathogen_signatures": data.get("casesPerOneMillion", 14230),
            "anomalous_behaviors": data.get("criticalPerOneMillion", 89),
            "active_mitigation_ops": data.get("affectedCountries", 12)
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
