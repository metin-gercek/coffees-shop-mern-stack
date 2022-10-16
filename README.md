# MongoDB - Express - React - NodeJs Fullstack project

![mern-coffees-shop](/client/src/logo/mern-coffees-shop.png)

## Demo Website
Heroku : [https://coffees-shop-react-nodejs.herokuapp.com/](https://coffees-shop-react-nodejs.herokuapp.com/)

## Used Technologies
- HTML5 and CSS3
- React: Components, Props, Events, Hooks, Router, Axios, Redux Toolkit
- Node & Express: Web API, Body Parser, JWT
- MongoDB: Mongoose, Aggregation
- Development: Git, Github
- Deployment: Heroku
- Toastify, Helmet Libraries

### 1. Clone repo
```
$ git clone https://github.com/metin-gercek/coffees-shop-mern-stack.git
$ cd coffees-shop-mern-stack
```

### 2. Setup MongoDB
- Local MongoDB
  - Install it from [here](https://www.mongodb.com/try/download/community)
  - Create .env file in root folder
  - Set MONGODB_URI=mongodb://localhost/coffees-shop-mern-stack
- Atlas Cloud MongoDB
  - Create database at [https://cloud.mongodb.com](https://cloud.mongodb.com)
  - Create .env file in root folder
  - Set MONGODB_URI=mongodb+srv://your-db-connection

### 3. Run Backend (Api folder)

```
# open new terminal
$ cd api
$ npm install
$ npm start
```

### 4. Run Frontend (Client Folder)

```
# open new terminal
$ cd client
$ npm install
$ npm start
```

### 5. Admin Usage

- Admin email and password can be found in data.js file
