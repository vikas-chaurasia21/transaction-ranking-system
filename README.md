# 🚀 Transaction Ranking System

A full-stack Transaction Ranking System built using Node.js, Express.js, MongoDB, and Vanilla JavaScript. The system processes user transactions, calculates user scores, prevents duplicate transaction requests using idempotency keys, and generates a dynamic ranking leaderboard.

---

## 📌 Features

- Process Credit and Debit Transactions
- Auto-generated Transaction Reference IDs
- Duplicate Request Prevention using Idempotency Keys
- User Summary Dashboard
- Dynamic Ranking Leaderboard
- Real-time Score Calculation
- MongoDB Data Storage
- REST API Architecture
- Responsive Modern Dashboard UI

---

## 🛠 Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

---

## 📂 Project Structure

```bash
transaction-ranking-system/
│
├── Backends/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── Frontends/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── README.md
```

---

## 🔗 API Endpoints

### Process Transaction

```http
POST /api/transaction
```

Request:

```json
{
  "userId": "vikas",
  "amount": 5000,
  "type": "credit",
  "idempotencyKey": "vikas-5000-credit"
}
```

---

### Get User Summary

```http
GET /api/summary/:userId
```

Example:

```http
GET /api/summary/vikas
```

---

### Get Ranking

```http
GET /api/ranking
```

---

## 🧠 Score Calculation

The user score is calculated based on:

```text
Credits
Debits
Transaction Count
```

Higher activity and transaction value result in a higher ranking score.

---

## 🔒 Duplicate Transaction Prevention

The project uses Idempotency Keys to prevent duplicate transaction processing.

Example:

```text
vikas-5000-credit
```

If the same request is sent again, the system rejects it as a duplicate transaction.

---

## ⚙️ Installation

Clone Repository

```bash
git clone https://github.com/vikas-chaurasia21/transaction-ranking-system.git
```

Backend Setup

```bash
cd Backends
npm install
npm run dev
```

Frontend

Open:

```text
Frontends/index.html
```

or run with Live Server.

---

## 📸 Screenshots

### Dashboard

![Dashboard](./screenshots/dashboard.png)

## 👨‍💻 Author

**Vikas Chaurasia**

B.Tech CSE | Full Stack & Software Development Enthusiast

GitHub:
https://github.com/vikas-chaurasia21
