
# Gator Marketplace

As a student at a college or university,  it becomes quite tough to find a single source to buy/rent or sell stuff amongst peers

The project will be a marketplace for students which will provide a one stop platform for the student community to buy/rent and sell things



## Table of Contents

- [What Was Accomplised](#what-was-accomplised)
- [Team Members](#team-members)
- [Tech Stack](#tech-stack)
- [Running](#running)
- [Sprint 1 Demo video](#sprint-1-demo-video)




## What Was Accomplised

### Frontend
- Top nav-bar with logo, name, search bar and user loggin, that displays name once user is logged-in.
- Product cards on hone page with multiple products. For now this had dummy data.
- Basic Skeleton of the new product form that we will use in next

### Backend 
- Connection to MongoDB database
- Succesful data storage and retrival
- Used GoogleAut for user authentication and registration 


### Final Features
* User Authentication and Authorization
* Product Listing for sale with CRUD operations
* Product sorting by categories and filters
* Communication Channel with seller if buyer is interested



## Team Members
* Animesh Srivastava
* Taher Mulla
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
### Backend API Reference

#### User Sign In using Google OAuth2

```
  GET /google/login         [--Signs In or Registers the User using Google]
```
#### Check Logged In User

```
  GET /api/login-success   [--Send logged in user data by parsing cookies]
```

#### Logout User

```
  GET /api/logout          [--Logs out user]
```

### Sprint 1 Demo video

[Link to Videos](https://drive.google.com/drive/folders/117cAn8mxEskbFaklBFTPexDNbBjaZyWo?usp=sharing)
