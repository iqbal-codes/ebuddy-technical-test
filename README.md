# eBuddy Technical Test Project

This is a monorepo containing both frontend and backend applications for the eBuddy technical test project.

## Project Structure

```
├── frontend-repo/     # Next.js frontend application
└── backend-repo/      # Express.js backend application
```

## Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- Firebase account and project setup

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd ebuddy-technical-test
```

2. Install dependencies for both projects:
```bash
yarn install
```

3. Set up environment variables:
   - Create `.env` files in both frontend-repo and backend-repo directories
   - Copy the necessary environment variables from `.env.example` files

4. Start the development servers:

For frontend (in frontend-repo directory):
```bash
cd frontend-repo
yarn dev
```

For backend (in backend-repo directory):
```bash
cd backend-repo
yarn dev
```

## Available Scripts

In the project root directory:

```bash
yarn build      # Build both frontend and backend
yarn dev        # Start both frontend and backend in development mode
yarn clean      # Clean build artifacts
```

## Firebase Setup

1. Create a new Firebase project in the [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and Firestore services
3. Add your Firebase configuration to the frontend and backend environment files

## Development Guidelines

- Follow the established code style and conventions
- Write meaningful commit messages
- Update documentation when making significant changes
- Add appropriate tests for new features

## License

This project is private and confidential.