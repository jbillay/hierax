FROM node:10-alpine

RUN apk add --no-cache make gcc g++ python

# Create display user with home directory
RUN addgroup display -g 1001
RUN adduser display -S /bin/false -h /home/display -G display -u 100

RUN npm install --global npm

ENV HOME=/home/display

USER display

COPY package.json package-lock.json $HOME/

WORKDIR $HOME

RUN npm install

RUN npm rebuild node-sass

CMD [ "npm", "run", "serve" ]
