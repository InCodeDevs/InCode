FROM node:16
EXPOSE 3000
RUN apt-get -y update
RUN apt-get -y install git
WORKDIR /incode-editor
COPY . /incode-editor
RUN yarn
RUN yarn webpack:build-prod
ENTRYPOINT yarn express:only-start