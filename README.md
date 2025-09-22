# Vite React TypeScript Tailwind Template

A modern React project template with TypeScript, Vite, and Tailwind CSS.

## Prerequisites

Before setting up this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`

- **pnpm** (recommended package manager)
  - Install globally: `npm install -g pnpm`
  - Verify installation: `pnpm --version`

### Project Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set environment variables:
  Copy the `.env.template` file and create a `.env` file. The `API_URL` value should match the running URL of your back-end server.

## Getting Started

After setting up the project:

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Open your browser and navigate to `http://localhost:5173`

3. Start editing `src/App.tsx` to see changes in real-time


## Available Scripts

- **Development server**: Start the development server with hot reload
  ```bash
  pnpm dev
  ```

- **Build**: Create a production build
  ```bash
  pnpm build
  ```

- **Preview**: Preview the production build locally
  ```bash
  pnpm preview
  ```

- **Lint**: Run ESLint to check code quality
  ```bash
  pnpm lint
  ```

## Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting