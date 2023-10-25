FROM node:18-alpine AS build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
# Cache and Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm ci --silent
# Copy app files
COPY . ./
# Args passed on build phase
ARG GOOGLE_MAPS_API_KEY
ARG API_HOST
ENV REACT_APP_GOOGLE_MAPS_API_KEY $GOOGLE_MAPS_API_KEY
ENV REACT_APP_API_HOST $API_HOST
RUN npm run build


FROM nginx:1.25.3-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
