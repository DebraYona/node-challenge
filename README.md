# Node-Challenge

## I. Installation

### Manual Method

#### 1. Clone this repo

```
$ git clone git@github.com:debrayona/node-challenge.git your-app-name
$ cd your-app-name
```

#### 2. Install dependencies

```
$ yarn
```

## III. Development

### Start dev server

```
$ yarn dev
```

Running the above commands results in

- 🌏**API Server** running at `http://localhost:3000`
- ⚙️**Swagger UI** at `http://localhost:3000/dev/api-docs`
- 🛢️**MongoDB** running at `mongodb://localhost:27017`

## Environment

To edit environment variables, create a file with name `.env` and copy the contents from `.env.default` to start with.

| Var Name  | Type   | Default                           | Description                            |
| --------- | ------ | --------------------------------- | -------------------------------------- |
| NODE_ENV  | string | `development`                     | API runtime environment. eg: `staging` |
| PORT      | number | `3000`                            | Port to run the API server on          |
| MONGO_URL | string | `mongodb://localhost:27017/books` | URL for MongoDB                        |
