FROM openresty/openresty:latest

RUN mkdir /var/log/nginx/
RUN mkdir /etc/openresty/jwt-validator
RUN touch /var/log/nginx/access.log
COPY nginx.conf /etc/openresty/nginx.conf
COPY /auth /etc/openresty/jwt-validator

