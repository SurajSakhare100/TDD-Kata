# Sweet Shop Backend API

Backend API for the Sweet Shop Management System built with Node.js, Express, TypeScript, and PostgreSQL.

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Database Setup**
   - Create a PostgreSQL database named `sweet_shop_db` (or your preferred name)
   - Update the database credentials in `.env` file

3. **Environment Variables**
   - Copy `.env.example` to `.env`
   - Update the values in `.env` with your configuration:
     ```
     PORT=3000
     NODE_ENV=development
     FRONTEND_URL=http://localhost:5173
     DB_HOST=localhost
     DB_PORT=5432
     DB_NAME=sweet_shop_db
     DB_USER=postgres
     DB_PASSWORD=postgres
     JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
     JWT_EXPIRES_IN=24h
     ```

4. **Initialize Database Schema**
   - The schema will be automatically created when you start the server
   - Or manually run the schema: `psql -d sweet_shop_db -f src/config/schema.sql`

5. **Seed Database (Optional but Recommended)**
   ```bash
   npm run seed
   ```
   This will populate the database with:
   - 3 test users (1 admin, 2 regular users)
   - 17 sample sweets across 5 categories
   
   **Test Credentials:**
   - Admin: `admin@sweetshop.com` / `admin123`
   - User: `user@sweetshop.com` / `user123`
   - User: `john@example.com` / `password123`

6. **Start Development Server**
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:3000`

7. **Run Tests**
   ```bash
   npm test              # Run all tests
   npm run test:watch    # Run tests in watch mode
   npm run test:coverage # Run tests with coverage report
   ```

## Project Structure

```
backend/
├── src/
│   ├── config/         # Configuration files (database, JWT, seed)
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Auth, validation middleware
│   ├── models/         # Database models
│   ├── routes/         # API route definitions
│   ├── services/       # Business logic
│   ├── utils/          # Helper functions
│   └── index.ts        # Application entry point
├── tests/
│   ├── unit/           # Unit tests
│   ├── integration/    # Integration tests
│   └── e2e/            # End-to-end tests
├── package.json
├── tsconfig.json
└── jest.config.js
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Sweets (Protected)
- `POST /api/sweets` - Add a new sweet (Admin)
- `GET /api/sweets` - Get all sweets
- `GET /api/sweets/search` - Search sweets
- `GET /api/sweets/:id` - Get a specific sweet
- `PUT /api/sweets/:id` - Update a sweet (Admin)
- `DELETE /api/sweets/:id` - Delete a sweet (Admin)

### Inventory (Protected)
- `POST /api/sweets/:id/purchase` - Purchase a sweet
- `POST /api/sweets/:id/restock` - Restock a sweet (Admin)

## Development Workflow

This project follows Test-Driven Development (TDD):
1. Write failing tests (Red)
2. Implement minimal code to pass tests (Green)
3. Refactor for clean code (Refactor)

