# Tymex Frontend Interview Project

## Overview

This project is a marketplace application built with React, TypeScript, and Styled Components.

## API Information

This project uses a mock API deployed on Render:

- API Base URL: `https://tymex-mock-api.onrender.com`
- Sample endpoint: `https://tymex-mock-api.onrender.com/products`

Note: The API is hosted on Render's free tier, which may sleep after 15 minutes of inactivity. The first request may take 1-2 minutes to wake up the server.

## Local Development

```bash
# Install dependencies
yarn install

# Run the development server
yarn dev

# Build for production
yarn build
```

## Features

- Product listing with pagination
- Product filtering and search
- API connection with auto-refresh
- Responsive design
- Debug panel for API monitoring

## Technologies

- React
- TypeScript
- Styled Components
- Axios for API requests
- Vite build tool

## JSON Server Mock API

The API was created using JSON Server and deployed to Render.
If you want to run the API locally:

```bash
# Clone the repository
git clone https://github.com/nhatnamduong688/tymex-mock-server.git

# Install dependencies
cd tymex-mock-server
npm install

# Run the server
node server.js
```

Then update the API_BASE_URL in `src/services/api.ts` to `http://localhost:5005`.

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
