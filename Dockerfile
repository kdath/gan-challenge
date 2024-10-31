ARG NODE_VERSION=18.20.2

FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /usr/src/app

# Copy package.json so that package manager commands can be used.
ADD ./src ./src
COPY package.json .
RUN npm run build
# Expose the port that the application listens on.
EXPOSE 8080

# Run the application.
CMD npm run start