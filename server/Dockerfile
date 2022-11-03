FROM node:16-alpine as base

WORKDIR /app/server

COPY package.json package-lock.json ./
COPY ./ ./
RUN npm i
EXPOSE 5000
CMD ["npm", "start"]