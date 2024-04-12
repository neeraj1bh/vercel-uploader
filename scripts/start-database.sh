#!/usr/bin/env bash
# Use this script to start, stop, or restart a docker container for a local development database

# TO RUN ON WINDOWS:
# 1. Install WSL (Windows Subsystem for Linux) - https://learn.microsoft.com/en-us/windows/wsl/install
# 2. Install Docker Desktop for Windows - https://docs.docker.com/docker-for-windows/install/
# 3. Open WSL - `wsl`
# 4. Run this script - `./start-database.sh` or `./start-database.sh restart`

# On Linux and macOS you can run this script directly - `./start-database.sh` or `./start-database.sh restart`

DB_CONTAINER_NAME="vercel-uploader"

# Check if Docker is installed
if ! [ -x "$(command -v docker)" ]; then
  echo "Docker is not installed. Please install Docker and try again.\nDocker install guide: https://docs.docker.com/engine/install/"
  exit 1
fi


# Check if the script was called with the 'restart' argument
if [ "$1" = "restart" ]; then
  # Restart the container
  if [ "$(docker ps -a -q -f name=$DB_CONTAINER_NAME)" ]; then
    docker restart $DB_CONTAINER_NAME
    echo "Database container restarted"
  else
    echo "Database container does not exist. Starting a new one..."
  fi

else

    # Check if the container exists
    if [ "$(docker ps -a -q -f name=$DB_CONTAINER_NAME)" ]; then
    # Check if the container is running
    if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
        # Stop the running container
        docker stop $DB_CONTAINER_NAME
        echo "Database container stopped"
    else
        echo "Database container is not running. Starting it..."

        # Start the container
        docker start $DB_CONTAINER_NAME
        echo "Database container started"
    fi
    else
    # Container doesn't exist, create and start it

    # Import env variables from .env
    set -a
    source .env.local

    DB_PASSWORD=$(echo $DATABASE_URL | awk -F':' '{print $3}' | awk -F'@' '{print $1}')

    if [ "$DB_PASSWORD" = "password" ] || [ "$DB_PASSWORD" = "randompassword" ]; then
        echo "You are using the default database password"
        read -p "Should we generate a random password for you? [y/N]: " -r REPLY
        if ! [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Please set a password in the .env.local file and try again"
        exit 1
        fi
        # Generate a random URL-safe password
        NEW_DB_PASSWORD=$(openssl rand -base64 12 | tr '+/' '-_')
        # Replace the password substring in the DATABASE_URL with the new password
        NEW_DATABASE_URL=$(echo $DATABASE_URL | sed "s/$DB_PASSWORD/$NEW_DB_PASSWORD/")
        # Update the .env file with the new DATABASE_URL
        sed -i -e "s#^DATABASE_URL=.*#DATABASE_URL=\"$NEW_DATABASE_URL\"#" .env.local
    fi

    # Create and start the container
    docker run --name $DB_CONTAINER_NAME -e POSTGRES_PASSWORD=$DB_PASSWORD -e POSTGRES_DB=vercel-uploader -d -p 5432:5432 docker.io/postgres

    echo "Database container was successfully created and started"
    fi
fi
