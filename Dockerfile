FROM node:16
EXPOSE 3000
RUN apt-get -y update
RUN apt-get -y install git
RUN npm install -g --force lerna yarn
WORKDIR /incode-editor
COPY . /incode-editor
RUN yarn install
RUN lerna link --force-local && lerna bootstrap --force-local
RUN lerna run --scope @incodelang/app webpack:build-prod
ENTRYPOINT lerna run --scope @incodelang/server express:only-start