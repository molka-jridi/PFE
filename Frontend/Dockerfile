# Étape 1 : Build Angular
FROM node:18 as build
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build --prod

# Étape 2 : NGINX avec configuration custom
FROM nginx:alpine
COPY --from=build /app/dist/font-pfe/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
