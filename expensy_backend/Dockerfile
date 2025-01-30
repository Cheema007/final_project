# Backend Dockerfile (backend/Dockerfile)

# Use Node.js official image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application source code
COPY . .

# Expose API port
EXPOSE 8706

# Start the backend service
CMD ["npm", "start"]


