# ToDoList Project
This project is a ToDoList application developed in NestJS with a MongoDB database.

## Requirements
Node.js: Make sure you have Node.js installed on your system. You can download it from [Node.js](https://nodejs.org/).

### Configuration

1. **Clone the Repository**:

```bash
git clone https://gitlab.com/tinkin.one/inductions/inducci-n-bryan-soria/todo-back.git
cd todo-list
```
2. **Install Dependencies:**:
```bash
$ npm install
```
3. **Configure Environment Variables**
   - Create a `.env` file in the root of the project.
   - Set the following environment variables in the `.env` file:
     - `PORT`
     - `DATABASE_URI`
    For example:
    ```bash
    PORT=3000
    DATABASE_URI=mongodb://localhost:27017/todo_list
    ```

3. **Initial config of mongoDB**
    - Create a collection called `status` in the `todo_list` database with the next documents, for
    this execute the next command for insert:
    ```bash
    db.status.insertMany([{ _id: 1, name: 'Pendiente' }, { _id: 2, name: 'En proceso' }, { _id: 3, name: 'Completada' } ])
    ```

    

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```