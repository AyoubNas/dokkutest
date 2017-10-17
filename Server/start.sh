#!/bin/bash
docker rm -f node
docker build -t igawi22/node .
docker run -d --name node -p 3000:3000  igawi22/node
docker exec -d node npm start
sleep 3s
docker logs node
