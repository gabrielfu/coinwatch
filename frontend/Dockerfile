FROM node:16-alpine AS build
ENV NEXT_TELEMETRY_DISABLED=1

RUN mkdir -p /build
WORKDIR /build

COPY package*.json .
RUN npm ci
COPY . .

ENV BACKEND_URL=http://backend:8080
RUN npm run build

# =======================================
FROM node:16-alpine AS dependencies
ENV NODE_ENV=production

RUN mkdir -p /dependencies
WORKDIR /dependencies

COPY --from=build /build/package*.json .
RUN npm ci --production

# =======================================
FROM node:16-alpine
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN mkdir -p /app
WORKDIR /app

COPY --from=build /build/next.config.js .
COPY --from=build /build/public/ ./public
COPY --from=build /build/.next ./.next
COPY --from=dependencies /dependencies/node_modules ./node_modules

EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]