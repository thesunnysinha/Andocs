#!/bin/bash 

# Stop all containers and remove all images
# docker system prune -a -f

# Build and run the containers
docker compose up --build
