# Stage 0, "build-stage", based on Node.js to build the frontend
FROM node:18

# Set work directory
WORKDIR /code/frontend

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]


# Stage 1, based on NGINX to provide a configuration to be used with react-router
# FROM nginx:alpine
# COPY --from=build /app/build /usr/share/nginx
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]