# Welcome

The application consists of three docker services. 
 - An express server
 - A mongo database service
 - A mongo-seed service which can import the provided json into the database


## Running the application

The application is run with docker compose

> docker compose up

The first time the application is run, the database should be initialized
using the following profile

> docker compose --profile initDb up --build

The application is available at http://localhost:8080.

The application can be tested with the provided script by running

> npm run testRun
