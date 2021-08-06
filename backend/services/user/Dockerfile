## PRODUCTION CONTAINER ##
FROM node:14 as base_version

# Create app directory
WORKDIR /user_service

# Copy the package json into the app directory
COPY package*.json /user_service
COPY yarn.lock /user_service

RUN ls -al

FROM base_version as production
ENV NODE_ENV=production
RUN yarn global add @nestjs/cli
RUN yarn install --frozen-lockfile
COPY . .
ENV PORT=3000
EXPOSE 3000
CMD ["yarn" "start"]

FROM base_version as development
ENV NODE_ENV=development
RUN yarn global add @nestjs/cli
RUN yarn install
COPY . .
ENV PORT=8000
EXPOSE 8000
RUN ls -al
CMD [ "yarn", "start:dev" ]