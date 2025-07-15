# Stage 1: Build
FROM node:alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

# Stage 2: Production
FROM node:alpine

WORKDIR /app

COPY --from=build /app .

RUN npm install --only=production --legacy-peer-deps

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "run", "start:prod"]