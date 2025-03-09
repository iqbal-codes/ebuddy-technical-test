# eBuddy Backend Service

This is the backend service for the eBuddy application, built with Express.js and Firebase.

## Tech Stack

- Node.js & Express.js
- TypeScript
- Firebase Admin SDK
- Jest for testing

## Project Structure

```
src/
├── config/         # Configuration files and environment setup
├── controllers/    # Request handlers and business logic
├── core/           # Core application setup and middleware
├── entities/       # TypeScript interfaces and types
├── middleware/     # Custom middleware functions
├── repositories/   # Data access layer and Firebase interactions
└── routes/         # API route definitions
```

## Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- Firebase project and service account

## Environment Setup

1. Create a `.env` file in the root directory with the following variables:

```env
PORT=3001
NODE_ENV=development

# Firebase Admin SDK Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
```

2. Place your Firebase service account key file in the `src/config` directory

## Available Scripts

```bash
# Install dependencies
yarn install

# Start development server with hot-reload
yarn dev

# Build the project
yarn build

# Start production server
yarn start

# Run tests
yarn test

# Lint code
yarn lint

# Clean build artifacts
yarn clean
```

## API Endpoints

### Authentication

```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
GET  /api/auth/me
```

### Users

```
GET    /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
```

## Development Guidelines

1. **Code Style**
   - Follow TypeScript best practices
   - Use meaningful variable and function names
   - Add JSDoc comments for functions and complex logic

2. **Error Handling**
   - Use try-catch blocks for async operations
   - Return appropriate HTTP status codes
   - Provide meaningful error messages

3. **Testing**
   - Write unit tests for controllers and services
   - Test error cases and edge scenarios
   - Maintain good test coverage

4. **Security**
   - Validate and sanitize all input data
   - Use middleware for authentication and authorization
   - Never commit sensitive information

## Firebase Emulator Setup

For local development, you can use Firebase Emulator Suite:

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Start emulators:
```bash
firebase emulators:start
```

## Deployment

1. Build the project:
```bash
yarn build
```

2. Set up environment variables in your deployment environment

3. Start the server:
```bash
yarn start
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Write/update tests
4. Create a pull request

## License

This project is private and confidential.