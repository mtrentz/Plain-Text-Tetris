FROM node:14 as build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000

FROM nginx:1.13-alpine
COPY --from=build /app/build /usr/share/nginx/html