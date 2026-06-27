FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Cloud Run expects the container to listen on the port specified by the PORT env var (usually 8080).
# We replace the default Nginx port (80) with 8080.
EXPOSE 8080
CMD ["/bin/sh", "-c", "sed -i 's/listen  *80;/listen 8080;/g' /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
