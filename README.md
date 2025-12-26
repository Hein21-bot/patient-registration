# Agnos Health — Patient Registration System 🏥

**Agnos Health** is a lightweight patient registration and management frontend built with **Next.js**, **TypeScript**, and **Tailwind CSS**. It demonstrates a modern app directory-powered Next.js UI with real-time updates via **Socket.IO** and a modular component structure for patient and staff workflows.

---

## 🚀 Project overview

- **Frameworks & tools:** Next.js (app directory), React, TypeScript, Tailwind CSS
- **Real-time:** Socket.IO (client + API route) for live patient updates
- **Structure:** Modular components under `src/app/components`, pages under `src/app` and `src/pages/api` for server endpoints
- **Purpose:** Manage patient registrations, staff login, and display patient lists and details in a simple, friendly UI

---

## 📁 Key files & folders

- `src/app/` — Next.js app pages and global styles
  - `page.tsx` — root page
  - `patient/page.tsx` —  registration page
  - `staff/page.tsx` — staff login/ staff dashboard
  - `globals.css`, `index.css` — global styles
- `src/app/components/` — UI components
  - `MainDashboardCard.tsx`, `PatientDetail.tsx`, `PatientForm.tsx`, `PatientList.tsx`, `StaffLogin.tsx`, `StatusIndicators.tsx`
- `src/hooks/useSocket.ts` — Socket.IO client hook
- `src/lib/mockData.ts` — local mock data useful for development
- `src/pages/api/socket.ts` — Socket.IO server endpoint (backend API route)
- `src/types/index.ts` — TypeScript types

---

## 🔗 Live demo

- **Live demo:** https://patient-registration-op8i.onrender.com/
- **Demo Staff login credentials :**
  - Username/email: `admin@hospital.com`
  - Password: `admin123`

---

## 📁 Project structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── globals.css         # Global styles
│   ├── index.css           # Page-specific styles
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── not-found.tsx       # 404 page
│   ├── patient/            # Patient pages and flows
│   │   └── page.tsx
│   └── staff/              # Staff/login pages
│       └── page.tsx
├── components/             # Reusable React components
│   ├── MainDashboardCard.tsx
│   ├── PatientDetail.tsx
│   ├── PatientForm.tsx
│   ├── PatientList.tsx
│   ├── StaffLogin.tsx
│   └── StatusIndicators.tsx
├── hooks/                  # Custom React hooks
│   └── useSocket.ts        # Socket.IO client hook
├── lib/                    # Library utilities & mock data
│   └── mockData.ts
├── pages/                  # Next.js pages (api routes)
│   └── api/
│       └── socket.ts       # Socket.IO server endpoint
├── types/                  # TypeScript type definitions
│   └── index.ts
``` 

---

## 🧰 Prerequisites

- Node.js 18+ (recommended)
- npm / pnpm / yarn

---

## ⚙️ Setup & local development
1. Clone the repo and install dependencies:

```bash
git clone https://github.com/Hein21-bot/patient-registration.git
cd patient-registration
npm install
# or: pnpm install / yarn
```

2. Run the development server:

```bash
npm run dev
# Open http://localhost:3000
```

3. Build & run production:

```bash
npm run build
npm start
```

4. Linting:

```bash
npm run lint
```

> Tip: The `pages/api/socket.ts` API route exposes a Socket.IO server — open two browser windows to `http://localhost:3000` to see live updates when registering patients.

---

## ✨ Features

- Patient registration form and validation (`PatientForm.tsx`)
- Patient list and detail views (`PatientList.tsx`, `PatientDetail.tsx`)
- Staff login UI (`StaffLogin.tsx`) for demonstration flows
- Realtime updates with Socket.IO via `useSocket` hook
- Tailwind CSS for utility-first styling
- TypeScript for safer development and explicit types in `src/types`
- **Custom 404 page** (`not-found.tsx`) with friendly messaging and navigation links

---

## 🎁 Bonus / Extras

- Mock data generator in `src/lib/mockData.ts` to bootstrap UI while backend is not available
- Reusable UI cards and status indicators for quick dashboard creation
- Clear separation of concerns: hooks for sockets, components for UI, pages for routing

---

## ✅ How to test real-time behavior

- Start the dev server (`npm run dev`) and open two browser windows to `http://localhost:3000`.
- Use the patient registration form in one window — the other should reflect new patients or status changes immediately via Socket.IO.

---

## � Testing the 404 page

- To view the custom 404 page (`src/app/not-found.tsx`), visit any non-existent route such as `http://localhost:3000/nonexistent`.
- Verify the page shows a friendly message and links back to the home.

---

## �🛠️ Development notes & contributions

- Follow existing component patterns under `src/app/components` when adding features
- Add TypeScript types to `src/types/index.ts` if you introduce new domain models
- Open a PR with a clear description and include screenshots or short recordings for UI changes

---

## 📄 License

This project template doesn't include a license file.

---