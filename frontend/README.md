# Sweet Shop Frontend

Frontend application for the Sweet Shop Management System built with React, TypeScript, and Vite.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   - Copy `.env.example` to `.env`
   - Update `VITE_API_URL` if your backend runs on a different port:
     ```
     VITE_API_URL=http://localhost:3000
     ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   The application will start on `http://localhost:5173`

4. **Build for Production**
   ```bash
   npm run build
   ```

5. **Preview Production Build**
   ```bash
   npm run preview
   ```

6. **Run Tests**
   ```bash
   npm test              # Run all tests
   npm run test:ui       # Run tests with UI
   npm run test:coverage # Run tests with coverage
   ```

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page-level components
│   ├── services/       # API client functions
│   ├── hooks/          # Custom React hooks
│   ├── context/        # Context providers (Auth, etc.)
│   ├── utils/          # Helper functions
│   ├── types/          # TypeScript type definitions
│   ├── test/           # Test setup files
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── package.json
├── tsconfig.json
├── vite.config.ts
└── index.html
```

## Features

- User authentication (Login/Register)
- Sweet catalog display
- Search and filter functionality
- Purchase functionality
- Admin panel (Add, Edit, Delete, Restock sweets)
- Responsive design

## Development Notes

- Uses React Router for navigation
- Axios for API calls with interceptors for auth
- TypeScript for type safety
- Vite for fast development and building

