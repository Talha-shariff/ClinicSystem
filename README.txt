Clinic System – Front Desk Management

This is a full-stack Clinic Front Desk System built with:
Backend: NestJS + MySQL + TypeORM + JWT Auth
Frontend: Next.js + Tailwind CSS + Axios
Database: MySQL

---

Features:
- User Authentication (JWT)
- Doctor, Patient, Queue, and Appointment Management
- Secure API with Role-Based Access
- Responsive Frontend with Tailwind CSS

---

Project Structure:
ClinicSystem/
    clinic-backend/   -> NestJS backend
        src/          -> Backend source code
        .env          -> Environment variables
        package.json
    clinic-frontend/  -> Next.js frontend
        pages/        -> Pages & Routes
        components/   -> Reusable UI components
        utils/        -> API helper functions
        package.json

---

Local Setup:

1. Clone Repository
   git clone <your-repo-url>
   cd ClinicSystem

2. Setup Backend
   cd clinic-backend
   npm install

   Configure .env in clinic-backend:
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASS=yourpassword
   DB_NAME=clinicdb
   JWT_SECRET=mysecret
   JWT_EXPIRES_IN=3600s

   Start Backend:
   npm run start:dev
   Backend will run at: http://localhost:3000

3. Setup Frontend
   cd ../clinic-frontend
   npm install

   Configure .env.local in clinic-frontend:
   NEXT_PUBLIC_API_URL=http://localhost:3000

   Start Frontend:
   npm run dev
   Frontend will run at: http://localhost:3001 or http://localhost:3000

 ---
Note: All development errors during this project were resolved with the assistance of AI tools to ensure accuracy and timely delivery.
