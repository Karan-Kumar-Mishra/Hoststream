docker build -t karankumarmishra/hoststream-backend -f backend/Dockerfile .
docker push karankumarmishra/hoststream-backend:latest

docker build -t karankumarmishra/proxy-server -f Proxy-Server/Dockerfile .
docker push karankumarmishra/proxy-server:latest

docker build -t karankumarmishra/hoststream-frontend -f frontend/Dockerfile .
docker push karankumarmishra/hoststream-frontend:latest
