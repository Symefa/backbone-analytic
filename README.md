# backbone-analytic
# Pre-installation
1. latest node version
2. PostgreSQL (version 10)
3. install Global `Node-module`
    1. Sequelize-cli
    2. nodemon

# installation
1. create database 'backbone-analytic'
2. Clone repo to your local
3. `npm install` to install all dependencies
4. `npm start` to run development mode

# how to
1. set .env using configured database
2. main database is backbone-analytic for storing analytic configuration
3. target database are the database that store required data for building graph

# dev mode
1. `npx sequelize-cli db:migrate` to migrate all models to database
2. `npx sequelize-cli db:seed:all` to insert data into database
3. `npx sequelize-cli db:migrate:undo:all` to remove all models in database

# writing test
1. each controller has one test suite at tests forlder with format name `{name}.controllers.seq.js`
2. each function has one describe block `describe('function title' , () => { })`
3. give proper short description for each test

# test mode
1. do pre-installation
2. do step 1 - 3 at installation first
3. do step 1 - 2 at dev mode
4. then use `npm test` to run test
