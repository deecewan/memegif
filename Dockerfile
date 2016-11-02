FROM node:latest
EXPOSE 3000
RUN mkdir -p /app
COPY package.json /app
COPY yarn.lock /app
COPY .env /app
ADD ./out /app/out
ADD ./static /app/static
WORKDIR /app
RUN npm i -g yarn
RUN yarn
RUN yarn add bcrypt
CMD npm run start:prod