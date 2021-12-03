FROM node:16
EXPOSE 3000
WORKDIR /incode-editor
COPY . /incode-editor
RUN yarn
RUN yarn webpack:build-prod
ENTRYPOINT yarn express:only-start