FROM node:22-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --include=dev
COPY . .

RUN npm run build
RUN npm prune --production

FROM node:22-alpine as runtime
WORKDIR /app

COPY --from=builder ./app ./

EXPOSE 3000

CMD ["npm", "run", "start"]