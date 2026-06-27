param (
    [Parameter(Mandatory=$true)]
    [string]$ProjectId
)

# Set the GCP Project
gcloud config set project $ProjectId

# Enable necessary APIs
Write-Host "Enabling required Google Cloud APIs (Redis, Cloud SQL, Cloud Run)..."
gcloud services enable redis.googleapis.com sqladmin.googleapis.com run.googleapis.com

Write-Host "--------------------------------------------------------"
Write-Host "1. Provisioning Cloud Memorystore for Redis (Privacy Tracker)"
Write-Host "--------------------------------------------------------"
# Basic tier, 1GB to keep costs low on the trial account
gcloud redis instances create sovereign-redis `
    --size=1 `
    --region=us-central1 `
    --tier=basic `
    --network=default

Write-Host "--------------------------------------------------------"
Write-Host "2. Provisioning Cloud SQL PostgreSQL (Regional Databases)"
Write-Host "--------------------------------------------------------"
# Using small shared-core instances to save trial credits

Write-Host "-> Creating US Region Database (us-central1)..."
gcloud sql instances create sovereign-pg-us `
    --database-version=POSTGRES_15 `
    --tier=db-f1-micro `
    --region=us-central1 `
    --root-password="us-trial-password-123"

Write-Host "-> Creating EU Region Database (europe-west1)..."
gcloud sql instances create sovereign-pg-eu `
    --database-version=POSTGRES_15 `
    --tier=db-f1-micro `
    --region=europe-west1 `
    --root-password="eu-trial-password-123"

Write-Host "-> Creating Asia Region Database (asia-northeast1)..."
gcloud sql instances create sovereign-pg-asia `
    --database-version=POSTGRES_15 `
    --tier=db-f1-micro `
    --region=asia-northeast1 `
    --root-password="asia-trial-password-123"

Write-Host "--------------------------------------------------------"
Write-Host "Fetching Connection Info..."
Write-Host "--------------------------------------------------------"

$RedisHost = gcloud redis instances describe sovereign-redis --region=us-central1 --format="value(host)"
$RedisPort = gcloud redis instances describe sovereign-redis --region=us-central1 --format="value(port)"

Write-Host "Redis Endpoint: $RedisHost`:$RedisPort"
Write-Host "PostgreSQL instances created. You can view their public IPs in the GCP Console."
Write-Host "Note: Cloud Memorystore (Redis) is only accessible within the default VPC network by default. To run the MCP Server locally, we may need to set up a serverless VPC connector or deploy the server to Cloud Run."
