FROM node:alpine
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --production

COPY . .

ENV PORT=3000

EXPOSE $PORT

CMD ["npm", "start"]
