[![Build Status](https://travis-ci.org/benfluleck/HelloBooks.png)](https://travis-ci.org/benfluleck/HelloBooks.svg?branch=staging)
[![Coverage Status](https://coveralls.io/repos/github/benfluleck/HelloBooks/badge.svg?branch=staging)](https://coveralls.io/github/benfluleck/HelloBooks?branch=staging)

# HelloBooks

HelloBooks is an application that helps manage a library and its processes like stocking, tracking and lending of books.This application enables users to be able to find and borrow books. Users  are managed by an admin who manages users as well as add, edit, delete books.


#Table of Contents
- [HelloBooks](#)
	- [Getting Started](Getting Started)
	- [Dependencies](#Dependecies)
	- [Installation](#Installation)
	- [Tests](#Tests)
	- [Usage](#Usage)
	- [API Endpoints](#API Endpoints)
	- [API Documentation](#API Documentation)
		- [Technology Stack](#Technology Stack)
		- [Questions](#Questions)
		- [Support or Contribution](#Support or Contribution)
	- [Models](#Models)
	- [Testing](#Testing)
	- [Express Routes](#Express Routes)
	- [License](#License)
	- [Current state](#Current state)

## Getting Started
This is a javascript application built with [**Express**](https://expressjs.com/) framework on the nodejs platform. Authentication of users is done via [**JSON Web Tokens**](https://jwt.io/).

## Dependencies
* Postgres
* Node
* Postman

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

## API Endpoints

**Do not forget to include token in header of all authenticated routes.**

Request type | Endpoint                                   | Action
-------------|--------------------------------------------|--------------------------------------------------
POST         | /api/v1/auth/users/signup                       | Sign-up a new user
POST	     | /api/v1/auth/users/signin                       | Sign-in a registered user
GET	         | /api/v1/books	                          | Authenticated user view all books
POST	     | /api/v1/books	                          | Admin user create/add book
PUT	         | /api/v1/books/:bookId	                  | Admin user modify book information
POST         | /api/v1/users/loanbook                | Authenticated User Borrow book
PUT          | /api/v1/users/returnbook                | Authenticated User Return book
GET	         | /api/v1/users/borrowedbooks?returned=false | Authenticated User borrowed books but not returned

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


* REACT: This project makes use of the REACT Javascript library to build the interface. REACT is used for building web pages that are structured as a collection of components. For more information about  See [this link](https://facebook.github.io/react/).
* ECMAScript 6: Also known as ES2015, this is a version of Javascript with
    next-generation features like arrow functions, generators, enhanced object literals,
    spread operators and more. The ES2015 is used in many areas of this project. See [this link](https://en.wikipedia.org/wiki/ECMAScript) for details.
* NodeJS: Node.js is an open-source, cross-platform JavaScript run-time environment for executing JavaScript code on the server-side.
    See [this link](https://en.wikipedia.org/wiki/Node.js) for details.
* ExressJS: ExpressJS, is a web application framework for Node.js, It is designed for building web applications and APIs.
    see [this link](https://en.wikipedia.org/wiki/Express.js).
* Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. For more information about Redux see [this link](http://redux.js.org/) for details.
* Materializecss is used to style the frontend. For more information about materializecss see [this link](http://materializecss.com/) for details.
* Webpack: Webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging modules.
* Postgresql & Sequelize: Postgresql is an advanced open source Object-Relational Model (ORM) database.Sequelize is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more.
* Major codes are written using the Airbnb javascript style guide, see [this link](https://github.com/airbnb/javascript) for details.


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


## Curent state
still in the development stage
