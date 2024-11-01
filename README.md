# Welcome
The application is run with docker compose

> docker compose up

The first time the application is run, the database should be initialized
using the following profile

> docker compose --profile initDb up --build

The application is available at http://localhost:8080.
To run the test script use

> npm run testRun

