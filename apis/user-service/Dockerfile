FROM node:14-alpine

# Create app directory
WORKDIR /src

# Copy the package json into the app directory
COPY package*.json ./

ENV NODE_ENV=development
RUN npm i -g pnpm
RUN pnpm install
COPY . /
ENV PORT=8001
EXPOSE 8001
CMD [ "pnpm" "run" "dev" ]
