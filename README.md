<h1>Hoststream</h1>

<img src="./frontend/src/assets/hoststream.ico">

<br>

<h1>installation</h1>
<br>
<h3>Linux</h3>

```
apt update -y
apt upgrade -y
apt install git -y
git clone https://github.com/Karan-Kumar-Mishra/Hoststream.git
cd Hoststream
chmod +x start.sh
bash start.sh

```

<h3>Windows</h3>

<p>1. Download the nodejs </p>
<p>2. Download the Git </p>

```
git clone https://github.com/Karan-Kumar-Mishra/Hoststream.git
cd Hoststream
cd backend
npm i && tsc
node dist/server.js
cd ..

cd Proxy-Server
npm i && tsc
node dist/server.js
cd ..

cd frontend
npm i && tsc 
npm run build
npm i serve
serve -S dist

```
<h4>Dokcer </h4>

```
git clone https://github.com/Karan-Kumar-Mishra/Hoststream.git
cd Hoststream
docker-compose up

```

