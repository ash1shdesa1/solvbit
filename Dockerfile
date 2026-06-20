FROM nginx:1.27-alpine

# Remove default nginx page
RUN rm /etc/nginx/conf.d/default.conf

# Copy our nginx config
COPY nginx.conf /etc/nginx/conf.d/solvbit.conf

# Copy static site
COPY index.html styles.css app.js /usr/share/nginx/html/

EXPOSE 80
