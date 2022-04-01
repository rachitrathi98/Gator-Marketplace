# Gator Marketplace

As a student at a college or university,  it becomes quite tough to find a single source to buy/rent or sell stuff amongst peers

The project will be a marketplace for students which will provide a one stop platform for the student community to buy/rent and sell things



## Table of Contents

- [Final Features](#final-features)
- [Team Members](#team-members)
- [Tech Stack](#tech-stack)
- [Running](#running)



## Final Features
* User Authentication and Authorization
* Product Listing for sale with CRUD operations
* Product sorting by categories and filters
* Communication Channel with seller if buyer is interested and Payment Gateway to buy



## Team Members

### Frontend
* Animesh Srivastava
* Taher Mulla
* Mustafa Gangardiwala
* Rachit Rathi

### Backend
* Mustafa Gangardiwala
* Rachit Rathi



## Tech Stack
React, Golang, MongoDB



## Running

### Steps to run Frontend
- Install node
- In the Frontend Directory run the following command on the terminal

```
  npm install    [--To install node modules for react]
```
```
  npm start    [--To run the client on the localhost:3000]
```
### Steps to run Backend
- Install Go
- In the Backend Directory run the following command on the terminal

```
  go mod tidy    [--To Intialize Go modules]
```
- Create a .env file in the Backend Directory as follows

```bash
GOOGLE_OAUTH_CLIENT_ID=
GOOGLE_OAUTH_CLIENT_SECRET=
JWT_SECRET=
MONGO_URI=
DB = 
PORT = 
CLIENT_PORT = 
```
- To run the server tye command
```
  go run main.go  [--Runs the server on the specified PORT]
```

- To run test cases: In the Backend Directory within the Tests Folder run the following command on the terminal

```
  go test -v    [--To run unit test cases]
```


