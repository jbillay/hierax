FROM node:10-alpine

RUN apk add --no-cache make gcc g++ python

# Create display user with home directory
RUN addgroup display -g 1001
RUN adduser display -S /bin/false -h /home/display -G display -u 100

RUN npm install --global npm
RUN npm install --global quasar


ENV HOME=/home/display

COPY package.json package-lock.json $HOME/
RUN chown -R display:display $HOME

USER display
WORKDIR $HOME
RUN npm install

USER root
COPY . $HOME/
RUN chown -R display:display $HOME
USER display

RUN npm rebuild node-sass

CMD [ "npm", "run", "serve" ]
