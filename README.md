## Getting started

- for this project you at least need node v14.15.0
- make sure you have postgres installed

## Running the project

- use `createdb` for `accounts-service`, `comments-service`
- install dependencies with `yarn`
- run `yarn prisma migrate dev` in `accounts-service`, `comments-service` to run migrations and generate schema
- run `yarn start:services` in the root of the project to start the services
- run `yarn start:gateway` in the root of the project to start the gateway

