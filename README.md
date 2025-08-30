# 💰 General Cash Flow

General Cash Flow adalah aplikasi fullstack untuk mencatat pemasukan, pengeluaran, dan menghasilkan laporan keuangan bulanan.  
Dibangun dengan **Next.js, Supabase, Auth.js, Zustand, Tailwind, dan Shadcn**.

## 🚀 Tech Stack
- [Next.js (App Router)](https://nextjs.org/)
- [Supabase](https://supabase.com/) (Database & Auth)
- [Auth.js](https://authjs.dev/) (Authentication)
- [Zustand](https://zustand-demo.pmnd.rs/) (State Management)
- [TailwindCSS](https://tailwindcss.com/) + [Shadcn](https://ui.shadcn.com/)

## ✨ Features
- 🔑 User Authentication (Login, Register, Logout)
- 📊 Dashboard: ringkasan cash in, cash out, saldo akhir
- 💸 CRUD transaksi (tambah, edit, hapus)
- 🗂 Laporan bulanan dengan filter
- 📤 Export laporan ke CSV
- 🌙 Dark mode support

## 📸 Screenshots
### Dashboard
![Login Screenshot](./public/screenshots/login-dashboard.png)

![Dashboard Screenshot](./public/screenshots/dashboard.png)

![Dashboard Incomes Screenshot](./public/screenshots/dashboard-incomes.png)

![Dashboard Expenses Screenshot](./public/screenshots/dashboard-expenses.png)

![Dashboard Fundaccounts Screenshot](./public/screenshots/dashboard-fundaccounts.png)

![Dashboard Events Screenshot](./public/screenshots/dashboard-events.png)

### Laporan
![Reports Incomes Screenshot](./public/screenshots/report-incomes-pdf.png)

![Reports Expenses Screenshot](./public/screenshots/report-expenses-pdf.png)

## ⚡️ Setup & Installation
```bash
git clone https://github.com/lindanmaulana/General-App
cd general-cash-flow
npm install
npm run dev
