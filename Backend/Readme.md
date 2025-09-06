# synergysphereBackend

## Overview

This is the Assessment, built with Express.js and MongoDB. It supports multi-tenant organizations, employee/project/task management, JWT and API key authentication, audit logging, and more.

---

## Setup Instructions

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd Backend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**
   - Copy `config.env` or `config.example.env` to your project root if not present.
   - Edit `config.env` with your MongoDB URI, password, and JWT secret.

4. **Start the server:**
   ```sh
   npm start
   ```
   The server runs on port `11000` by default.

---

## Environment Variables

Create a `config.env` file in the root directory with the following variables:

```
PORT=11000
DATABASE=mongodb+srv://<username>:<db_password>@cluster0.qomyi1a.mongodb.net/employee
DATABASE_PASSWORD=your_db_password
JWT_SECRET=your_jwt_secret
```

- `PORT`: Port number for the server (default: 11000)
- `DATABASE`: MongoDB connection string (replace `<db_password>` with your password)
- `DATABASE_PASSWORD`: Your MongoDB password
- `JWT_SECRET`: Secret key for JWT signing

---

## Running Tests

To run all unit and integration tests:

```sh
npm test
```

Tests are written using Jest and Supertest and cover all major API endpoints.

---

## API Usage Guide

### Authentication

- **Signup:** `POST /api/auth/signup`
- **Login:** `POST /api/auth/login`
- **Test Accounts:** `POST /api/auth/create-test-account`, `POST /api/auth/create-second-org`

### Employees

- CRUD: `/api/employees` (protected by JWT or API key)

### Projects

- CRUD: `/api/projects` (protected)
- Project Tasks: `/api/projects/:id/tasks`

### Tasks

- CRUD: `/api/tasks` (protected)

### Dashboard

- `/api/dashboard` (protected)

### API Keys (Admin Only)

- **Generate:** `POST /api/apikeys/generate`
- **Revoke:** `POST /api/apikeys/revoke`
- **Rotate:** `POST /api/apikeys/rotate`

### API Key Usage

For endpoints supporting API key authentication, use the `x-api-key` header:

```
x-api-key: <your-api-key>
```

---

## Postman Collection

A complete Postman collection is provided in `postman.json` for all endpoints, including sample requests and responses.

---

## License

MIT

---

**For any issues, please open an issue

