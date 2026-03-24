# 📅 Project Plan: My Timetable (React Migration)

ဒီ Project ဟာ လက်ရှိ HTML/JS အခြေခံ Timetable application ကနေ ခေတ်မီတဲ့ React (Vite) architecture ဆီကို ပြောင်းလဲဖို့ ရည်ရွယ်ပါတယ်။

## 🎯 Project Overview

- **Goal**: Clean Architecture ကို အသုံးပြုပြီး ပိုမိုကောင်းမွန်တဲ့ UI/UX နဲ့ စနစ်တကျ ရေးသားထားတဲ့ Timetable app တစ်ခု ဖန်တီးရန်။
- **UI/UX Strategy**: Clean, Simplify, and Professional design.
- **Success Metrics**:
  - **Performance**: 100% Google Lighthouse score (Desktop/Mobile).
  - **Accessibility**: Zero accessibility errors (Axe-core validated).
  - **Responsiveness**: Pixel-perfect on all screen sizes (320px to 4K).

--- **Tech Stack & DX Tools**

- **Frontend**: React, TypeScript, Vite
- **Backend**: Node.js (v22.17.0)
- **Styling**: Tailwind CSS v4 (Integrated via `@plugin` in `global.css`)
- **UI Library**: DaisyUI (Default Theme: "winter")
- **Animations**: `framer-motion` (Official Animation Standard)
- **Icons**: `lucide-react` (Official Icon Standard)
- **Code Quality**: ESLint (EZLint), Prettier
- **Documentation**: Storybook (Modular `.stories.tsx` strategy)

---

## 🏗️ Architecture & Component Strategy (Modular Structure)

ဒီ Project ဟာ ပိုမို Professional ဆန်ပြီး Reusable ဖြစ်စေရန်အတွက် အောက်ပါ Modular Architecture ကို လိုက်နာပါမည်။

### 1. Component Pattern (Atomic/Modular)

- **Modular Folders**: Component တစ်ခုချင်းစီကို သူ့ Folder နှင့်သူ သီးသန့်ထားရှိမည်။ (ဥပမာ- `/components/ui/Button/`)
- **UI (Dumb)**: Component ထဲရှိ UI/UX ပိုင်းအားလုံးကို `.tsx` ဖိုင်များတွင် သီးသန့်ထားမည်။ Side effects များ မပါဝင်ရပါ။
- **Storybook Strategy**: UI/UX documentation အတွက် `.stories.tsx` ဖိုင်များကို သက်ဆိုင်ရာ component folder ထဲတွင် တစ်ခါတည်း တွဲလျက် ဆောက်ရမည်။
- **Logic (Hooks)**: Smart Logic များကို Component ထဲတွင် တိုက်ရိုက်မထည့်ဘဲ `src/hooks/` ထဲသို့ ခွဲထုတ်မည်။

### 2. Containers & Services

- **Containers**: API နှင့် တိုက်ရိုက်ချိတ်ဆက်သော သို့မဟုတ် Complex logic များကို စုစည်းပေးသော Component များကို `src/containers/` ဟု အမည်ပေးမည်။
- **Utils & Services**: API calls များနှင့် အထွေထွေ functions များကို `src/utils/` သို့မဟုတ် `src/services/` တွင် စနစ်တကျ ထားရှိမည်။

### 3. Data Strategy

- **Mock Data**: Mock data များကို `*.stories.tsx` သို့မဟုတ် `src/tests/` ထဲတွင် တိုက်ရိုက်ထည့်သွင်းမည်။
- **Persistence**: LocalStorage (Initial Phase) → Cloud Sync (Future Phase).

---

## 📜 Coding Standards & Guidelines

- **Naming Conventions**:
  - Components: `PascalCase` (e.g., `TimetableCard.tsx`)
  - Hooks: `camelCase` with `use` prefix (e.g., `useTimetable.ts`)
  - Utils/Services: `camelCase` (e.g., `dateFormatter.ts`)
- **State Management**: Use React Hooks (useState, useReducer) for local state and Context API for global state.
- **Error Handling**: Use Toast notifications for user-facing errors and Error Boundaries for component crashes.

---

## 📜 Project Management System (Standard Rules)

ဤ Project သည် အောက်ပါ Management System များကို တိကျစွာ လိုက်နာ၍ AI Agents များအကြား context ချိတ်ဆက်မှု ပြုလုပ်မည်။

- **Project Rules**: [PROJECT_RULES.md](./PROJECT_RULES.md) (AI Agents များ လိုက်နာရမည့် စည်းကမ်းချက်များ)။
- **Change Log**: [CHANGELOG.md](./CHANGELOG.md) (ပြင်ဆင်မှု မှတ်တမ်းများ အားလုံးကို ဤနေရာတွင် သိမ်းဆည်းမည်)။
- **Session Summary**: [LAST_SESSION_SUMMARY.md](./LAST_SESSION_SUMMARY.md) (နောက်ထပ်လာမည့် Agent များအတွက် context ချိတ်ဆက်ပေးခြင်း)။
- **Implementation Guide**: [ARCHITECTURE.md](./ARCHITECTURE.md) (Architecture အသေးစိတ် လမ်းညွှန်ချက်)။

