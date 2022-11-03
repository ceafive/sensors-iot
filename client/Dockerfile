FROM node:16-alpine as base
WORKDIR /app/client
COPY package.json package-lock.json ./

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
then npm install; \
else npm install --omit=dev; \
fi

COPY . .
EXPOSE 3000
CMD ["npm", "start"]
