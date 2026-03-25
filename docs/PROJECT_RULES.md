# 📜 Project Rules & AI Agent Guidelines

ဤ Project တွင် ပါဝင်လုပ်ဆောင်မည့် AI Agents အားလုံးသည် အောက်ပါ စည်းကမ်းချက်များကို တိကျစွာ လိုက်နာရမည်။

## 1. Project Plan Adherence (မဖြစ်မနေ လိုက်နာရန်)

- AI Agent တိုင်းသည် အလုပ်မစတင်မီ [PROJECT_PLAN.md](./PROJECT_PLAN.md) ကို ဖတ်ရှုရမည်။
- လုပ်ဆောင်ချက်တိုင်းသည် Project Plan ပါ Phase များနှင့် Architecture Strategy အတိုင်း ဖြစ်ရမည်။
- Plan ထဲတွင် မပါဝင်သော အချက်အလက်များ သို့မဟုတ် ပြောင်းလဲမှုများ ရှိပါက Project Plan ကို အရင် update လုပ်ပြီးမှသာ ဆက်လက်လုပ်ဆောင်ရမည်။

## 2. Documentation & Tracking

- **Change Log Update**: မည်သည့် ဖိုင်ကိုမဆို ပြင်ဆင်ပြီးတိုင်း သို့မဟုတ် task တစ်ခု ပြီးမြောက်တိုင်း [CHANGELOG.md](./CHANGELOG.md) တွင် အသေးစိတ် မှတ်တမ်းတင်ရမည်။
- **Session Summary**: အလုပ်ပြီးဆုံးချိန်တွင် (သို့မဟုတ် turn တစ်ခု အဆုံးသတ်တိုင်း) [LAST_SESSION_SUMMARY.md](./LAST_SESSION_SUMMARY.md) ကို update လုပ်ရမည်။ ၎င်းသည် နောက်ထပ်လာမည့် Agent များအတွက် context အဖြစ် အသုံးဝင်မည်။

## 3. Architecture & Coding Standards

- [ARCHITECTURE.md](./ARCHITECTURE.md) ပါ **Modular Architecture** ကို တိကျစွာ လိုက်နာရမည်။
- UI Components များတွင် logic လုံးဝ မပါရ။ Logic များအားလုံးကို `src/hooks/` သို့ ခွဲထုတ်ရမည်။
- Component အသစ်တိုင်းအတွက် `.stories.tsx` ဖိုင်ကို သက်ဆိုင်ရာ folder ထဲတွင် တစ်ခါတည်း ဆောက်ရမည်။
- Tailwind v4 `@plugin` syntax နှင့် winter theme ကိုသာ default အဖြစ် သုံးရမည်။
- **Animation Standard**: Animations အားလုံးအတွက် `framer-motion` ကိုသာ မဖြစ်မနေ အသုံးပြုရမည်။ CSS animations သို့မဟုတ် အခြား library များ မသုံးရ။
- **Icon Standard**: Icons များအားလုံးအတွက် `lucide-react` ကိုသာ မဖြစ်မနေ အသုံးပြုရမည်။ SVG manual coding သို့မဟုတ် Emojis များ (Production UI တွင်) မသုံးရ။
- **No Inline CSS**: Inline styling (`style={{ ... }}`) မသုံးရ။ Exception: Third-party library requirements (e.g., `prism-react-renderer` style prop) များတွင် inline styles မဖြစ်မနေ သုံးရသည့်အခါမှသာ ခွင့်ပြုသည်။

## 4. Code Preservation Rule

- **Do Not Touch Working Code**: Project Rules မှာ ပြင်ခိုင်းတဲ့ဟာကလွဲလို့ ကျန်တဲ့မှန်ကန်နေပြီးသား UI/UX နှင့် Logic အပိုင်းတွေကို မထိရှိထိခိုက်ရ။
- User က တိကျစွာ ပြင်ခိုင်းတဲ့အပိုင်းကိုသာ ပြင်ဆင်ရမည်။ "Refactor" သို့မဟုတ် "Improve" ဆိုတဲ့ စကားလုံးတွေ မသုံးရ။
- တစ်ခုခုကို ပြင်ပြီးတိုင်း အခြား working features တွေ ပျက်သွားတာ ရှိမရှိ စစ်ဆေးရမည်။

## 5. Maintenance Protocol

- **Update Logic**: Project Plan ထဲမှ အချက်တစ်ခုခုကို update လုပ်လျှင် သက်ဆိုင်ရာ Architecture doc သို့မဟုတ် README များကိုပါ တစ်ပြိုင်နက် update လုပ်ရန်။
- **Error Handling**: မည်သည့် code ကိုမဆို မပို့မီ Linting စစ်ဆေးရန်နှင့် error များကို ရှင်းလင်းရန်။

## 6. Agent Coordination

- Agent အသစ်တစ်ခု ဝင်လာတိုင်း `LAST_SESSION_SUMMARY.md` ကို အရင်ဆုံး ဖတ်ရှုပြီးမှသာ လုပ်ငန်းစတင်ရန်။
- လက်ရှိ လုပ်ဆောင်ဆဲ (In-progress) tasks များကို ဦးစားပေး ပြီးမြောက်အောင် လုပ်ဆောင်ရန်။