---

## 🏗️ Phase 1: Foundation (ပြီးစီး)

Project ရဲ့ အခြေခံ structure နဲ့ pattern တွေကို သတ်မှတ်ခြင်း။

- [x] Project setup with Vite, React, TypeScript, and Tailwind v4.
- [x] **DX Setup**: ESLint (EZLint), Prettier နှင့် Storybook configuration.
- [x] **Project Management System**: Rules, Changelog, နှင့် Session Summary စနစ်များ သတ်မှတ်ပြီး။
- [x] **New Architecture Implementation**: Hooks, Containers နှင့် Modular component folders များ သတ်မှတ်ပြီး။
- [x] Atomic UI components (Button, Modal, Card) နှင့် Storybook documentation.

## 🛠️ Phase 2: Core Functionality (ပြီးစီး)

App ရဲ့ အဓိက လုပ်ဆောင်ချက်တွေကို အသက်သွင်းခြင်း။

- [x] **CRUD Operations**: Timetable items များကို Create, Read, Update, Delete လုပ်နိုင်ခြင်း။
- [x] **Conflict Detection**: အချိန်ထပ်နေသော task များရှိပါက user ကို warning ပေးခြင်း။
- [x] **Recurring Tasks**: နေ့စဉ် သို့မဟုတ် အပတ်စဉ် ထပ်ခါတလဲလဲ ဖြစ်သော task များ သတ်မှတ်နိုင်ခြင်း။
- [x] **State Management**: Context API သုံးပြီး global data flow ကို စနစ်တကျ ထိန်းချုပ်ခြင်း။
- [x] **Validation**: Form input များကို သေချာစစ်ဆေးပြီး user-friendly error messages များ ပြသခြင်း။

## 🎨 Phase 3: UI/UX Enhancements (ပြီးစီး)

အသုံးပြုရ ပိုမိုလွယ်ကူပြီး လှပအောင် ပြင်ဆင်ခြင်း။

- [x] **Theme Support**: DaisyUI "winter" theme (Customized in `global.css`)။
- [x] **Multiple Views**: Weekly view အပြင် Daily view နှင့် List view များ ထည့်သွင်းခြင်း။
- [ ] **Drag & Drop**: Task များကို drag ဆွဲပြီး အလွယ်တကူ အချိန်ပြောင်းလဲနိုင်ခြင်း။ (Future Phase)
- [x] **Color Coding**: Subject အလိုက် အရောင်များ သတ်မှတ်နိုင်ခြင်း။
- [x] **Full Responsiveness**: Desktop, Tablet, နှင့် Mobile များတွင် pixel-perfect ဖြစ်စေခြင်း။
- [x] **Skeleton Screens**: Data loading ဖြစ်နေစဉ် UI တွင် skeleton များ ပြသခြင်း။
- [x] **Animations**: Framer Motion သုံးပြီး အသွင်အပြင်ကို ပိုမိုသက်ဝင်စေခြင်း။

## 🚀 Phase 4: Advanced Features (Backend Integration)

- [ ] **Node.js Backend**: Express.js သုံး၍ REST API များ တည်ဆောက်ခြင်း။
- [ ] **Authentication**: JWT သုံးပြီး Login/Signup စနစ် ထည့်သွင်းခြင်း။
- [ ] **Reminders/Notifications**: Task စခါနီးတွင် browser notifications ပေးခြင်း။
- [ ] **Search & Filter**: Task များကို အလွယ်တကူ ရှာဖွေနိုင်ခြင်း။
- [ ] **Data Syncing**: Device အစုံတွင် data များ တူညီနေစေရန် sync လုပ်ခြင်း။
- [ ] **Sharing**: Timetable link များကို အခြားသူများသို့ share ပေးနိုင်ခြင်း။
- [ ] **Export to PDF/Image**: Timetable ကို export ထုတ်ယူနိုင်အောင် လုပ်ဆောင်ခြင်း။

---

## 🚀 Deployment & CI/CD

- **Deployment**: Vercel သို့မဟုတ် Netlify တွင် auto-deploy လုပ်မည်။
- **CI/CD**: GitHub Actions သုံးပြီး pull request တိုင်းတွင် linting နှင့် testing စစ်ဆေးမည်။

---

## 📈 Next Steps (ဦးစားပေးများ)

1. **Home.tsx** ရှိ "Add New" ခလုတ်ကို အသက်သွင်းရန် (Create logic)။
2. **timetableService.ts** တွင် LocalStorage storage handler ထည့်သွင်းရန်။
3. **TimetableContainer.tsx** ကို data update လုပ်နိုင်အောင် update လုပ်ရန်။
