FROM node:14

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY src src
COPY tsconfig.json ./tsconfig.json
COPY openapi.json ./openapi.json

CMD yarn start
