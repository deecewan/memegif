#!/usr/bin/env bash

yum install -y docker

usermod -aG docker ec2-user

su ec2-user -

curl -L "https://github.com/docker/compose/releases/download/1.8.1/docker-compose-$(uname -s)-$(uname -m)" > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

sudo service docker start

`aws ecr get-login --region ap-southeast-2`

docker pull 227965604500.dkr.ecr.ap-southeast-2.amazonaws.com/memegif

pushd ~
cat <<EOF >> docker-compose.yml
version: '2'
services:
 memegif:
   image: 227965604500.dkr.ecr.ap-southeast-2.amazonaws.com/memegif:latest
   ports:
    - "80:3000"
   environment:
    - REDIS_ADDR=redis
   depends_on:
    - redis
    - postgres
 redis:
   image: redis
 postgres:
   image: postgres
EOF

/usr/local/bin/docker-compose up -d

popd