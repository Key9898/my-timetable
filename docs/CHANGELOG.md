# 📜 Changelog - My Timetable Project

ဤ project တွင် ပြုလုပ်ခဲ့သမျှသော ပြင်ဆင်မှုများ၊ ထပ်တိုးမှုများ အားလုံးကို ဤနေရာတွင် စနစ်တကျ မှတ်တမ်းတင်သွားမည်။

## [2026-03-24] - Phase 2 & 3 Completion
### Added
- **Global State Management**: Implemented `TimetableContext` to centralize all CRUD operations and UI state (View Switcher).
- **Multiple Views Strategy**: Added a high-performance **Weekly Grid View** alongside the existing Card List View.
- **Color Coding System**: Users can now select from 6 premium color accents for subjects.
- **Framer Motion Integration**: Added smooth, professional entry/exit and layout animations to all cards and views.
- **Recurring Tasks**: Added weekly recurrence support in the entry form.
- **Icon Standardization**: Integrated `lucide-react` as the mandatory icon library. Replaced all emojis and manual SVGs with vector icons.
- **Animation Standardization**: Enforced `framer-motion` as the project-wide animation standard.
- **Rule Updates**: Updated `PROJECT_PLAN.md` and `PROJECT_RULES.md` to force these technical standards for all future developments.

### Fixed
- Fixed critical dependency errors with `framer-motion` using `--legacy-peer-deps`.
- Resolved multiple linting errors (unused imports, unused variables) across the codebase.
- Corrected corrupt file content in `Home.tsx`.
- Added missing `index.ts` files for modular component resolution.
- `src/hooks/useTimetable.ts`: Core business logic for timetable operations (CRUD, conflict detection).
- `src/hooks/useModal.ts`: Reusable modal state management.
- `src/services/timetableService.ts`: LocalStorage data persistence support.
- `src/utils/dateFormatter.ts`: Implemented `formatTime` and `formatDay` utilities.
- Conflict Detection: Added overlapping task detection with user confirmation.
- Delete functionality: Full delete cycle implemented from UI to LocalStorage.

### Changed
- **Folder Refactoring**: Completed migration to Modular Component Architecture (`ui`, `common`, `containers`).
- `Home.tsx`: Major UI upgrade with hero section, improved layout, and full CRUD support.
- `global.css`: Migrated to a vibrant, premium light mode theme with custom OKLCH color palette.

- Architecture Compliance: Fully aligned the project with `implementation_plan.md` and `PROJECT_PLAN.md`.
- **Syntax & Type Stability**: Fixed critical `verbatimModuleSyntax` errors by using `import type` for all Functional Component (FC) declarations.
- **IDE Resolution Fixes**: Standardized absolute component imports to resolve persistent "Module not found" errors in IDEs.
- **Type Safety**: Resolved Framer Motion vs React 19 prop conflicts using `Omit` in the Button component.
- **Documentation Overhaul**: Updated all `.stories.tsx` files to reflect the new premium glassmorphism and motion-enabled UI standard.
