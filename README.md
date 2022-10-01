# shared-blog

## About
This is a full-stack blog app where every registered user can make posts, and interact with other posts through comments. 

## Features
#### Back-end
* REST API architecture
* User authentication with JWTs (access and refresh tokens), using the ```jsonwebtoken``` library
* Protected routes using middleware functions
* Form validation using ```Joi```
* Password hashing and salting using ```bcrypt.js```
* Non-relational database, hosted on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/)
#### Front-end
* Global state management using React Context
* Page navigation using React Router
* API requests using ```axios```
* Custom React hooks for making authorized API requests, and for automatically refreshing expired access JWTs

## Stack
* ```Node.js``` + ```Express.js``` for the back-end app
* ```MongoDB``` + ```Mongoose``` for the database
* ```React.js``` for the front-end app
* ```Sass``` + plain CSS for styling the front-end app