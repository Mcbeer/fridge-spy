FROM node:14-alpine

# Create app directory
WORKDIR /src

# Copy the package json into the app directory
COPY package*.json ./
COPY yarn.lock ./

ENV NODE_ENV=development
RUN yarn global add pm2
RUN yarn install
COPY . /
ENV PORT=8000
EXPOSE 8000
CMD [ "yarn" "dev" ]
