FROM node:16
EXPOSE 3000
RUN apt-get -y update
RUN apt-get -y install git
RUN npm install -g lerna
WORKDIR /incode-editor
COPY . /incode-editor
RUN lerna link && lerna bootstrap
RUN lerna webpack:build-prod
ENTRYPOINT yarn express:only-start