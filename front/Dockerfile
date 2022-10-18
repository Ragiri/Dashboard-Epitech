FROM node:14-alpine
RUN mkdir /web
WORKDIR /web
COPY . .
RUN npm install --save react-twitter-widgets
RUN npm install --production
CMD ["npm", "start"]
