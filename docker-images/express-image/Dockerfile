FROM node:14.17

RUN apt-get update && \ 
    apt-get install -y vim

COPY src /opt/app

CMD ["node","/opt/app/index.js"]
