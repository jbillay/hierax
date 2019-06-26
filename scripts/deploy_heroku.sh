#!/bin/bash
cd services
docker build -t registry.heroku.com/hierax/web .
docker push registry.heroku.com/hierax/web
