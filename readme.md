Install requirements:
 - docker (https://docs.docker.com/get-docker/)

To initialize this project, run `docker compose up` from the root of this project. This will build and seed the database. By default the database runs on port `5432` and is also exposed on `5432`, if you want to change this you can update `docker-compose.yml`.


## Getting the App Running Locally

- nestjs (https://docs.nestjs.com/)

1. Clone this repository with this command
```bash
git clone https://github.com/Okprime/motorway-test-backend.git
```

## Installing Without Docker

2. Install dependencies with this command
```bash
npm install
```

4. Run the app in development environment using this command
```bash
npm run start:dev

## Running tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov