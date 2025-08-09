# build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

# run stage
FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app .
EXPOSE 3000
CMD ["npm","run","start"]
