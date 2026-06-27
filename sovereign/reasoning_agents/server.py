import os
import json
import redis
from mcp.server.fastmcp import FastMCP

# Initialize Redis client (using environment variables for GCP Cloud Memorystore or local fallback)
REDIS_HOST = os.environ.get("REDIS_HOST", "localhost")
REDIS_PORT = int(os.environ.get("REDIS_PORT", 6379))
redis_client = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0, decode_responses=True)

# Initialize MCP Server
mcp = FastMCP("Sovereign Privacy & Compliance Server")

@mcp.tool()
def deduct_privacy_budget(region: str, epsilon: float, query_description: str) -> str:
    """
    Atomically checks and deducts the privacy budget (epsilon) for a given region using Redis.
    Logs the query for compliance auditing.
    """
    budget_key = f"privacy_budget:{region}"
    audit_log_key = f"audit_log:{region}"
    
    # Use Redis transaction for atomic check-and-deduct
    with redis_client.pipeline() as pipe:
        while True:
            try:
                pipe.watch(budget_key)
                current_budget_str = pipe.get(budget_key)
                
                # Initialize budget if it doesn't exist (e.g., max 10.0 epsilon per region)
                current_budget = float(current_budget_str) if current_budget_str else 10.0
                
                if current_budget < epsilon:
                    pipe.unwatch()
                    return f"ERROR: Insufficient privacy budget for region {region}. Required: {epsilon}, Available: {current_budget}"
                
                new_budget = current_budget - epsilon
                
                # Execute transaction
                pipe.multi()
                pipe.set(budget_key, new_budget)
                
                # Log for audit
                audit_entry = {
                    "action": "deduct_budget",
                    "epsilon": epsilon,
                    "query": query_description,
                    "remaining_budget": new_budget
                }
                pipe.rpush(audit_log_key, json.dumps(audit_entry))
                
                pipe.execute()
                break
            except redis.WatchError:
                # Value changed during transaction, retry
                continue

    return f"SUCCESS: Deducted {epsilon} from {region} budget. Remaining: {new_budget:.4f}"

@mcp.tool()
def log_compliance_event(agent_name: str, action: str, details: str) -> str:
    """
    Logs an event for GDPR/HIPAA compliance audit.
    """
    log_key = "compliance_audit_logs"
    entry = {
        "agent": agent_name,
        "action": action,
        "details": details
    }
    redis_client.rpush(log_key, json.dumps(entry))
    return f"Logged compliance event for {agent_name}."

@mcp.tool()
def get_audit_logs(region: str) -> str:
    """
    Retrieves audit logs for a specific region.
    """
    audit_log_key = f"audit_log:{region}"
    logs = redis_client.lrange(audit_log_key, 0, -1)
    return json.dumps([json.loads(log) for log in logs], indent=2)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    print(f"Starting Sovereign Privacy & Compliance MCP Server on port {port}...")
    # Cloud Run requires an HTTP server, so we use SSE transport instead of the default stdio
    mcp.run(transport="sse", host="0.0.0.0", port=port)
