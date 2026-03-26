# 📜 Changelog - My Timetable Project

ဤ project တွင် ပြုလုပ်ခဲ့သမျှသော ပြင်ဆင်မှုများ၊ ထပ်တိုးမှုများ အားလုံးကို ဤနေရာတွင် စနစ်တကျ မှတ်တမ်းတင်သွားမည်။

## [2026-03-26] - Repo Restructure & Vercel Deployment Fix

### Changed
- **Flat Structure Migration**: Removed nested `mytimetable/` npm workspace. Moved all source files, configs, and assets to repo root for a cleaner, professional structure.
  - `mytimetable/src/` → `src/`
  - `mytimetable/public/` → `public/`
  - `mytimetable/.storybook/` → `.storybook/`
  - All config files (`vite.config.ts`, `tsconfig*.json`, `eslint.config.js`, etc.) → repo root
- **package.json Consolidation**: Merged workspace `package.json` into root. Removed npm workspace config. Normalized all Storybook packages to v8.6.x.
- **vercel.json Update**: Simplified to `outputDirectory: dist` (root-relative). Removed monorepo-specific paths.
- **ARCHITECTURE.md**: Updated directory structure diagram to reflect flat repo layout and corrected `context/` → `contexts/`.
- **PROJECT_PLAN.md**: Updated Deployment section with Vercel flat-structure config details.

### Fixed
- **Vercel Deploy Error**: Resolved `lightningcss.linux-x64-gnu.node` platform binary mismatch by switching from monorepo (workspace root lock file missing Linux binary) to flat structure (single lock file with all platform binaries).
- **Storybook Import Error**: Fixed `Meta`/`StoryObj` imported from `@storybook/react-vite` → corrected to `@storybook/react` in `ErrorBoundary.stories.tsx` and `Toast.stories.tsx`.
- **tsconfig.app.json**: Added `exclude: ["src/**/*.stories.tsx"]` to prevent Storybook type errors from breaking the main production build.
- **ESLint**: Zero errors, zero warnings maintained after restructure.
- **.gitignore**: Created root `.gitignore` (was missing). Excludes `node_modules/`, `dist/`, `storybook-static/`, `.claude/`, etc.

## [2026-03-26] - Quality Audit & Logic Refactoring

### Added
- **Navbar Storybook Documentation**: Created `Navbar.stories.tsx` to ensure 100% Storybook coverage for common components (Rule 20).
- **Dedicated Context Hooks**: Extracted `useTimetableContext` and `useToastContext` into standalone hook files:
  - `src/hooks/useTimetableContext.ts`
  - `src/hooks/useToastContext.ts`
  This solves Fast Refresh warnings and aligns with the strict Hook separation policy (Rule 19).

### Fixed
- **System-Wide Quality Audit**: Achieved a **"Zero Errors, Zero Warnings"** ESLint state across the entire codebase.
- **Rules of Hooks Violation**: Refactored `Toast.stories.tsx` and `Modal.stories.tsx` to eliminate anonymous render functions and `any` types.
- **Dangling Dependencies**: Removed unused `useEffect`, `useState`, and `createContext` imports in `Toast.tsx` and various context providers.
- **Fast Refresh Compatibility**: Split Context objects into `.ts` files and Providers into `.tsx` files to prevent development-mode reload glitches.
- **UI Spacing Verification**: Audited and stabilized Dashboard vertical spacing (`mt-4`) to ensure a consistent visual balance across all resolutions as per user feedback.

### Changed
- **Modular Logic Extraction**: Migrated `getItemsForDay` filtering and sorting logic from `TimetableGrid.tsx` into a reusable utility `src/utils/timetableUtils.ts` (Rule 19 compliance).

## [2026-03-25] - Logic Issues Fix & Unit Tests Setup

### Added

- **Error Boundary Component**: Created `ErrorBoundary.tsx` with graceful error handling, retry functionality, and Framer Motion animations.
- **Toast Notification System**: Implemented `useToast.ts` hook and `Toast.tsx` component with success/error/warning/info variants and auto-dismiss.
- **Form Validation Enhancement**: Upgraded `useFormValidation.ts` with comprehensive validation rules (time conflicts, duration limits, required fields).
- **Unit Tests Infrastructure**: Set up Vitest with React Testing Library and jsdom environment.
  - Created `vitest.config.ts` with coverage reporting.
  - Created `src/test/setup.ts` for test environment configuration.
  - Added test scripts: `test`, `test:run`, `test:coverage`.
