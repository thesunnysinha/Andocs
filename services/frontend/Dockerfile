# Stage 0, "build-stage", based on Node.js to build the frontend
FROM node:18

# Set work directory
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]