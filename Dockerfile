FROM node:alpine

WORKDIR /app

COPY package*.json .

RUN npm install 

COPY . . 


EXPOSE $PORT

# RUN npm run build

ENTRYPOINT ["yarn", "start"]