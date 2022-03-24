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
ENTRYPOINT yarn --cwd .\packages\server express:only-start