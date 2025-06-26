# Use the official Node.js runtime as the base image
FROM node:20-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the React app if needed
RUN if [ -d "jest-integrate-vite" ]; then cd jest-integrate-vite && npm install && npm run build; fi

# Expose the port the app runs on
EXPOSE 5000

# Define the command to run the application
CMD ["npm", "start"]