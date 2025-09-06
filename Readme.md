# SynergySphere

SynergySphere is a full-stack team collaboration and project management platform. It features a React + Vite + TypeScript frontend and an Express.js + MongoDB backend. The platform supports multi-tenant organizations, employee/project/task management, JWT and API key authentication, and more.

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [API Usage Guide](#api-usage-guide)
- [Testing](#testing)
- [License](#license)

---

## Features

- Multi-organization support
- Employee, project, and task management
- JWT and API key authentication
- Role-based access (admin, manager, employee)
- Audit logging
- Responsive UI with modern design
- RESTful API

---

## Architecture

```
.
├── docker-compose.yml
├── Backend/
│   ├── config.env
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── tests/
│   └── utils/
└── SynergySphere/
    ├── package.json
    ├── vite.config.ts
    ├── public/
    └── src/
```

---

## Setup Instructions

### 1. Clone the Repository

```sh
git clone <your-repo-url>
cd SynergySphere
```

### 2. Backend Setup

```sh
cd Backend
cp config.example.env config.env
# Edit config.env with your MongoDB URI, password, and JWT secret if needed
npm install
npm start
```

The backend server runs on port `11000` by default.

### 3. Frontend Setup

```sh
cd ../SynergySphere
npm install
npm run dev
```

The frontend runs on port `5173` by default.

---

## Environment Variables

### Backend (`Backend/config.env`)

```
PORT=11000
DATABASE=mongodb://root:example@mongo:27017/synergy?authSource=admin
DATABASE_PASSWORD=example
JWT_SECRET=your_jwt_secret
```

### Frontend (`SynergySphere/.env`)

```
VITE_API_URL=http://localhost:11000/api
```

---

## Running the App

### With Docker

You can use `docker-compose.yml` to run both frontend and backend with MongoDB:

```sh
docker-compose up --build
```

### Without Docker

Start backend and frontend separately as described above.

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

#### API Key Usage

For endpoints supporting API key authentication, use the `x-api-key` header:

```
x-api-key: <your-api-key>
```

---

## Testing

To run backend tests:

```sh
cd Backend
npm test
```

---

## Postman Collection

A complete Postman collection is provided in `Backend/postman.json` for all endpoints, including sample requests and responses.

---

## License

MIT

---

**For any issues, please open an issue or pull