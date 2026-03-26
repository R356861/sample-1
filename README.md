# User Management API

A simple RESTful API built with Node.js and Express for managing users.  
This project demonstrates CRUD operations, filtering, sorting, validation, and error handling.

---

## 🚀 Setup & Run Instructions

### 1. Clone the repository
git clone <your-github-repo-link>
cd user-management-api

### 2. Install dependencies
npm install

### 3. Run the server
npm start

### For development (auto-restart)
npm run dev

### Server will run on:
http://localhost:3000

---

## 📌 API Endpoints

- GET /users
- GET /users/:id
- POST /users
- PUT /users/:id
- DELETE /users/:id

---

## 🔍 Query Features

Search:
GET /users?search=alice

Sort:
GET /users?sort=name&order=asc

---

## ⚙️ Assumptions / Notes

- Data is stored in-memory (no database used)
- Server resets data on restart
- Email must be unique
- Basic validation is implemented manually
- This is a demo project (not production-ready)

---

## 🧠 Questions

### How did you structure your API?

The API follows a simple structure using Express in a single file (server.js).

- RESTful routes are implemented
- Utility functions handle user lookup
- Middleware used:
  - helmet (security)
  - cors
  - morgan (logging)
  - express.json()

---

### How did you handle validation?

- Required fields (name, email) are checked
- Duplicate email validation is implemented
- Case-insensitive comparisons are used

If validation fails:
Returns 400 Bad Request

---

### How did you manage errors?

- Try-catch blocks in each route
- Global error handling middleware
- Proper status codes (400, 404, 500)

Example:
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error"
}

---

## How would you scale this API?

- Use MVC structure (routes, controllers, services)
- Add database (MongoDB/PostgreSQL)
- Use validation libraries (Joi/Zod)
- Add authentication (JWT)
- Use caching (Redis)
- Deploy with Docker and cloud services

---

## 🧪 Testing

Run:
node test-api.js

---

## 📧 Author

Your Name  Gannavaram Rahul
Your Email gannavaramrahul4@gmail.com
