FROM node:16
EXPOSE 3000
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
VOLUME /root
RUN yarn install
RUN cd /usr/src/app/packages/app && yarn webpack:build-prod
ENTRYPOINT cd /usr/src/app/packages/server && yarn express:only-start