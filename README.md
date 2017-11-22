[![Build Status](https://travis-ci.org/benfluleck/HelloBooks.png)](https://travis-ci.org/benfluleck/HelloBooks.svg?branch=staging)
[![Coverage Status](https://coveralls.io/repos/github/benfluleck/HelloBooks/badge.svg?branch=staging)](https://coveralls.io/github/benfluleck/HelloBooks?branch=staging)

# HelloBooks

HelloBooks is an application that helps manage a library and its processes like stocking, tracking and lending of books.This application enables users to be able to find and borrow books. Users  are managed by an admin who manages users as well as add, edit, delete books.


# Table of Contents
- [Getting Started](#getting-started)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Tests](#tests)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Models](#models)
- [Testing](#testing)
- [Express Routes](#express-routes)
- [License](#license)
- [Current state](#current-state)

## Getting Started
This is a javascript application built with [**Express**](https://expressjs.com/) framework on the nodejs platform. Authentication of users is done via [**JSON Web Tokens**](https://jwt.io/).

## Dependencies
* Postgres
* Node

## Installation

1. Install [**Node JS**](https://nodejs.org/en/).
1. Install [**Postgres**](https://www.postgresql.org/) .
1. Clone the [**repository here**](https://github.com/benfluleck/HelloBooks.git)
1. [**cd**] into the root of the **project directory**.
1. Run `npm install` on the terminal to install Dependecies
1. Install sequelize-cli, Create Postgresql database, Navigate to server directory and run migrations:
```
npm install -g seqeulize-cli
cd server
sequelize db:migrate
```
5. Create a `.env` file in the root directory of the application. Use a different database for your testing and development. Example of the content of a .env file is shown in the .env.sample

6. Start the application:
**_Different Build Environment_**

**Production**
```
npm run start-prod
```
**Development**
```
npm run start:dev
npm run build:dev
```

## Limitations
The limitations with this current version of Hello Books includes:
* The Administrator has no control overs users on the client side
* Users cannot contribute books to the application based on their location
* Users can rent books for an indefinite amount of time

## Tests

Sever side tests - Run `npm test` on the terminal while within the **project root directory**.
Client side tests - Run `npm client:test` on the terminal while within the **project root directory**.


### Starting
In the project root, run `npm start`.

### Features
HelloBooks consists of the following features:

### Authentication

- It uses JSON Web Token (JWT) for authentication.
- Token is generated on user login
- Token is perpetually verified to check the state of the user if logged in or not.
- Admin User will br pre-seeded into the application with administrative priviledges

### Users

- Users can register
- Users can log in
- Users can view all books in the library
- Users can borrow books
- Users can return books
- User can view borrowing history

### Admin Users
- Admins can edit books
- Admins can add new books


## Usage
- Run database migration with `npm start:migrate`
- Start app development with `npm run start` or `npm start`
- To start the client `npm run start:webdev`
- Install **Postman** and use to test all endpoints


## API Documentation
You can view the API Documentation [here](https://staging-hellobooks.herokuapp.com/api-docs)

### Technology Stack
**UI & Templates**
1. HTML & CSS
2. Materialize CSS Framework
3. Javascript
4. JQuery

**Server Side**
1. NodeJs
2. Express
3. Sequelize

**Client Side**
1. React(Redux)


### Questions
For more details contact benny.ogidan@andela.com

### Support or Contribution
For any suggestions or contributions  please do not hesistate to contact me

Contributions to this project are welcomed by all, If you need to contribute to this project, follow the steps below
* **Fork** the repository
* Follow [Installation and Setup](#installation-and-setup) as explained earlier
* Create a branch off **development** for the feature you wish to add
* Make neccessary changes, commit and raise a pull request against develop
**Note** when making contributions, please endevour to follow the [Airbnb](https://github.com/airbnb/javascript) javascript style guide. check out the [wiki]

## Models

Three models are defined: `Users`, `Books` and `UserBooks`. `Book` must have a unique title and title  on their creation. A `User` can borrow a book `Book`. The routes are defined under `models/index`.

## Testing

Server side testing is achieved through use of `chai-http`, `mocha` and `chai` packages. `chai-http` is used to make requests to the api and `mocha` is the testing framework and `chai` is the exception library. They will both be installed when you run `npm install` and the tests will run when you run `npm test`.

Client side testing is achieved through the use of `jest` package. `jest` is used to test javascript code in
React applications.

## Express Routes

Api endpoints were created using `express` router. The routes are defined under `server/routes`.

## License
This project is authored by **Benny Ogidan** (benny.ogidan@andela.com) and is licensed for your use, modification and distribution under the **MIT** license.
[MIT][license] © [benny-ogidan][author]
<!-- Definitions -->
[license]: LICENSE
[author]: benny-ogidan


## Current state
still in the development stage
