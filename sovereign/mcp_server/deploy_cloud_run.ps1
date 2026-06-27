param (
    [Parameter(Mandatory=$true)]
    [string]$ProjectId,
    [Parameter(Mandatory=$true)]
    [string]$RedisHost,
    [string]$RedisPort = "6379"
)

# Set the GCP Project
gcloud config set project $ProjectId

# Build and Submit the container to Google Cloud Build and deploy to Cloud Run
Write-Host "Building and Deploying Sovereign MCP Server to Cloud Run..."
gcloud run deploy sovereign-mcp-server `
    --source . `
    --region us-central1 `
    --allow-unauthenticated `
    --set-env-vars="REDIS_HOST=$RedisHost,REDIS_PORT=$RedisPort"

Write-Host "Deployment Complete! The Cloud Run URL will be provided above."
