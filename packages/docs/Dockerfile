FROM node:16
EXPOSE 3000
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN yarn install
RUN yarn build
ENTRYPOINT yarn serve -- --port 3000 --host 0.0.0.0