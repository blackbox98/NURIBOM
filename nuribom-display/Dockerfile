FROM node:16.15.0 as build-stage
WORKDIR /var/jenkins_home/workspace/nuribom/nuribom-display
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# COPY --from=build-stage /var/jenkins_home/workspace/nuribom/nuribom-display/build /usr/share/nginx/display/html
EXPOSE 3000
CMD ["npm", "start"] 