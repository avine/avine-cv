FROM node:10-alpine AS build

WORKDIR /www

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY webpack.config.js .

WORKDIR /www/src
COPY src .

RUN npm run build

FROM nginx:stable AS prod

WORKDIR /www/dist
COPY --from=build /www/dist .

WORKDIR /tmp
COPY nginx.conf .
RUN cat nginx.conf > /etc/nginx/conf.d/default.conf
WORKDIR /etc/nginx/conf.d
