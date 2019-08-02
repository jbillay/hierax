FROM node:10-alpine

RUN apk add --no-cache make gcc g++ python

# Create app user with home directory
RUN addgroup app -g 1001
RUN adduser app -S /bin/false -h /home/app -G app -u 100

RUN npm install --global npm

ENV HOME=/home/app

USER app

RUN mkdir $HOME/api

COPY package.json package-lock.json $HOME/api/

WORKDIR $HOME/api/

RUN npm install

CMD [ "npm", "run", "dev" ]
