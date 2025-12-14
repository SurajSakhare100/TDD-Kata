# TDD Kata: Sweet Shop Management System

A full-stack application for managing a sweet shop, built following Test-Driven Development (TDD) principles.

## Project Structure

```
TDD-Kata/
├── backend/          # Node.js/Express/TypeScript API
├── frontend/         # React/TypeScript SPA
└── README.md         # This file
```

## Quick Start

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory
   - Copy the following template and update with your values:
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

4. Set up PostgreSQL database:
   - Create a database named `sweet_shop_db` (or update DB_NAME in .env)
   - Database migrations will be added during TDD implementation

5. Start the development server:
   ```bash
   npm run dev
   ```
   Backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `frontend` directory
   - Add the following:
     ```
     VITE_API_URL=http://localhost:3000
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## Technology Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Testing**: Jest with Supertest
- **Validation**: Zod

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router
- **HTTP Client**: Axios
- **Testing**: Vitest with React Testing Library
- **Validation**: Zod

## Development Workflow

This project follows **Test-Driven Development (TDD)**:

1. **Red**: Write failing tests first
2. **Green**: Implement minimal code to pass tests
3. **Refactor**: Improve code quality while keeping tests green

### Running Tests

**Backend:**
```bash
cd backend
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

**Frontend:**
```bash
cd frontend
npm test              # Run all tests
npm run test:ui       # Test UI
npm run test:coverage # Coverage report
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Sweets (Protected)
- `POST /api/sweets` - Add a new sweet (Admin only)
- `GET /api/sweets` - Get all sweets
- `GET /api/sweets/search` - Search sweets by name, category, or price
- `GET /api/sweets/:id` - Get a specific sweet
- `PUT /api/sweets/:id` - Update a sweet (Admin only)
- `DELETE /api/sweets/:id` - Delete a sweet (Admin only)

### Inventory (Protected)
- `POST /api/sweets/:id/purchase` - Purchase a sweet (decreases quantity)
- `POST /api/sweets/:id/restock` - Restock a sweet (Admin only, increases quantity)

## Features

- ✅ User registration and authentication
- ✅ JWT-based token authentication
- ✅ Sweet CRUD operations
- ✅ Search and filter functionality
- ✅ Inventory management (purchase/restock)
- ✅ Role-based access control (User/Admin)
- ✅ Responsive frontend design


## License

ISC
