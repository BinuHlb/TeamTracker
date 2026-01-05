# Project Structure

This project follows a **feature-based** architecture, organizing code by feature modules rather than by file type. This makes it easier to scale and maintain as the application grows.

## Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Dashboard page
│   └── layout.tsx          # Root layout
│
├── components/             # Shared UI components (shadcn/ui)
│   ├── ui/                 # Base UI components (Button, Input, Card, etc.)
│   ├── app-sidebar.tsx     # Application sidebar
│   ├── site-header.tsx     # Site header component
│   └── ...                 # Other shared components
│
├── features/               # Feature modules (organized by domain)
│   ├── attendance/         # Attendance tracking module
│   │   ├── components/     # Attendance-specific components
│   │   ├── hooks/          # Attendance-specific hooks
│   │   ├── services/       # Attendance API/services
│   │   ├── types.ts        # Attendance TypeScript types
│   │   └── index.ts        # Public API exports
│   │
│   ├── leave/              # Leave management module
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types.ts
│   │   └── index.ts
│   │
│   ├── expenses/            # Expense tracking module
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types.ts
│   │   └── index.ts
│   │
│   ├── performance/         # Performance review module
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types.ts
│   │   └── index.ts
│   │
│   └── travel/              # Travel management module
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── types.ts
│       └── index.ts
│
├── hooks/                  # Global/shared hooks
│   └── use-mobile.tsx       # Mobile detection hook
│
├── store/                  # Global state management
│   └── index.ts            # Store exports (User, Theme, etc.)
│
└── utils/                  # Utility functions
    ├── utils.ts            # Common utilities (cn, formatters, etc.)
    └── index.ts            # Utility exports
```

## Import Paths

All imports use the `@/` alias which points to the `src/` directory:

- `@/components/*` - Shared components
- `@/components/ui/*` - Base UI components
- `@/features/{module}/*` - Feature module exports
- `@/hooks/*` - Global hooks
- `@/store/*` - Global state
- `@/utils/*` - Utility functions

## Feature Module Pattern

Each feature module follows a consistent structure:

1. **types.ts** - TypeScript interfaces and types
2. **components/** - Feature-specific React components
3. **hooks/** - Feature-specific custom hooks
4. **services/** - API calls and business logic
5. **index.ts** - Public API that exports what other modules can use

## Benefits of This Structure

1. **Scalability** - Easy to add new features without cluttering shared directories
2. **Maintainability** - Related code is grouped together
3. **Team Collaboration** - Multiple developers can work on different features simultaneously
4. **Clear Boundaries** - Each feature module is self-contained
5. **Reusability** - Shared components and utilities are clearly separated from feature code

