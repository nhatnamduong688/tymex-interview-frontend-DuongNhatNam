# Tymex MarketPlace Frontend

A TypeScript React application for a digital marketplace, using styled-components, Ant Design, and modern front-end practices.

## Setup and Development

### Prerequisites

- Node.js (v16 or newer)
- Yarn package manager

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd tymex-interview-frontend-DuongNhatNam
```

2. Install dependencies

```bash
yarn install
```

3. Run development server

```bash
yarn dev
```

4. Build for production

```bash
yarn build
```

## Deploy to Vercel

### Method 1: Automatic Deployment (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure the build settings:
   - Framework preset: Vite
   - Build command: `yarn build`
   - Output directory: `dist`
   - Install command: `yarn install`

### Method 2: Manual Deployment

1. Install Vercel CLI

```bash
npm i -g vercel
```

2. Login to Vercel

```bash
vercel login
```

3. Deploy the application

```bash
vercel
```

## Troubleshooting Deployment Issues

If you encounter TypeScript errors during deployment:

1. Ensure all dependencies are properly installed, including dev dependencies

```bash
yarn install
```

2. Try a local build to check for errors

```bash
yarn build
```

3. Check for case sensitivity issues in imports

   - Vercel deployments are case-sensitive
   - Ensure import paths match the exact case of the file/folder names

4. If using lodash modules, ensure they're installed along with their type definitions

```bash
yarn add lodash.debounce @types/lodash.debounce
```
