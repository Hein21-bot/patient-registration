# Development Planning — Agnos Health

This document summarizes the project structure, design principles, component architecture, and the real-time synchronization flow for the Agnos Health Patient Registration frontend.

---

## 📁 Project structure (quick reference)

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
├── components/             # Reusable components
│   ├── MainDashboardCard.tsx
│   ├── PatientDetail.tsx
│   ├── PatientForm.tsx
│   ├── PatientList.tsx
│   ├── StaffLogin.tsx
│   └── StatusIndicators.tsx
├── hooks/                  # Custom hooks
│   └── useSocket.ts
├── lib/                    # Utilities & mock data
│   └── mockData.ts
├── pages/                  # Next.js pages (api routes)
│   └── api/
│       └── socket.ts       # Socket.IO server endpoint
├── types/                  # Shared TypeScript types
│   └── index.ts
└── docs/                   # Project docs (this file)
```

---

## 🎨 Design Principles

- **Simplicity & Clarity:** Keep UI focused on core tasks: register patients, view list/details, and staff login.
- **Consistency:** Use Tailwind utility classes and a small design token set for spacing, colors and elevation.
- **Accessibility:** Use semantic HTML, and keyboard-focusable controls for forms and navigation.
- **Responsiveness:** Ensure layouts (lists, cards, forms) adapt to narrow screens; prefer stacked layouts on mobile.

Implementation tips:
- Centralize shared styles (colors, spacing) in `globals.css` and Tailwind config.
- Prefer composition over deep prop drilling: small, focused components that compose into pages.

---

## 🧩 Component Architecture

Design components by responsibility and data flow. Example responsibilities:

- PatientForm.tsx
  - Controlled form inputs, validation, local form state
  - Emits `createPatient` action (emits socket event)
  - Shows inline errors and a success state

- PatientList.tsx
  - Receives a list of patients (props or from a store)
  - Handles optimistic UI updates when a patient is added/updated

- PatientDetail.tsx
  - Displays full patient data, status indicators

- MainDashboardCard.tsx
  - Reusable card used for two action cards on the home page: one links to the patient registration form and the other links to the staff login/dashboard

- StaffLogin.tsx
  - Handles authentication flow for staff

- StatusIndicators.tsx
  - Small, focused UI for showing patient statuses (inactive, filling, submited, total)

Component patterns & tips:
- Use props + events (onCreate, onUpdate) for parent-child communication.

---

## 🔁 Real-time sync flow

Goal: keep multiple clients (staff consoles, dashboards) in sync with minimal latency and consistent behavior.

Core ideas:
- Use Socket.IO for low-latency pub/sub between clients and a server endpoint (`/api/socket`).
- Define clear event names and typed payloads in `src/types/index.ts`.
- Use a single source of truth for authoritative changes (server determines canonical state and broadcasts updates).

Recommended event model:

- Client -> Server
  - `patient:create` {  }
  - `patient:update` { id: string, formData: Partial<PatientData> }
  - `patient:delete` { id: string }

- Server -> Clients
  - `patient:created` { patient: Patient }         // broadcast after persisted/accepted
  - `patient:updated` { formData: Partial<PatientData>  }
  - `patient:deleted` { id: string }

Flow example (session-based):
1. Patient opens the registration page → client emits `session:create`.
2. As the patient fills fields, the client emits `session:update` with status `filling` and the partial input.
3. When the patient submits the form, the client emits `session:update` with status `submitted` and the final data.
4. If the patient is idle (no input) for a configured timeout, the client emits `session:update` with status `inactive`.
5. The staff dashboard receives these session events in real time and updates status boards and the patient list immediately.
6. Staff may delete a record **only if** it has status `submitted` and `inactive`.
7. If the patient leaves or cancels without submitting, the client emits `session:delete` and the session is removed from staff views.
8. When staff deletes an inactive record, any open patient registration page for that session should receive a `session:deleted` event and automatically return to the main page.

---