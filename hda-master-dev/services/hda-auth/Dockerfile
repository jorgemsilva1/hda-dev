# Food Service Dockerfile
FROM node:10.16.3-alpine

COPY . /src
WORKDIR /src
RUN npm i
EXPOSE 3000
# RUN ["chmod", "+x", "./scripts/run.sh"]c
# RUN ["chmod", "+x", "./scripts/wait-for-it.sh"]
CMD npm start
