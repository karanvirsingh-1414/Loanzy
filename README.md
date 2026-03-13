# 🚀 LOANZY

> **Empowering Financial Freedom Through Seamless, AI-Powered Lending**

![Last Commit](https://img.shields.io/github/last-commit/karanvirsingh-1414/Loanzy)
![Repo Top Language](https://img.shields.io/github/languages/top/karanvirsingh-1414/Loanzy)
![Language Count](https://img.shields.io/github/languages/count/karanvirsingh-1414/Loanzy)

---

## 🛠 Built With

- Java 23
- Spring Boot 4
- Spring Security
- JWT Authentication
- Google Gemini AI API
- React 18
- TailwindCSS
- Vite
- MySQL
- Maven
- npm

---

## 📚 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [AI Capabilities](#ai-capabilities)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Usage](#usage)

---

## 📖 Overview

Loanzy is an enterprise-grade **AI-Powered Loan Management Platform** built on a microservices architecture.

It combines secure JWT-based authentication, an intelligent AI credit risk analyzer, a generative AI chatbot assistant, and a modern React frontend — all wired through a Spring Cloud API Gateway.

---

## ✨ Features

### 🛡️ Security & Authentication
- JWT-based stateless authentication
- Role-based authorization (USER / ADMIN)
- Protected frontend routes via `ProtectedRoute` and `AdminRoute` guards
- Passwords encrypted with BCrypt

### 🤖 AI Capabilities
- **AI Credit Risk Analyzer** — Powered by Google Gemini API (backend Java service). Automatically analyzes loan requests on submission and sets status to `Rejected by AI` if the risk exceeds defined thresholds (e.g., Personal Loan > ₹50L)
- **AI Chatbot Assistant** — A floating chat widget on the frontend using the Gemini Generative AI SDK. Acts as "Loanzy AI Assistant" to answer loan-related queries in real time

### ⚙️ Microservices Architecture
| Service | Port | Responsibility |
|---|---|---|
| API Gateway | 8080 | Single entry point for all requests |
| Auth Service | 8081 | JWT generation, login, registration |
| User Service | 8082 | User profile management |
| Loan Service | 8083 | Loan lifecycle + AI Risk Analysis |
| Payment Service | 8084 | EMI payment recording |

### 🎨 Modern Frontend
- Cyberpunk-inspired dark UI with glassmorphism effects
- Dynamic Navbar based on auth state
- Toast notifications (react-hot-toast) replacing browser alerts
- Responsive design with smooth micro-animations
- Admin Dashboard with real-time loan approval/rejection controls

### 📊 RESTful APIs
- Loan application, approval & rejection endpoints
- Admin dashboard APIs
- User management services
- AI-integrated loan submission pipeline

---

## 🏗️ Architecture

```
Browser (React + Vite)
        │
        ▼
API Gateway (Port 8080)
        │
  ┌─────┼──────────┬──────────┐
  ▼     ▼          ▼          ▼
Auth  User      Loan      Payment
8081  8082      8083       8084
                 │
                 ▼
          Google Gemini AI
          (Risk Analysis)
```

---

## 🏁 Getting Started

### 📌 Prerequisites

- Java 17+
- Node.js & npm
- Maven
- MySQL Server
- Google Gemini API Key (free at [aistudio.google.com](https://aistudio.google.com/app/apikey))

---

## 📥 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/karanvirsingh-1414/Loanzy.git
cd Loanzy
```

### 2️⃣ MySQL Setup

Create the database and user:

```sql
CREATE DATABASE loanzy;
CREATE USER 'loanuser'@'localhost' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON loanzy.* TO 'loanuser'@'localhost';
```

### 3️⃣ Configure Environment Variables

**Frontend** — create `frontend/loanzy/.env`:
```env
VITE_GEMINI_API_KEY=your_google_gemini_api_key
```

**Backend** — update `backend/loan-service/src/main/resources/application.properties`:
```properties
gemini.api.key=your_google_gemini_api_key
```

### 4️⃣ Install Frontend Dependencies

```bash
cd frontend/loanzy
npm install
```

---

## ▶️ Usage

### Run All Backend Services (in separate terminals)

```bash
cd backend/api-gateway && mvn spring-boot:run
cd backend/auth-service && mvn spring-boot:run
cd backend/user-service && mvn spring-boot:run
cd backend/loan-service && mvn spring-boot:run
cd backend/payment-service && mvn spring-boot:run
```

### Run Frontend

```bash
cd frontend/loanzy
npx vite --host
```

App runs at: **http://localhost:5173**

---

## 👤 Default Roles

| Role | How to Get |
|---|---|
| USER | Register with any email/username |
| ADMIN | Register with "admin" in username or email (e.g., `admin@loanzy.com`) |

---

## 📂 Project Structure

```
Loanzy/
│
├── frontend/loanzy/          # React + Vite Application
│   ├── src/
│   │   ├── components/       # Navbar, Chatbot, ProtectedRoutes, LoanTable
│   │   ├── pages/            # Landing, Login, Register, Dashboard, AdminDashboard, ApplyLoan, About
│   │   └── utils/            # auth.js (JWT utilities)
│   └── .env                  # Gemini API Key (not committed in production)
│
└── backend/
    ├── api-gateway/          # Spring Cloud Gateway (Port 8080)
    ├── auth-service/         # JWT Auth (Port 8081)
    ├── user-service/         # User Management (Port 8082)
    ├── loan-service/         # Loans + AI Risk Engine (Port 8083)
    └── payment-service/      # EMI Payments (Port 8084)
```

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repo and submit a pull request.

---

> Built with ❤️ using Spring Boot, React, and Google Gemini AI
