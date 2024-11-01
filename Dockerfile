FROM node:22

# Create app directory
WORKDIR /app

# Install dependnecies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source code
COPY src src/

# Run as non-root user
USER node

EXPOSE 8083

CMD [ "node", "--experimental-transform-types", "./src/index.ts" ]
