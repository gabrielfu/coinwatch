FROM node:16-alpine

RUN mkdir -p /app
WORKDIR /app

COPY package*.json .
RUN npm install
COPY . .

ENV BACKEND_URL=http://backend:8080
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]