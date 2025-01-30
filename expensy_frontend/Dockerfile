# Frontend Dockerfile (frontend/Dockerfile)

# Use Node.js for building Next.js
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application source code
COPY . .

# Build the Next.js app
RUN npm run build

# Production image
FROM node:18 AS runner
WORKDIR /app

# Copy built files
COPY --from=builder /app ./

# Expose frontend port
EXPOSE 3000

# Start Next.js in production mode
CMD ["npm", "start"]
