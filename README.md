[![Build Status](https://travis-ci.org/benfluleck/HelloBooks.png)](https://travis-ci.org/benfluleck/HelloBooks.svg?branch=staging)
[![Coverage Status](https://coveralls.io/repos/github/benfluleck/HelloBooks/badge.svg?branch=staging)](https://coveralls.io/github/benfluleck/HelloBooks?branch=staging)

# HelloBooks

HelloBooks is an application that helps manage a library and its processes like stocking, tracking and lending of books.This application enables users to be able to find and borrow books. Users  are managed by an admin who manages users as well as add, edit, delete books.

## Getting Started
This is a javascript application built with [**Express**](https://expressjs.com/) framework on the nodejs platform. Authentication of users is done via [**JSON Web Tokens**](https://jwt.io/).

## Dependencies
* Postgres
* Node
* Postman

## Installation

1. Install [**Node JS**](https://nodejs.org/en/).
1. Install [**Postgres**](https://www.postgresql.org/) .
1. Clone the [**repository here**](https://github.com/benfluleck/HelloBooks/)
1. [**cd**] into the root of the **project directory**.
1. Run `npm install` on the terminal.

## Tests

Run `npm test` on the terminal while within the **project root directory**.

## Usage
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
- Start app development with `npm run start:dev` or `npm start`
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
POST         | /api/v1/users/:userId/books                | Authenticated User Borrow book
PUT          | /api/v1/users/:userId/books                | Authenticated User Return book
GET	         | /api/v1/users/:userId/books?returned=false | Authenticated User borrowed books but not returned

## API Documentation
In progress

### Technology Stack
**UI & Templates**
1. HTML & CSS
2. Materialize CSS Framework
3. Javascript

**Server Side**
1. NodeJs
2. Express
3. Sequelize

**Client Side**
1. React(Redux)

_Project still in progress_

### Questions
For more details contact benny.ogidan@andela.com

### Support or Contribution
For any suggestions or contributions  please do not hesistate to contact me


## Models

Three models are defined: `Users`, `Books` and `UserBooks`. `Book` must have a unique title and title  on their creation. A `User` can borrow a book `Book`. The routes are defined under `controllers/index`.

## Testing

Testing is achieved through use of `chai-http`, `mocha` and `chai` packages. `chai-http` is used to make requests to the api and `mocha` is the testing framework and `chai` is the exception library. They will both be installed when you run `npm install` and the tests will run when you run `npm test`.

## Express Routes

Api endpoints were created using `express` router. The routes are defined under `server/routes`.



## state
still on development
