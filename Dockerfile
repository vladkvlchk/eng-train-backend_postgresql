FROM node:14-alpine3.15

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

COPY ./dist ./dist

CMD ["yarn", "start:dev"]