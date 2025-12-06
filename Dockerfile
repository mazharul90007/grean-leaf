# Stage 1: Build stage
FROM node:24-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies (including dev dependencies for building)
RUN npm install

# Copy Prisma schema and config
COPY prisma ./prisma

# Generate Prisma Client
RUN npx prisma generate

# Copy rest of the code
COPY . .

# Build TypeScript code
RUN npm run build

# Expose port
EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]
