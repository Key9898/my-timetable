# Architecture Implementation Plan - My Timetable

IMPORTANT: This architecture MUST be followed strictly. Do NOT deviate from these patterns or directory structures in future tasks.

## 🏗️ Core Architecture Patterns

We follow a modular, "Clean Architecture" inspired approach for React, focusing on Separation of Concerns (SoC).

### 1. Component Pattern (Dumb vs. Smart)
- **Dumb Components (`src/components/dumb/`)**: 
    - Purely presentational.
    - No side effects or data fetching.
    - Receive data and callbacks via props.
    - Isolated and highly reusable.
    - Divided into `ui` (atomic elements like Buttons) and `common` (reusable blocks like Cards).
    - **STORYBOOK RULE**: Every component in this directory MUST have a corresponding `.stories.tsx` file in the same folder.
- **Smart Components (`src/components/smart/`)**:
    - Manage state and side effects.
    - Connect to services and mappers.
    - Pass data down to dumb components.

### 2. Layers
- **Services (`src/services/`)**: Centralized API calls and business logic.
- **Mappers (`src/mappers/`)**: Transform external/API data into internal Models.
- **Models (`src/models/`)**: TypeScript definitions and interfaces representing the core data entities.
- **Pages (`src/pages/`)**: Top-level route components that orchestrate Smart components.
- **Mocks (`src/mocks/`)**: Centralized mock data and API response simulation for frontend development without a backend.

## 📂 Directory Structure

```text
src/
├── components/
│   ├── dumb/               # Presentational Components
│   │   ├── ui/             # Atomic UI (Button, Modal, Input) + .stories.tsx
│   │   └── common/         # Complex UI (TimetableCard, Navbar) + .stories.tsx
│   └── smart/              # Container/Logic Components
├── services/               # API & Business Logic
├── mappers/                # Data Transformation logic
├── mocks/                  # Mock Data & API Simulations
├── models/                 # TypeScript Interfaces/Types
├── pages/                  # Route-level screens
├── hooks/                  # Custom React Hooks
├── context/                # Global State Management
├── styles/                 # Global styling (Tailwind/CSS)
└── utils/                  # Helper utilities
```

## 📜 Strict Implementation Rules
1. **No Logic in Dumb Components**: Dumb components should only focus on rendering. State should be passed from parent or handled by Smart components.
2. **Mandatory Documentation**: Every new UI component MUST be accompanied by a `.stories.tsx` file to ensure visual testing and documentation.
3. **Flat Directory Access**: Do not bypass mappers or services to call APIs directly from components.
4. **Type-Only Imports**: Use `import type` for TypeScript interfaces to ensure clean builds.
5. **Mocking Strategy**: During development, use `src/mocks/` for all data. Services should use a `USE_MOCK` flag to easily switch to real API endpoints when ready.

## 🚀 Implementation Progress
1. [x] Setup Project with Vite/React/Tailwind/DaisyUI.
2. [x] Define Core Models (`Timetable.ts`).
3. [x] Create Mappers for data transformation.
4. [x] Implement Mock Services for testing.
5. [x] Build Atomic Dumb Components (UI elements).
6. [x] Implement Smart Containers to manage data flow.
7. [x] Connect everything in the Page layer.
8. [x] Setup Storybook for Component Documentation.
