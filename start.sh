#!/bin/bash

# Update and install dependencies
apt update -y
apt upgrade -y
apt install nodejs -y
apt install npm -y
apt install screen -y # For persistent sessions

# Install dependencies for all projects
cd backend && npm i && npm run build && cd ..
cd Proxy-Server && npm i && npm run build && cd ..
cd frontend && npm i && cd ..

# Function to start a server in a screen session
start_server() {
  local server_name=$1
  local server_dir=$2
  local command=$3

  echo "Starting $server_name..."
  screen -dmS "$server_name" bash -c "cd $server_dir && $command"
  echo "$server_name started in screen session. Attach with: screen -r $server_name"
}

# Start all servers in separate screen sessions
start_server "backend" "./backend" "node dist/server.js"
start_server "proxy" "./Proxy-Server" "node dist/server.js"
start_server "frontend" "./frontend" "npm run dev"

echo "All servers started in screen sessions."
echo "To view a server's output: screen -r [backend|proxy|frontend]"
echo "To detach from screen: Ctrl+A then D"