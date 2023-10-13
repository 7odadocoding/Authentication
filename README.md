# Authentication System

## What is the main objective of this project?

The main objective of this project is to create a simple authentication system using sessions and JSON Web Tokens (JWT), which is built with Express and MongoDB.

## Available Scripts

To use this project, you can run the following scripts:

- Install dependencies: `npm install`
- Run the server in the development environment: `npm run dev`
- Run the server in the production environment: `npm run prod`

## Environmental Variables

The following environmental variables are available in this project:

- Production

    ```dotenv
    DB_URI="*********************"
    SESSION_SECRET="*********************"
    JWT_SECRET="*********************"
    ```

- Development

    ```dotenv
    DB_URI_DEV="*********************"
    SESSION_SECRET_DEV="*********************"
    JWT_SECRET_DEV="*********************"
    ```

## Todos

- [ ] add error handler.
- [ ] logging.
- [ ] write more todos!
