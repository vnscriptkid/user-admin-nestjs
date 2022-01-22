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
