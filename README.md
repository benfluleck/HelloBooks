[![Build Status](https://travis-ci.org/benfluleck/HelloBooks.png)](https://travis-ci.org/benfluleck/HelloBooks.svg?branch=Travisrepo)
[![Coverage Status](https://coveralls.io/repos/github/benfluleck/HelloBooks/badge.svg)](https://coveralls.io/github/benfluleck/HelloBooks)
[![Code Climate](https://codeclimate.com/github/benfluleck/HelloBooks/badges/gpa.svg)](https://codeclimate.com/github/benfluleck/HelloBooks/)
[![Test Coverage](https://codeclimate.com/github/benfluleck/HelloBooks/badges/coverage.svg)](https://codeclimate.com/github/codeclimate/benfluleck/HelloBooks)
[![Issue Count](https://codeclimate.com/github/benfluleck/HelloBooks/badges/issue_count.svg)](https://codeclimate.com/github/benfluleck/HelloBooks)


# HelloBooks

HelloBooks is an application that simulates a real life library

With this application users are able to find and loan books.

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