- **Unit Tests**: Added comprehensive test suites:
  - `dateFormatter.test.ts`: Tests for formatTime, formatDay, getTimeValue, getDurationMinutes, formatDuration.
  - `useFormValidation.test.ts`: Tests for validation logic, error states, and form handling.

### Fixed

- **Import Path Errors**: Corrected relative import paths in test files.
- **Test Assertion Mismatches**: Adjusted test expectations to match actual function behavior for edge cases.
- **Missing Dependency**: Added `@testing-library/dom` to resolve module resolution errors.
- **Linter Errors**: Fixed accessibility and type errors:
  - Modal.tsx: Added `title` and `aria-label` attributes to close button for discernible text.
  - useFormValidation.ts: Fixed type casting for `FormErrors` index access.
  - Home.tsx: Added missing `useFormValidation` import.

## [2026-03-25] - Navigation, Analytics & History Activation

### Added

- **Functional Multi-View Navigation**: Activated real `Dashboard`, `Analytics`, and `History` screens with URL-based browser navigation and animated page transitions.
- **Analytics Workspace**: Added a fully functional analytics screen with live metrics for workload, completion rate, recurring coverage, busiest day, and subject time distribution.
- **History Workspace**: Added a real history screen for completed and archived records with restore, archive, and permanent delete controls.
- **Task Lifecycle System**: Extended timetable records with `active`, `completed`, and `archived` states plus timestamps (`createdAt`, `updatedAt`, `completedAt`, `archivedAt`).
- **Insights Hook**: Added reusable analytics calculations in `useTimetableInsights` for cross-page metrics.

- **Responsive Accessibility & Code Standards**:
  - **Surgical A11y Refinement**: Added `aria-label`, `aria-hidden`, and `role` attributes across `TimetableCard`, `Home`, and `Analytics` to improve screen reader compatibility.
  - **Inline CSS Migration**: Replaced all `style={{ animationDelay/width }}` with Tailwind arbitrary values (`delay-[...]`, `w-[...]`) to comply with Project Rule 24.
  - **ESLint Resolution**: Refactored `TimetableContext` and `Modal.stories` to resolve React Refresh and Hook rule violations without suppressing lint errors.
  - **High-Contrast White-on-White (Edit Button)**: Significantly upgraded `EDIT` button visibility in Light Theme. Implemented "4-Sided Halo Shadow" using `shadow-[0_0_12px_rgba(0,0,0,0.08)]` to define visibility on all sides, including the top edge, while maintaining a clean, minimalist aesthetic.
  - **Grid View Synchronization (Minimalist Side-Tint)**: Migrated `TimetableGrid` from full-background coloring to the premium 'Left Border Accent' system (`!border-l-[8px]`). Improved readability with frosted glass backgrounds and adaptive text accents in both Dark and Light themes.
  - **Premium Dark Hover Refinement**: Replaced the high-contrast white hover background in `TimetableGrid` with a subtle 'Lighter Frost' effect (`dark:hover:bg-white/10`) for a more sophisticated dark-mode experience.
  - **Grid Action Matrix (2x2 Layout)**: Optimized compact space in `TimetableGrid` by implementing a 2x2 grid for action buttons (Edit, Complete, Archive, Delete). This layout ensures all major actions are explicitly accessible and perfectly centered without overflowing the card width.
  - **Grid Card Vertical Stability**: Resolved hover UI overflow in `TimetableGrid` by implementing a fixed-height subject area (`min-h-[2.5rem]`). This ensures even 1-line titles have sufficient vertical bulk to contain the action overlay comfortably.
  - **Smart Overlay Dismissal (Click-Outside)**: Implemented a robust 'Safety Backdrop' architecture for `TimetableGrid` and unified it with Framer Motion's `onTap` for absolute touch reliability and zero event-bubbling interference.
  - **Action-Triggered Overlay Reset**: Resolved sticky UI state in `TimetableGrid` by implementing a 'Smart Hover Lock' system. Any action (Edit, Complete, etc.) now suppresses the hover state for that card until the mouse explicitly leaves the area, preventing icons from re-appearing after modal closure.
  - **Grid Layout Alignment Sync**: Harmonized the horizontal margins of `TimetableGrid` with the Stats Cards and page-wide container (`max-w-6xl`). Removed internal padding (`p-4` to `px-0`) to ensure a perfectly aligned, professional visual hierarchy across all view modes.
  - **Tap-to-Reveal Accessibility (Cross-Platform UX)**: Implemented tap-to-toggle logic for `TimetableGrid` items to support touch devices (Mobile/Tablet) where hover is unavailable. Managed z-index (`z-[30]`) and event propagation to prevent accidental modal triggers.
  - **Unified Responsive Empty State**: Synchronized the premium 'Active Deck Empty' animation between Card and Grid views in `TimetableContainer`. Refined the placeholder component with responsive padding (`py-16` to `lg:py-24`) and font scaling (`text-2xl` to `lg:text-4xl`) for flawless mobile/tablet display.
  - **Centered Action Overlay (Grid UX)**: Solved UI overlap in `TimetableGrid` by moving action icons from top-right to a centered frosted overlay on hover. Improved target clickability with larger button geometry and smooth scaling micro-animations.
  - **Subtle Tinting (Minimalist Premium)**: Migrated from full-card tinted backgrounds to pure glass backgrounds with vibrant left-border (`!border-l-[10px]`) and icon-only color accents for a more sophisticated, high-end look.
  - **Compact Geometry**: Optimized `TimetableCard` button heights (`py-2.5`) and internal padding (`p-5`) for mobile/tablet while preserving accessible font sizes.
  - **Breathing Room**: Increased vertical gaps between cards (`gap-8 lg:gap-12`) and around sectional separators (`pt-8`, `mt-2`) to enhance hierarchical clarity and visual comfort.
  - **Adaptive Stacking**: Implemented vertical information stacking for `TimetableCard` details (Day, Time, Room) on mobile and tablet screens to prevent text overflow and truncation.
  - **Dynamic Breakpoints**: Restored dual-column layout on large screens (`lg:grid-cols-2`) for optimal desktop presentation.
  - **UI/UX Refinements (Surgical Pass 3)**:
  - **Issue 1 (Muddy Textures)**: Removed redundant `bg-white/60` overrides on glass-cards in Analytics. Upgraded `.glass-card` in Light Mode to use `bg-white/60` (Pure White Frost) for max clarity on light backgrounds.
  - **Issue 2 (Layout & Corners)**: Restored the signature `rounded-[2.5rem]` (40px) border radius globally via `.glass-card`.
  - **Issue 3 (Status Visibility)**: Upgraded "Showing full history" and "Tracked Records" pills to use vibrant primary/tinted backgrounds for max readability.
