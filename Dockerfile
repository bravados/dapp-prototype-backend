
# Setting up a builder stage
# Base image to install dependencies and build the application
FROM node:18.15.0-alpine3.17 as builder
WORKDIR /app
ADD . /app

# Install dev dependecies
RUN yarn install --production=false --frozen-lockfile
# Build the application
RUN yarn build

# Remove dev dependencies from node_modules
ENV NODE_ENV=production
RUN yarn install --production=true --frozen-lockfile

# Define the relase image based in Node.js binary.
# Application runs on it
FROM node:18.15.0-alpine3.17
ENV NODE_ENV=production
ENV PORT=80
WORKDIR /app
COPY --from=builder /app .
