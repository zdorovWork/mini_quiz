# Mini Quiz

A simple web application for taking a mini-quiz with two questions. The app automatically saves progress to localStorage, so you can continue later even after page refresh.

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
├── index.html`
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

- ✅ 2 questions with multiple choice answers
- ✅ Visual feedback for selected answers
- ✅ Email input form with validation (regex-based)
- ✅ Results page showing:
  - Score (correct/total)
  - User's email
  - All questions with selected and correct answers
  - Visual indicators for correct/incorrect answers
- ✅ State persistence in localStorage (automatic save)
- ✅ State restoration after page reload
- ✅ "Try Again" functionality to reset and retake quiz
- ✅ Custom router implementation (no external routing library)
- ✅ Minimal dependencies (React + TypeScript only)

## Application Flow

1. **Home Page** (`/`) - Welcome screen with "Start Quiz" button
2. **Question 1** (`/question-1`) - First question with answer selection
3. **Question 2** (`/question-2`) - Second question with answer selection
4. **Email Modal** - Appears after completing Question 2
5. **Results Page** (`/results`) - Shows quiz results and allows retry

## Architecture

- **Custom Router**: Built with History API (pushState, popState)
- **State Management**: React hooks + localStorage (no Redux/Zustand)
- **UI Components**: Custom components with vanilla CSS (BEM methodology)
- **Type Safety**: Full TypeScript coverage

## Development

The project uses minimal dependencies and follows React and TypeScript best practices.

### Code Structure

- `/src/app` - Core application files (App, Router, State)
- `/src/components` - Reusable UI components (Button, Card, Input, Modal, Typography)
- `/src/pages` - Page components for each route
- `/src/hooks` - Custom React hooks (useRouter, useQuizState)
- `/src/types` - TypeScript type definitions
- `/src/utils` - Utility functions (validation, questions data)
