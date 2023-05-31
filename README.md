# Map
This project gives you a page with a detailed world map and an opportunity to add markers. All markers info is saved in the PostgreSQL base.

To start a project follow those steps:
 - enter an api directory
 ```
 cd api
 ```
 - install the packages
 ```
 npm install
 ```
 - create .env file inside api directory with given variables
 ```
  DATABASE='The name of the database'
  USER_NAME='The username which is used to authenticate against the database'
  PASSWORD='The password which is used to authenticate against the database'
 ```
 - create and setup DB
```
 npm run setup
```
 - start a server
 ```
 npm start
 ```
