FROM python:3.11-slim

WORKDIR /app

# Copy the MCP server specific requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy server code
COPY server.py .

# Expose port (Cloud Run sets the PORT env var)
ENV PORT=8080
EXPOSE 8080

CMD ["python", "server.py"]
