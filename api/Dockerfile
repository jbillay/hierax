FROM node:8-alpine

RUN apk add --no-cache make gcc g++ python

# Create app user with home directory
RUN addgroup app -g 1001
RUN adduser app -S /bin/false -h /home/app -G app -u 100

RUN npm install --global npm

ENV HOME=/home/app

COPY package.json package-lock.json $HOME/
RUN chown -R app:app $HOME

USER app
WORKDIR $HOME
RUN npm install

USER root
COPY . $HOME/
RUN chown -R app:app $HOME
USER app

CMD [ "npm", "run", "dev" ]
