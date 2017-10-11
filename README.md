[![Build Status](https://travis-ci.org/benfluleck/HelloBooks.png)](https://travis-ci.org/benfluleck/HelloBooks.svg?branch=Travisrepo)
[![Code Climate](https://codeclimate.com/github/benfluleck/HelloBooks/badges/gpa.svg)](https://codeclimate.com/github/benfluleck/HelloBooks/)
[![Test Coverage](https://codeclimate.com/github/benfluleck/HelloBooks/badges/coverage.svg)](https://codeclimate.com/github/codeclimate/benfluleck/HelloBooks)



# HelloBooks

HelloBooks is an application that simulates a real life library with this application users are able to find and borrow books.

## Features
HelloBooks consists of the following features:

### Authentication
- It uses JSON Web Token (JWT) for authentication.
- The token is generated as soon as the user signs in
- User is assigned a bronze level role on authentication
- Admin User will be pre-seeded into the application with administrative privileges

###  Users
- Users can register themselves
- Users can loan and return books
- User Signup - api/users/signup - Registers a user
- User Signin - api/users/signin - Logs a user in
- Get Book - api/userid/books - allows a user to view all books
- Get Book - api/userid/books?returnd=false - allows a user to view all books that are not yet returned
- Get Book - api/userid/books?returnd=true - allows a user to view all books that have been returned
- Borrow Book - api/userid/books - allows a user to borrow books
- Return Book - api/userid/books - allows a user to return borrowed books

### Admin:
- User Signin - api/users/signin - Logs an admin in
- Add Book - api/books - allows an admin to add a book
- Modify Book - api/books - allows an admin to modify a book
- Delete Book - api/books - allows an admin to delete book

## Verbs
- GET
- POST
- PUT
- DELETE

## state
still on development