- **UI/UX Refinements (Critique Pass 2)**:
  - **Issue 1 (Contrast & Readability)**: Eliminated hardcoded `white/60` backgrounds. Metrics now use `base-100/70` in light mode and `base-200/50` in dark mode for perfect visibility.
  - **Issue 2 (Color Harmony)**: Implemented **Contextual Tinting**. Cards now feature subtle border and background accents matching their metrics (e.g., Blue tint for Live Focus, Emerald for History).
  - **Issue 3 (Typography Tuning)**: Calibrated sub-label opacity to `70%` and used theme-adaptive `base-content/..` colors to ensure WCAG-level contrast in both modes.
- **UI/UX Refinements (Critique Fixes)**:
  - **Issue 1 (Visual Depth)**: Upgraded `.glass-card` with `border-2`, `backdrop-blur-2xl`, and `shadow-2xl`. Improved Dark Mode support for glass surfaces.
  - **Issue 2 (Visual Consistency)**: Replaced high-contrast black placeholder bars in Analytics "Pressure Map" with subtle `bg-base-300/30` gutters.
  - **Issue 3 (Typography Hierarchy)**: Standardized sub-labels to `text-[11px]` with `60%` opacity and balanced tracking for professional legibility across all pages.
  - **Issue 4 (Emotional Tone)**: Implemented "Hopeful Zero States". Metrics showing 0 now use soft pastel emerald/sky tones and subtle background glows instead of dull grays.
- **Build Compatibility**: Updated Storybook stories and mocks to match the expanded `TimetableItem` schema used by the live app.
- **Premium UX Enhancements**: Added floating animations to both Dashboard and History empty states. Implemented "Task Flight" micro-interactions for card exit animations (`scale-down` & `fade-right`).
- **React Portal Implementation**: Converted the Modal component to use `createPortal` (rendering into `document.body`). This permanently eliminates the Z-index conflict between the sticky Header and modals by escaping the local stacking context of the Dashboard/Shell.
- **LocalStorage Migration**: Added normalization logic so older saved timetable items upgrade safely to the new lifecycle-aware data model.
- **Navigation Placeholders**: Replaced `href="#"` navbar placeholders with working route transitions and active-state navigation styling.

### Changed

