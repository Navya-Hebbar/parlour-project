# Parlour Admin Dashboard

A full-stack web-based dashboard system for a parlour business, featuring role-based access control, employee/task management, and real-time attendance updates via WebSockets.

---

## 🚀 Tech Stack
- **Frontend:** Next.js 15 (App Router) + TypeScript + TailwindCSS + ShadCN UI
- **Backend:** Node.js + TypeScript (MVC) + Express + MongoDB + Socket.IO
- **Auth:** JWT-based authentication
- **Realtime:** WebSocket (Socket.IO)

---

## 📁 Project Structure
```
/parlour-project
├── frontend-parlour-dashboard   # Next.js 15 + TypeScript + Tailwind + ShadCN
└── backend-parlour-api          # Node.js + TypeScript + Express + MongoDB + Socket.IO
```

---

## 🛠Setup & Configuration Instructions

### 1. **Clone the Repo**
```sh
git clone <your-github-repo-url>
cd parlour-project
```

### 2. **Backend Setup (`backend-parlour-api`)**

#### a. Install Dependencies
```sh
cd backend-parlour-api
npm install
```

#### b. Create a `.env` File
Create a `.env` file in the `backend-parlour-api` directory with the following content:
```env
MONGO_URI=mongodb://localhost:27017/parlour
JWT_SECRET=your_jwt_secret
PORT=5000
```
- Replace `your_jwt_secret` with a secure random string.
- If you use MongoDB Atlas, use your connection string for `MONGO_URI`.

#### c. Seed the Database
```sh
npx ts-node seed-admin.ts
npx ts-node seed-employees.ts
```
- This will create a Super Admin, an Admin, and sample employees.

#### d. Start the Backend Server
```sh
npm run dev
# or
npm start
```
- The backend will run on `http://localhost:5000` by default.

---

### 3. **Frontend Setup (`frontend-parlour-dashboard`)**

#### a. Install Dependencies
```sh
cd ../frontend-parlour-dashboard
npm install
```

#### b. (Optional) Configure API URL
- By default, the frontend expects the backend at `http://localhost:5000`.
- If your backend runs elsewhere, update the API URLs in the frontend code.

#### c. Start the Frontend
```sh
npm run dev
```
- The frontend will run on `http://localhost:3000` by default.

---

### 4. **Login Credentials**
- **Super Admin:**
  - Email: `flytech.admin@parlour.com`
  - Password: `Flytech@2025!`
- **Admin (Staff):**
  - Email: `employee.megha@parlour.com`
  - Password: `Megha#321$`

---

### 5. **Ports & CORS**
- **Backend:** Default port is `5000` (set in `.env`).
- **Frontend:** Default port is `3000`.
- CORS is enabled in the backend for local development.

---

### 6. **MongoDB**
- Make sure MongoDB is running locally or use a cloud provider (e.g., MongoDB Atlas).
- The database name is `parlour` by default.

---

### 7. **Environment Variables Summary**
| Variable    | Description                | Example Value                        |
|-------------|----------------------------|--------------------------------------|
| MONGO_URI   | MongoDB connection string  | mongodb://localhost:27017/parlour    |
| JWT_SECRET  | JWT signing secret         | mySuperSecretKey123                  |
| PORT        | Backend server port        | 5000                                 |

---

### 8. **Troubleshooting**
- If you see CORS errors, ensure both servers are running and CORS is enabled in the backend.
- If you see MongoDB connection errors, check your `MONGO_URI` and that MongoDB is running.
- For any 401/403 errors, ensure you are using the correct login credentials.

---

## Features
- **Login:** JWT auth, role-based redirect (Super Admin/Admin)
- **Dashboard:**
  - Employees: Super Admin (CRUD), Admin (view-only)
  - Tasks: Super Admin (CRUD, assign), Admin (view-only)
  - Attendance: Live punch log, real-time updates
- **Attendance Page:**
  - List all employees
  - Punch In/Out per employee (real API, triggers WebSocket)
  - Real-time updates on dashboard
- **Role-Based UI:**
  - Super Admin: Full access
  - Admin: View-only
- **Modern UI:**
  - Glowing, dark theme, ShadCN modals, toasts, and tables
- **Logout, error/success toasts, and route protection**

---

## Demo Instructions
1. **Login** as Super Admin or Admin.
2. **Dashboard:**
   - Super Admin: Add/edit/delete employees and tasks, assign tasks, view attendance logs.
   - Admin: View employees, tasks, and attendance logs (no edit/delete).
3. **Attendance Page:**
   - Punch in/out for any employee.
   - See real-time updates on the dashboard attendance log.
4. **Role-Based UI:**
   - Admin cannot see add/edit/delete buttons.
   - All routes protected; logout clears session.

---
