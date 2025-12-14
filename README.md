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
- ✅ Comprehensive test coverage (Backend & Frontend)
- ✅ Modern UI with Tailwind CSS

## Screenshots

*(Screenshots will be added here showing the application in action)*

## My AI Usage

### AI Tools Used

This project was developed with the assistance of AI tools to accelerate development and ensure best practices:

- **Cursor AI (Composer)**: Used throughout the development process for:
  - Generating boilerplate code for Express routes, controllers, and services
  - Creating React components with TypeScript
  - Writing test cases following TDD principles
  - Code refactoring and optimization suggestions
  - Debugging assistance

### How AI Was Used

1. **Initial Project Setup**
   - AI assisted in generating the project structure for both backend and frontend
   - Created configuration files (tsconfig.json, vite.config.ts, tailwind.config.js)
   - Generated boilerplate for Express server setup

2. **Backend Development**
   - Used AI to generate database models and schema
   - Created authentication middleware and JWT handling
   - Generated API route handlers and controllers
   - AI helped write integration tests for API endpoints

3. **Frontend Development**
   - AI generated React components with proper TypeScript types
   - Created authentication context and state management
   - Generated form components with validation
   - AI assisted in converting manual CSS to Tailwind CSS classes
   - Created comprehensive component tests

4. **Testing**
   - AI generated test templates following TDD patterns
   - Created mock data and test utilities
   - Generated test cases for edge cases and error handling

### Reflection on AI Impact

**Positive Impacts:**
- **Speed**: Significantly accelerated development by generating boilerplate code
- **Best Practices**: AI suggested modern patterns and best practices
- **Consistency**: Helped maintain consistent code style across the project
- **Learning**: Exposed me to new patterns and approaches I might not have considered

**Challenges & Learnings:**
- **Review Required**: All AI-generated code was carefully reviewed and tested
- **Understanding**: Made sure to understand every piece of code before using it
- **Customization**: AI suggestions were customized to fit project-specific requirements
- **Testing**: All AI-generated code was thoroughly tested to ensure correctness

**Responsible Usage:**
- Never blindly copied AI-generated code
- Always reviewed and understood the code before implementation
- Customized AI suggestions to match project requirements
- Verified all functionality through manual testing
- Used AI as a tool to augment, not replace, my development skills

**Conclusion:**
AI tools were invaluable in accelerating development and ensuring code quality. They helped generate boilerplate, suggest best practices, and catch potential issues early. However, careful review, understanding, and testing were always prioritized to ensure the final product met all requirements and maintained high quality standards.

## License

ISC