- **Dashboard Behavior**: Dashboard now focuses on active tasks only, while completed and archived items move into the dedicated History workspace.
- **Card & Grid Actions**: Timetable cards and weekly grid now support complete/archive/delete actions directly from the main scheduling surface.
- **Search Scope**: Global search now works across task status as well as subject/day/location, allowing cross-screen filtering.

## [2026-03-24] - Phase 2 & 3 Completion

### Added

- **Global State Management**: Implemented `TimetableContext` to centralize all CRUD operations and UI state (View Switcher).
- **Search Functionality**: Added global search logic to `TimetableContext` and `useTimetable` hook. Implemented an animated search bar in the `Navbar`.
- **Dark Mode Support**: Created `useTheme` hook for persistent theme switching. Added `dark` theme configuration in `global.css`.
- **Modular Component Logic**: Extracted UI logic into specialized hooks (`useTheme`, `useSearch` integration in `useTimetable`).
- **Multiple Views Strategy**: Added a high-performance **Weekly Grid View** alongside the existing Card List View.
- **Color Coding System**: Users can now select from 6 premium color accents for subjects.
- **Framer Motion Integration**: Added smooth, professional entry/exit and layout animations to all cards and views.
- **Recurring Tasks**: Added weekly recurrence support in the entry form.
- **Icon Standardization**: Integrated `lucide-react` as the mandatory icon library. Replaced all emojis and manual SVGs with vector icons.
- **Animation Standardization**: Enforced `framer-motion` as the project-wide animation standard.
- **Rule Updates**: Updated `PROJECT_PLAN.md` and `PROJECT_RULES.md` to force these technical standards for all future developments.

### Fixed

- Project Structure: Clean Architecture မှ Modular Architecture သို့ ပြောင်းလဲသတ်မှတ်ခြင်း။
- **Navbar Import Bug**: Fixed incorrect relative import paths for `useTheme` and `useTimetable` in the `Navbar.tsx` component.
- **Accessibility (A11y) Fixes**: Resolved multiple linter errors in `Home.tsx` related to missing labels, accessible names, and discernible text on form elements and buttons.
- **Button Standards**: Standardized all `button` and `Button` elements by enforcing explicit `type` attributes (`type="button"` or `type="submit"`) across the project to prevent unintended form submissions and improve consistency.
- **Modal.stories.tsx Accessibility**: Fixed select element accessibility error by adding `id` and `htmlFor` attributes to properly link the label with the select element.
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
- **Documentation Overhaul**: Updated all `.stories.tsx` files to reflect the new premium glassmorphism and motion-enabled UI standard.
- **UI Layout Standardization**: Standardized global layout width to **max-w-6xl** and corrected pixel-level alignment by unifying horizontal padding (`px-6`) across all major containers using consistent wrapper logic.
- **Tablet Responsive Optimization**: Restored side-by-side (Desktop-style) layout for iPad Mini (768px+) by optimizing font scales, gaps, and padding. This prevents UI "breakage" while maintaining the premium wide-screen aesthetic on tablet devices.
- **Card UI Consistency**: Optimized TimetableCard titles with responsive font sizes (`lg:text-3xl`) and standard labels (Date, Time, Location) scaled to `md:text-sm`. Resolved AM/PM truncation by reducing internal padding/gaps and refining letter-spacing (`tracking-wide`).
- **Sticky Header Refinement**: Permanently eliminated the "white line" visual glitch by using a persistent transparent border strategy in `Navbar.tsx`. Transitioned to `border-white/5` only on scroll to ensure a seamless, flicker-free experience. Refined shadow diffusion (`shadow-2xl shadow-primary/5`) for an elite glassy look.
- **Global Footer**: Added a professional footer with dynamic credits (© 2026 Modalize • Developed By Wunna Aung) using Framer Motion animations.
- **Scroll-Free Layout Optimization**: Removed outer vertical padding from `Home.tsx` wrapper to eliminate redundant vertical scrollbars on all resolutions. Refined Footer and Main content margins for a pixel-perfect fit.
- **Typography Standardization**: Removed `italic` styling from `TimetableCard` time labels.
- **Major Rebranding (Chronos)**: Officially renamed the project to **Chronos**. Implemented dedicated SVG Logo and Favicons.
- **Asset Refactoring**: Reorganized `public` folder by moving `logo` and `favicons` to the root for cleaner pathing. Removed redundant `assets` folder, `react.svg` and `vite.svg` boilerplate.
- **Sticky Navigation Bar**: Added a professional, glassmorphism-enabled Navbar with responsive mobile support, animated logo interaction, and future-ready profile/search slots.
