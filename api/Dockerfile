FROM node:14

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait

RUN chmod +x /wait && npm install --global nodemon && npm install --global yarn --force

WORKDIR /usr/src/api

COPY package*.json /usr/src/api/
COPY yarn.lock /usr/src/api/

RUN yarn

ENV PORT=${SERVER_PORT}
ENV HOST=${SERVER_HOST}
ENV MONGO_PORT=${DB_PORT}
ENV MONGO_HOST=${DB_HOST}
ENV DB_NAME=${DB_NAME}

#ENV JWT_SECRET_KEY=${JWT_SECRET_KEY}
#ENV JWT_EXPIRES_IN=${JWT_EXPIRES_IN}

EXPOSE ${SERVER_PORT}

CMD /wait && yarn start:dev --watch /usr/src/api
