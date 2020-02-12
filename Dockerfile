FROM node:10-alpine
COPY . /app
WORKDIR /app
EXPOSE 3000
ENTRYPOINT nodejs index.js