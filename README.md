# HelloBooks Project



This is a mock simulation of a Library website

## API Documentation



The API has predictable, resource-oriented URLs, and uses HTTP response codes to indicate API status and errors.

### Prerequisites

Node js
Any suitable editor


## Usage
- Use Postman collection
  [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/8d7dc3154fb4a75853f2)

# API Documentation
The API has predictable, resource-oriented URLs, and uses HTTP response codes to indicate API status and errors.

## Features

**Users**:
A created user will have a role, either an admin or a regular.
- A Regular User can:
    - Create an book
    - Edit his book.
    - List books
    - Create a new book
    - Edit a book
    - Retrieve a book
    - Loan a book
  
    
    

-

**Books**:
Books can be created and must have:
  - Created date
  - Title
  - Isbn number
  


**Authentication**:
Users are authenticated and validated using JSON web token (JWT).
By generating a token on registration and login, API endpoints and documents are protected from unauthorised access.
Requests to protected routes are validated using the generated token.

## Endpoints

**Users**

Request type | Endpoint | Action
------------ | -------- | ------




## Development
Document Management System API is built with the following technologies;
- JavaScript (ES6)
- [NodeJs](https://nodejs.org)
- [Express](http://expressjs.com/)
- [Postgresql](https://www.postgresql.org/)
- [Sequelize ORM](http://docs.sequelizejs.com/en/v3/)

## Installation
  - Install [NodeJs](https://nodejs.org/en/) and [Postgres](https://www.postgresql.org/) on your machine
  - Clone the repository `$ git clone https://github.com/andela-oaladeusi/dms.git`
  - Change into the directory `$ cd /dms`
  - Install all required dependencies with `$ npm install`
  - Create a `.env` file in your root directory as described in `.env.sample` file
  - Start the app with `npm start`
  - Run Test `npm test`

## Contributing
- Fork this repository to your GitHub account
- Clone the forked repository
- Create your feature branch
- Commit your changes
- Push to the remote branch
- Open a Pull Request

## Limitations
The limitations of the API are:
- Users cannot delete themselves using the API
- Documents are not unique (A user can create a document with the same title)
- User cannot login on two different platform

## LICENSE
 © [BennyOgidan]
