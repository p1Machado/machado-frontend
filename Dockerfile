FROM nginx:latest
COPY build/ /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 5000
ENTRYPOINT ["nginx","-g","daemon off;"]
