FROM openresty/openresty:1.17.8.2-alpine
COPY index.html /usr/local/openresty/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY rewrite.lua /etc/nginx/conf.d/
CMD nginx -g "daemon off;"