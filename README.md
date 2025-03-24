# Tymex Marketplace

A modern NFT marketplace application built with Next.js and React. Browse, filter, and explore NFT collections with a sleek, responsive interface.

## 🚀 Live Demo

[View Live Demo](https://tymex-interview-frontend-duong-nhat-nam.vercel.app/marketplace)

## ✨ Features

- Browse NFT collections with responsive grid layout
- Filter NFTs by various criteria
- Modern UI/UX design
- Connect wallet functionality
- Fully responsive design for all devices

## 🛠️ Technologies

- [Next.js 15](https://nextjs.org/) - React framework
- [React 18](https://reactjs.org/) - JavaScript library
- [TypeScript](https://www.typescriptlang.org/) - Static type checking
- [React Query](https://tanstack.com/query/latest) - Data fetching and caching
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Axios](https://axios-http.com/) - HTTP client
- [RC Slider](https://github.com/react-component/slider) - Slider component
- [React Loader Spinner](https://mhnpd.github.io/react-loader-spinner/) - Loading animations

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

## 🔧 Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/tymex-interview-frontend-DuongNhatNam.git
   cd tymex-interview-frontend-DuongNhatNam
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🚢 Deployment

This project is configured for easy deployment to Vercel.

### Deploying to Vercel

1. Push your code to a GitHub repository

2. Connect to Vercel

   - Sign up or log in to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Follow the setup instructions

3. Manual Deployment
   - Install Vercel CLI: `npm i -g vercel`
   - Run: `vercel` in your project directory
   - Follow the prompts to deploy

The project includes a `vercel.json` configuration file that ensures proper routing and build settings.

## ⚙️ Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```
NEXT_PUBLIC_API_URL=your_api_url_here
```

## 🧪 Running Tests

```bash
npm run test
# or
npm run test:watch
```

## 📚 Project Structure

```
/
├── src/                # Source code
│   ├── app/            # Next.js app directory
│   ├── assets/         # Static assets and resources
│   ├── client-api/     # API client and services
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── providers/      # Context providers
│   ├── types/          # TypeScript type definitions
│   └── __tests__/      # Test files
├── public/             # Public static files
├── next.config.ts      # Next.js configuration
├── tsconfig.json       # TypeScript configuration
├── jest.config.js      # Jest test configuration
├── package.json        # Project dependencies
└── vercel.json         # Vercel deployment configuration
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 License

This project is licensed under the terms of the MIT license.

## 👨‍💻 Author

- **Duong Nhat Nam**

---

Created for the Tymex Frontend Developer Interview Challenge
