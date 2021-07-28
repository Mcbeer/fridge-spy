## PRODUCTION CONTAINER ##
FROM node:14 as base_version

# Create app directory
WORKDIR /src

# Copy the package json into the app directory
COPY package*.json ./
COPY yarn.lock ./

FROM base_version as production
ENV NODE_ENV=production
RUN yarn global add pm2
RUN yarn install --frozen-lockfile
COPY . /
ENV PORT=3000
EXPOSE 3000
CMD ["yarn" "start"]

FROM base_version as development
ENV NODE_ENV=development
RUN yarn global add pm2
RUN yarn install
COPY . .
ENV PORT=8000
EXPOSE 8000
RUN ls -al
CMD [ "yarn", "dev" ]