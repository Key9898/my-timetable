# Architecture Implementation Plan - My Timetable (Modular Library Style)

IMPORTANT: This architecture MUST be followed strictly to ensure a professional, reusable, and clean codebase.

## 🏗️ Core Architecture Patterns

We follow a **Modular Component Architecture** focused on reusability and scalability, suitable for professional libraries and large-scale apps.

### 1. Component Pattern (Modular/Atomic)
- **Modular Folders**: Every component lives in its own folder.
    - Example: `src/components/ui/Button/Button.tsx`, `Button.stories.tsx`, `index.ts`.
- **UI Components (`src/components/ui/` & `src/components/common/`)**:
    - Purely presentational (Dumb).
    - No side effects or data fetching.
    - Logic-free `.tsx` files focused on UI/UX.
    - **STORYBOOK RULE**: Every UI component MUST have a corresponding `.stories.tsx` file in the same folder for UI/UX documentation and visual testing.
- **Logic Extraction (Hooks)**: 
    - All complex state management and side effects are extracted into `src/hooks/`.
    - Example: `useTimetable.ts`, `useModal.ts`.
    - This allows logic to be reused independently from the UI.

### 2. Containers & Orchestration
- **Containers (`src/containers/`)**: 
    - Smart components that orchestrate data flow and connect hooks to UI components.
    - They handle "What" the app does, while UI components handle "How" it looks.

### 3. Core Layers
- **Services (`src/services/`)**: Centralized business logic and external communications.
- **Utils (`src/utils/`)**: General helper functions (e.g., `a11y.ts`, `dateFormatter.ts`).
- **Models (`src/models/`)**: TypeScript definitions and interfaces representing core entities.
- **Pages (`src/pages/`)**: Top-level route components that orchestrate Containers.

## 📂 Directory Structure

```text
src/
├── components/
│   ├── ui/                 # Atomic UI (Button, Modal, Input) + .stories.tsx
│   └── common/             # Complex UI (TimetableCard, Navbar) + .stories.tsx
├── containers/             # Data Orchestration Components
├── hooks/                  # ALL Smart Logic (useTimetable, etc.)
├── services/               # Business Logic
├── utils/                  # Helper Utilities (a11y, formatters)
├── models/                 # TypeScript Interfaces/Types
├── pages/                  # Route-level screens
├── context/                # Global State Management
├── styles/                 # Global styling (Tailwind v4)
└── tests/                  # Test suites and Mock Data
```

## 📜 Strict Implementation Rules
1. **No Logic in UI Components**: Logic MUST be in hooks. UI components only receive props.
2. **Modular Folder Structure**: Do not put multiple components in one folder. Use `index.ts` for clean exports.
3. **Mandatory Documentation**: Every new UI component MUST have a `.stories.tsx` file.
4. **Full Responsiveness**: Every component and page MUST be fully responsive across Desktop, Tablet, and Mobile sizes using Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`).
5. **Mocking Strategy**: Use `*.stories.tsx` or `src/tests/` for mock data. Avoid a global `mocks/` folder if it can be localized.

## 🚀 Implementation Progress
1. [x] Setup Project with Vite/React/Tailwind v4/DaisyUI.
2. [x] Define Core Models (`Timetable.ts`).
3. [x] Update Architecture to Modular Style (Hooks, Containers).
4. [x] Build Atomic UI Components (Button, Modal).
5. [x] Setup Storybook for Component Documentation.
6. [x] Refactor existing Smart components to Containers/Hooks.
7. [x] Implement Core Timetable Logic in Hooks & Context API.
