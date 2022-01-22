## nestjs

- npm install --global @nestjs/cli
- nest new admin-nest

## docker

- running flow:

  - read file `docker-compose.yml`
  - there are 2 services: `db` and `backend`
  - `backend` depends on `db` so `db` runs first
  - `backend` runs using `Dockerfile`

- volumes:

  - why? data, files in container use virtual file system, will lose when container restarts
  - what? bi-directional mapping between files in host machine and container

- clis

  - docker container ls

- mysql8 connect
  - mysql2 instead of mysql
  - `update mysql.user set host='%' where user='root' and host = 'localhost';`
  - `flush privileges;`
  - `mysql -u root -p`

## ref:

- https://viblo.asia/p/nestjs-xay-dung-project-tich-hop-typeorm-repository-pattern-Eb85o9VBZ2G
