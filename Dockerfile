FROM node:12-alpine

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install --production

COPY . /app/

CMD node src/server
