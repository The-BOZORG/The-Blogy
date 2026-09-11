# Blog API

A production-oriented REST API for a blogging platform, built with Express, TypeScript, Prisma, PostgreSQL, and Redis.

The API supports user authentication, role-based access control, blog publishing, comments, author applications, file uploads, rate limiting, validation, and interactive Swagger documentation.

## Features

- Session-based authentication with HTTP-only cookies
- Redis-backed sessions with a seven-day expiration
- Role-based authorization with `ADMIN`, `AUTHOR`, and `USER` roles
- Author access requests with approve/reject workflows
- Zod validation for request bodies and environment variables
- Centralized API errors and consistent JSON responses
- Helmet security headers, CORS, compression, and rate limiting
- Docker Compose setup for the API, PostgreSQL, and Redis
- Interactive OpenAPI documentation with Swagger UI

## Technology Stack

| Layer            | Technology                                  |
| ---------------- | ------------------------------------------- |
| Runtime          | Node.js 22                                  |
| Language         | TypeScript                                  |
| HTTP framework   | Express 5                                   |
| Database         | PostgreSQL 17                               |
| ORM              | Prisma 7                                    |
| Session store    | Redis 7                                     |
| Validation       | Zod                                         |
| Authentication   | Argon2 + Redis sessions + HTTP-only cookies |
| File uploads     | Multer                                      |
| Documentation    | Swagger UI + swagger-jsdoc                  |
| Testing          | Jest + SWC                                  |
| Containerization | Docker Compose                              |

## Architecture

The project follows a feature-based layered architecture. Routes compose middleware, controllers translate HTTP input into service calls, and services contain business rules and persistence operations.

```mermaid
flowchart LR
    Client[API Client] --> Router[Express Router]
    Router --> Middleware[Middleware Layer\nAuth / Permissions / Validation / Rate Limits]
    Middleware --> Controller[Controller Layer]
    Controller --> Service[Service Layer\nBusiness Rules]
    Service --> Prisma[Prisma Client]
    Prisma --> PostgreSQL[(PostgreSQL)]
    Service --> Redis[(Redis Sessions)]
    Service --> Files[uploads/\nBanner Files]
    Router --> Swagger[Swagger UI\n/api/v1/docs]
```

### Request lifecycle

```mermaid
sequenceDiagram
    participant C as Client
    participant A as Express API
    participant R as Redis
    participant D as PostgreSQL
    participant S as Service

    C->>A: POST /api/v1/auth/login
    A->>A: Validate email and password
    A->>D: Find user
    D-->>A: User and password hash
    A->>A: Verify password with Argon2
    A->>R: Create session with 7-day TTL
    R-->>A: session_id
    A-->>C: Set-Cookie: session_id

    C->>A: Authenticated API request
    A->>R: Read session_id
    R-->>A: userId
    A->>D: Load authenticated user
    D-->>A: User without password
    A->>S: Execute business operation
    S->>D: Read or write domain data
    D-->>S: Operation result
    S-->>A: Service result
    A-->>C: Standardized JSON response
```

## API Base URL

All application routes are mounted below:

```text
http://localhost:3000/api/v1
```

Swagger UI is available at:

```text
http://localhost:3000/api/v1/docs
```

Authentication is session-based. After login, send the `session_id` cookie with subsequent requests. Swagger UI can use the cookie authentication scheme after a successful login in a browser session.

## API Endpoints

### Authentication

| Method | Endpoint         | Access        | Description                             |
| ------ | ---------------- | ------------- | --------------------------------------- |
| `POST` | `/auth/register` | Public        | Register a user                         |
| `POST` | `/auth/login`    | Public        | Verify credentials and create a session |
| `POST` | `/auth/logout`   | Authenticated | Destroy the current session             |

### Users

| Method   | Endpoint             | Access        | Description                                    |
| -------- | -------------------- | ------------- | ---------------------------------------------- |
| `GET`    | `/user/me`           | Authenticated | Get the current user                           |
| `GET`    | `/user/get`          | Admin         | Get users with `limit` and `offset` pagination |
| `PATCH`  | `/user/update`       | Authenticated | Update username and email                      |
| `PATCH`  | `/user/password`     | Authenticated | Change the current password                    |
| `DELETE` | `/user/delete`       | Authenticated | Delete the current account                     |
| `PATCH`  | `/user/ban/:userId`  | Admin         | Ban a user                                     |
| `PATCH`  | `/user/mute/:userId` | Admin         | Mute a user                                    |

### Blogs

| Method   | Endpoint               | Access        | Description                                 |
| -------- | ---------------------- | ------------- | ------------------------------------------- |
| `GET`    | `/blog/me`             | Admin, Author | Get blogs owned by the current user         |
| `GET`    | `/blog/get`            | Admin         | Get all blogs with pagination               |
| `POST`   | `/blog/create`         | Admin, Author | Create a blog with optional `banner` upload |
| `PATCH`  | `/blog/update/:blogId` | Admin, Author | Update an owned blog or any blog as admin   |
| `DELETE` | `/blog/delete/:blogId` | Admin, Author | Delete a blog and its banner                |

Blog create and update requests use `multipart/form-data`. Supported fields are `title`, `content`, `status`, and the optional `banner` file.

### Comments

| Method   | Endpoint                     | Access        | Description                                |
| -------- | ---------------------------- | ------------- | ------------------------------------------ |
| `GET`    | `/comment/get`               | Admin, Author | Get comments with pagination               |
| `POST`   | `/comment/create/:blogId`    | Authenticated | Add a comment to a blog                    |
| `DELETE` | `/comment/delete/:commentId` | Owner, Admin  | Delete an owned comment or delete as admin |

### Author Requests

| Method | Endpoint                     | Access        | Description                                   |
| ------ | ---------------------------- | ------------- | --------------------------------------------- |
| `POST` | `/author/request`            | Authenticated | Submit an author request                      |
| `GET`  | `/author/get`                | Admin         | List author requests                          |
| `POST` | `/author/approve/:requestId` | Admin         | Approve and promote the requester to `AUTHOR` |
| `POST` | `/author/reject/:requestId`  | Admin         | Reject an author request                      |

## Environment Variables

Create a `.env` file in the project root. The application validates these values at startup:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://blog_user:blog_password@localhost:5433/blog_db
REDIS_URL=redis://localhost:6379
WHITELIST_ADMIN=admin@example.com
CORS_WHITELIST=http://localhost:3000

POSTGRES_USER=blog_user
POSTGRES_PASSWORD=blog_password
POSTGRES_DB=blog_db
```

`WHITELIST_ADMIN` accepts a comma-separated list of email addresses. In Docker Compose, the API connects to PostgreSQL through the `postgres` service and Redis through the `redis` service.

## Getting Started

### Option 1: Docker Compose

Make sure Docker Desktop is running, then:

```bash
git clone <your-repository-url>
cd blog-api
npm install
```

Create `.env`, then start the complete stack:

```bash
docker compose up --build
```

The API will be available at `http://localhost:3000`.

Docker Compose automatically waits for PostgreSQL and Redis health checks, deploys Prisma migrations, and starts the API.

To stop the stack:

```bash
docker compose down
```

To stop the stack and remove persisted database/cache volumes:

```bash
docker compose down -v
```

### Option 2: Local development

Run PostgreSQL and Redis locally, configure `.env`, install dependencies, generate Prisma Client, and apply migrations:

```bash
npm install
npx prisma generate
npx prisma migrate deploy
npm start
```

The development server uses Nodemon and starts `server.ts` through `tsx`.

## Project Structure

```text
.
├── generated/prisma/       # Generated Prisma client
├── prisma/
│   ├── migrations/         # Database migration history
│   └── schema.prisma       # Database schema and relationships
├── src/
│   ├── configs/             # Environment, database, Redis, Swagger config
│   ├── controllers/        # HTTP request and response handlers
│   ├── middlewares/         # Auth, permissions, validation, errors, uploads
│   ├── routes/              # Express route modules
│   │   └── swagger/         # OpenAPI route annotations
│   ├── schemas/             # Zod request schemas
│   ├── service/             # Feature-based business logic
│   ├── shared/              # Responses, errors, interfaces, and types
│   ├── test/                # Jest service tests
│   └── utils/               # Sessions, logging, CORS, and slug helpers
├── uploads/                 # Uploaded blog banners
├── Dockerfile
├── docker-compose.yml
├── index.ts                # Express application composition
├── server.ts               # Database/Redis startup and HTTP listener
├── package.json
└── tsconfig.json
```

## Security Notes

- Passwords are hashed with Argon2 and are never returned by authenticated user queries.
- Sessions are stored in Redis and identified by the `session_id` HTTP-only cookie.
- Authentication and general request limiters protect selected routes.
- Helmet adds standard security headers.
- CORS is controlled through `CORS_WHITELIST`.
- Keep `.env` out of version control and rotate credentials if they have been exposed.
- Review upload size and MIME-type restrictions before exposing the API to untrusted users.
- A user with `BANNED` activity cannot authenticate. A `MUTE` user can authenticate but is restricted from operations such as creating blogs or comments where enforced by the service layer.
