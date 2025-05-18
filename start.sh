apt update -y
apt upgrade -y
apt install docker -y
apt install docker-compose -y
systemctl stop redis-server
docker-compose up