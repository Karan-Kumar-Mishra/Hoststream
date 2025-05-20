cd backend
docker build -t karankumarmishra/hoststream-backend .
docker push karankumarmishra/hoststream-backend:latest
cd ..

cd Proxy-Server
docker build -t karankumarmishra/proxy-server  .
docker push karankumarmishra/proxy-server:latest
cd ..

cd frontend
docker build -t karankumarmishra/hoststream-frontend  .
docker push karankumarmishra/hoststream-frontend:latest
cd ..