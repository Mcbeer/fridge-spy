FROM node:14-alpine

# Create app directory
WORKDIR /

# Copy the package json into the app directory
COPY package*.json ./

ENV NODE_ENV=development
RUN npm i
COPY . /
ENV PORT=8001
EXPOSE 8001
CMD ["npm", "run", "dev"]
