# Mini Quiz

A simple web application for taking a mini-quiz with two questions.

## Project Structure

```
mini-quiz/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Application pages/screens
│   ├── hooks/          # Custom React hooks
│   ├── types/          # TypeScript types and interfaces
│   ├── utils/          # Utility functions
│   ├── assets/         # Static resources (images, icons)
│   ├── app/            # Core application files
│   │   ├── App.tsx     # Main application component
│   │   ├── router.tsx  # Routing and navigation
│   │   └── state.ts    # Global state
│   └── main.tsx        # Application entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Technology Stack

- **React 18** - UI library
- **TypeScript** - Typed JavaScript
- **Vite** - Fast bundler and dev server

## Installation and Running

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Features

- 2 questions with answer options
- Display correct/incorrect answers after selection
- Email input form with validation
- Final screen with results
- State persistence in localStorage
- State restoration after page reload

## Development

The project uses minimal dependencies and follows React and TypeScript best practices.
