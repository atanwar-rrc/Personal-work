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

## Project Setup

### Creating a New Project

To create a new project using this template:

```bash
pnpm create vite [your-project-name] --template react-ts
```

Replace `[your-project-name]` with your desired project name.

### Setting Up an Existing Project

If you've cloned this repository:

1. Navigate to the project directory:
   ```bash
   cd [your-project-name]
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

## Adding Tailwind CSS v4

To add Tailwind CSS v4 to your Vite React project:

1. **Install Tailwind CSS v4**:
   ```bash
   pnpm install tailwindcss @tailwindcss/vite
   ```

2. **Configure Vite**: Modify `vite.config.ts` to include the Tailwind plugin:

   Add the import at the top:
   ```typescript
   import tailwindcss from "@tailwindcss/vite";
   ```

   Add `tailwindcss()` to the plugins array:
   ```typescript
   import { defineConfig } from "vite";
   import react from "@vitejs/plugin-react";
   import tailwindcss from "@tailwindcss/vite";

   // https://vite.dev/config/
   export default defineConfig({
     plugins: [react(), tailwindcss()],
   });
   ```

3. **Update CSS file**: In `src/index.css`, remove all existing code and add:
   ```css
   @import "tailwindcss";
   ```

4. **Clean up**: Remove the `src/App.css` file as it's no longer needed with Tailwind.

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

## Getting Started

After setting up the project:

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Open your browser and navigate to `http://localhost:5173`

3. Start editing `src/App.tsx` to see changes in real-time
