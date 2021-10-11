## PRODUCTION CONTAINER ##
FROM node:14-alpine as base_version

# Create app directory
WORKDIR /product_service

# Copy the package json into the app directory
COPY package*.json /product_service

ENV NODE_ENV=development
RUN npm i -g pnpm
RUN pnpm install
COPY . .
ENV PORT=8000
EXPOSE 8000
CMD [ "pnpm", "run", "dev" ]