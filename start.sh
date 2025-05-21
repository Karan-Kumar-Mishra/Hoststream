apt update -y
apt upgrade -y
apt install nodejs -y
apt install npm -y
apt install docker -y
apt install docker.io -y
apt apt install docker-compose-plugin -y
systemctl stop mongod
systemctl stop redis-server
docker-compose up
