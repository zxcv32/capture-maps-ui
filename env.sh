#!/usr/bin/env sh
echo "REACT_APP_GOOGLE_MAPS_API_KEY=$GOOGLE_MAPS_API_KEY" >> /usr/share/nginx/html/.env
echo "REACT_APP_API_HOST=$API_HOST" >> /usr/share/nginx/html/.env
