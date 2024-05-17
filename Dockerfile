FROM nginx:latest
COPY ./dist/net-workers/ /usr/share/nginx/html
EXPOSE 80
