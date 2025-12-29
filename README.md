# Todo List API

A RESTful API for managing to-do lists with user authentication. This project implements a complete backend system allowing users to register, authenticate, and manage their personal to-do items.

## Features

- 🔐 **User Authentication** - Secure registration and login with JWT tokens
- 📝 **CRUD Operations** - Create, read, update, and delete to-do items
- 🔒 **Authorization** - Users can only access and modify their own to-do items
- ✅ **Data Validation** - Input validation using Zod schemas
- 📄 **Pagination** - Paginated responses for to-do list retrieval
- 🔄 **Refresh Tokens** - Token refresh mechanism for enhanced security
- 🛡️ **Security** - Password hashing with bcrypt and secure token-based authentication

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (via Knex.js)
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Zod
- **Password Hashing**: bcrypt

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd todo-list-api
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory:

```env
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/todo_db
JWT_SECRET=your-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-key-here
```

4. Run database migrations:

```bash
npm run migrate
```

5. Start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Authentication

#### Register a New User

```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@doe.com",
  "password": "password"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@doe.com",
  "password": "password"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Refresh Token

```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### To-Do Items

All to-do endpoints require authentication. Include the token in the `Authorization` header:

```
Authorization: Bearer <token>
```

#### Create a To-Do Item

```http
POST /todos
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Buy milk, eggs, and bread"
}
```

**Response:**

```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Buy milk, eggs, and bread",
  "userId": 1,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### Get All To-Do Items (Paginated)

```http
GET /todos?page=1&limit=10
Authorization: Bearer <token>
```

**Response:**

```json
{
  "data": [
    {
      "id": 1,
      "title": "Buy groceries",
      "description": "Buy milk, eggs, and bread"
    },
    {
      "id": 2,
      "title": "Pay bills",
      "description": "Pay electricity and water bills"
    }
  ],
  "page": 1,
  "limit": 10,
  "total": 2
}
```

#### Update a To-Do Item

```http
PUT /todos/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Buy milk, eggs, bread, and cheese"
}
```

**Response:**

```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Buy milk, eggs, bread, and cheese"
}
```

**Error Response (403 Forbidden):**

```json
{
  "message": "Forbidden"
}
```

#### Delete a To-Do Item

```http
DELETE /todos/1
Authorization: Bearer <token>
```

**Response:** `204 No Content`

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `204` - No Content (successful deletion)
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (user doesn't own the resource)
- `404` - Not Found
- `500` - Internal Server Error

## Project Structure

```
todo-list-api/
├── config/
│   └── db.js                 # Database configuration
├── controllers/
│   ├── auth.controller.js    # Authentication controllers
│   └── todos.controller.js   # To-do controllers
├── db/
│   ├── knexfile.js          # Knex configuration
│   └── migrations/           # Database migrations
├── middlewares/
│   ├── auth.middleware.js    # Authentication middleware
│   └── validation.middleware.js  # Validation middleware
├── models/
│   ├── user.model.js         # User model
│   └── todo.model.js         # Todo model
├── routes/
│   ├── auth.route.js         # Authentication routes
│   └── todos.route.js        # To-do routes
├── schemas/
│   ├── auth.schema.js        # Authentication validation schemas
│   └── todos.schema.js       # Todo validation schemas
├── utils/
│   ├── password.js           # Password utilities
│   └── token.js              # JWT token utilities
├── app.js                    # Express app configuration
├── server.js                 # Server entry point
└── package.json              # Dependencies
```

## Database Migrations

### Create a new migration:

```bash
npx knex migrate:make <migration-name> --migrations-directory db/migrations
```

### Run migrations:

```bash
npm run migrate
# or
npx knex migrate:latest --knexfile db/knexfile.js
```

### Create a seed file:

```bash
npx knex seed:make <seed-name> --cwd db
```

### Run seeds:

```bash
npm run seed
# or
npx knex seed:run --knexfile db/knexfile.js
```

## Environment Variables

| Variable             | Description                   | Required           |
| -------------------- | ----------------------------- | ------------------ |
| `PORT`               | Server port number            | No (default: 3000) |
| `DATABASE_URL`       | PostgreSQL connection string  | Yes                |
| `JWT_SECRET`         | Secret key for JWT tokens     | Yes                |
| `JWT_REFRESH_SECRET` | Secret key for refresh tokens | Yes                |

## Security Features

- Passwords are hashed using bcrypt before storage
- JWT tokens for stateless authentication
- Refresh token mechanism for secure token renewal
- Authorization checks ensure users can only access their own resources
- Input validation prevents malicious data injection

## Development

Start the development server with auto-reload:

```bash
npm run dev
```

## License

ISC

## Project Reference

This project is based on the [Todo List API project](https://roadmap.sh/projects/todo-list-api) from roadmap.sh.
